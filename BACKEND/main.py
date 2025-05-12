from fastapi import (FastAPI, Header, Depends,
                     Request, Response, HTTPException,
                     Query)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.engine import Row
import uvicorn
from sqlmodel import Session, select
from authx.exceptions import MissingTokenError
from datetime import timedelta
from typing import Any, Sequence

from config import (HOST, PORT, security,
                    config, FRONT_HOST, FRONT_PORT)

from db.models import *
from db.vildationSchemas import *
from db.sql import *
from db.utils import (commit_data, string_tables, get_record)
from utils import (hash_password, verify_password, find_user,
                   get_payload, update_profile_data)


app = FastAPI()


def get_session():
    """
    Открывает сессию с бд
    :return: Session
    """
    with Session(engine) as session:
        yield session


app.add_middleware(
        CORSMiddleware,
        allow_origins=[f"http://{FRONT_HOST}:{FRONT_PORT}"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get('/allVacancy', response_model=list[VacancyCardSchema])
async def get_all_vacancy(
        session: Session = Depends(get_session)
) -> Sequence[Row[tuple[...]]]:
    """
    Возвращает список всех вакансий
    :param session: Session
    :return: list[Row]
    """
    records = session.execute(ALL_VACANCY_STMT)
    all_vacancy = records.fetchall()
    return all_vacancy


@app.get('/vacancy/{vacancy_id}', response_model=VacancyInfoSchema)
async def get_vacancy_info(
        vacancy_id: int,
        session: Session = Depends(get_session)
) -> Row[tuple[Any, ...] | Any]:
    """
    Возвращает информацию о вакансии из запроса
    :param vacancy_id: айди вакансии
    :param session: подключение к бд
    :return: собранная информация
    """
    record = session.execute(
        VACANCY_INFO_STMT,
        {"vacancy_id": vacancy_id}
    )
    vacancy_info = record.fetchone()
    return vacancy_info


@app.get('/account/canSignUp')
async def can_sign_up(
        login: str,
        session: Session = Depends(get_session)
) -> bool:
    """
    Функция проверяет может ли юзер быть зарегистрирован
    :param login: введенный логин (телефон или номер)
    :param session: подключение к бд
    :return: булевое значение, обозначающее может ли юзер быть зарегистрирован
    """
    user = find_user(session, login)
    if user:
        raise HTTPException(status_code=401, detail='Пользователь с такими данными уже существует')

    return True


@app.post('/account/signUp')
async def sign_up(
        data: dict,
        session: Session = Depends(get_session),
        role: str = Header(None, alias="X-User-Role")
) -> dict[str, str]:
    """
    :param data: словарь с логином и паролем
    :param session: подключение к бд
    :param role: роль юзера (кандидат или компания)
    :return: сообщение об успешной регистрации
    """
    data_main = None
    data_info = None
    if role == 'candidate':
        login_is_mail = '@' in data['login']
        data_main = Candidate(
            firstName=data['firstName'],
            lastName=data['lastName'],
            # get возвращает пустую строку, а мне надо null в бд (да, or выберет None, лол)
            patronymic=data.get('patronymic') or None,
            phone=data['login'] if not login_is_mail else None,
            mail=data['login'] if login_is_mail else None,
            password=data['candidatePass']
        )
        data_main.password = hash_password(data_main.password)
        commit_data(session, data_main)

        candidate_id = data_main.id
        data_info = CandidateInfo(candidate_id=candidate_id)
        # data_education = CandidateEducation(candidate_id=candidate_id)
        commit_data(session, data_info)
        # commit_data(session, data_education)
    elif role == 'company':
        data_main = Company(
            name=data['companyName'],
            mail=data['login'],
            password=data['companyPass']
        )

    return {'message': 'Успешная регистрация'}


@app.post('/account/login')
async def login_user(
        data: dict,
        response: Response,
        session: Session = Depends(get_session)
) -> dict[str, str]:
    """
    :param data: логин и пароль юзера
    :param response: ответ с сервера, для установки куки
    :param session: подключение к бд
    :return: сообщение об успешной регистрации
    """
    login = data['login']
    password = data['pass']

    user = find_user(session, login)

    if not user:
        raise HTTPException(status_code=401, detail="Неверный номер телефона или почта")
    else:
        if not verify_password(password, user.password):
            raise HTTPException(status_code=401, detail="Неверный пароль")

    token = security.create_access_token(
        str(user.id),
        data={
            'uid': str(user.id),
            'role': user.__class__.__tablename__
        },
        expiry=timedelta(hours=1)
    )
    response.set_cookie(
        key=config.JWT_ACCESS_COOKIE_NAME,
        value=token,
        expires=60 * 60
    )

    return {'message': 'Успешный вход'}


@app.patch('/account/updateProfile')
async def update_profile(
        data: dict,
        request: Request,
        session: Session = Depends(get_session)
) -> None:
    """
    :param data: данные для обновления в бд
    :param session: подключение к бд
    """
    if not data:
        return
    table_row = None

    for table, changes in data.items():
        table = string_tables[table]
        if type(changes) == dict:
            record_id = changes['id']
            update_profile(session, table, changes, record_id)
        elif type(changes) == list:
            for update in changes:
                record_id = update.get('id')
                if update.get('_new'):
                    candidate_id = await get_user_id(request)
                    update_profile_data(session, table, update,
                                        record_id, candidate_id)
                else:
                    update_profile_data(session, table, update, record_id)


@app.get('/getRole')
async def get_role(
        request: Request
) -> str:
    """
    Возвращает из куки роль юзера
    :param request: запрос от юзера
    :return: роль (кандидат или компания)
    """
    payload = get_payload(request)
    role = payload.model_extra['role']
    return role


@app.get('/getUserId')
async def get_user_id(
        request: Request
) -> str:
    """
    Возвращает из куки айди юзера
    :param request: запрос от юзера
    :return: айди юзера (из Candidate или Company)
    """
    payload = get_payload(request)
    uid = payload.model_extra['uid']
    return uid


@app.get('/allCandidates', response_model=list[CandidateCardSchema])
async def get_all_candidate(
        session: Session = Depends(get_session)
) -> Sequence[Row[tuple[...]]]:
    candidates = session.query(Candidate).all()
    return candidates


@app.get('/candidate/{candidate_id}', response_model=CandidateDataSchema)
async def get_candidate_data(
        candidate_id: int,
        session: Session = Depends(get_session)
):
    """
    Возвращает все данные о кандидате
    :param candidate_id: айди кандидата
    :param session: подключение к бд
    :return: собранные данные о кандидате
    """
    param = {'field': 'candidate_id', 'value': candidate_id}

    # основная информация
    record = get_record(session, CANDIDATE_MAIN_DATA_STMT, param)
    candidate_main_data = record.fetchone()

    # собираем инфу об учебе
    record = get_record(session, CANDIDATE_EDUCATION_DATA_STMT, param)
    candidate_education_data = record.fetchall()

    # собираем инфу об опыте работы
    record = get_record(session, CANDIDATE_EXPERIENCE_DATA_STMT, param)
    candidate_work_experience = record.fetchall()

    candidate_data = {
        'main_data': candidate_main_data,
        'education': candidate_education_data,
        'experience': candidate_work_experience
    }

    return candidate_data

@app.post('/sendResponse', dependencies=[Depends(security.access_token_required)])
async def send_response(
        data: dict,
        request: Request,
        session: Session = Depends(get_session)
) -> dict[str, str]:
    """
    Записываем отклик/приглашение в таблицу Responses
    :param data: входные данные (роль, сопроводительное письмо/приглашение, айдишники и тд)
    :param request: запрос от юзера
    :param session: подключение к бд
    :return: сообщение об успехе
    """
    payload = get_payload(request)
    res_mess = data['resMess']
    role = data['role']
    data_db = None

    if role == 'candidate':
        candidate_id = int(payload.model_extra['uid'])
        vacancy_id = int(data['vacancyId'])

        data_db = Responses(vacancy_id=vacancy_id,
                            candidate_id=candidate_id,
                            response_type=1,
                            message=res_mess)
    elif role == 'company':
        company_id = int(payload.model_extra['uid'])
        candidate_id = int(data['candidateId'])

        data_db = Responses(company_id=company_id,
                            candidate_id=candidate_id,
                            response_type=2,
                            message=res_mess)

    commit_data(session, data_db)

    response_name = 'Резюме' if role == 'candidate' else 'Приглашение'
    return {'message': f'{response_name} успешно отправлено'}


@app.get('/isResponseAnswered')
async def is_response_answered(
        request: Request, vacancy_id: int = Query(None),
        candidate_id: int = Query(None), response_type: int = Query(None),
        session: Session = Depends(get_session)
) -> None | bool:
    """
    Возвращает статус ответа (из таблицы Responses) для соответствующего сообщения
    :param vacancy_id: айди вакансии
    :param candidate_id: айди кандидата
    :param response_type: тип запрос (1 - от соискателя, 2 - от компании)
    :param request: запрос от юзера
    :param session: подключение к бд
    :return: None, 0 или 1
    """
    payload = get_payload(request)
    user_id = int(payload.model_extra['uid'])
    stmt = None

    if response_type == 1:
        stmt = select(Responses.is_answered).where(
            Responses.vacancy_id == vacancy_id,
            Responses.candidate_id == user_id,
            Responses.response_type == 1
        )
    elif response_type == 2:
        stmt = select(Responses.is_answered).where(
            Responses.company_id == user_id,
            Responses.candidate_id == candidate_id,
            Responses.response_type == 2
        )

    is_answered = session.exec(stmt).first()
    return is_answered


@app.exception_handler(MissingTokenError)
async def missing_token_handler(
        request: Request, exc: MissingTokenError
) -> JSONResponse:
    """
    Обрабатывает ошибку авторизации
    :param request: запрос от юзера
    :param exc: ошибка
    :return: сообщение со статусом ошибки
    """
    return JSONResponse(
        status_code=401,
        content={"detail": "Требуется авторизация."}
    )


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=HOST,
        port=PORT
    )
