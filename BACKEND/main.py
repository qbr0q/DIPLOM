from fastapi import (FastAPI, Header, Depends,
                    Request, Response, HTTPException,
                    Query)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from sqlmodel import Session, select
from authx.exceptions import MissingTokenError
from datetime import timedelta

from config import (HOST, PORT, security,
                    config, FRONT_HOST, FRONT_PORT)

from db.models import *
from db.vildationSchemas import *
from db.sql import *
from utils import (hash_password, verify_password,
                  find_user, get_payload)


app = FastAPI()


def get_session():
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
async def get_all_vacancy(session: Session = Depends(get_session)):
    records = session.execute(ALL_VACANCY_STMT)
    all_vacancy = records.fetchall()
    return all_vacancy


@app.get('/vacancy/{vacancy_id}', response_model=VacancyInfoSchema)
async def getVacancyInfo(vacancy_id: int, session: Session = Depends(get_session)):
    record = session.execute(
        VACANCY_INFO_STMT,
        {"vacancy_id": vacancy_id}
    )
    vacancy_info = record.fetchone()
    return vacancy_info


@app.get('/account/canSignUp')
async def canSignUp(login: str,
                    session: Session = Depends(get_session)):
    user = find_user(session, login)
    if user:
        raise HTTPException(status_code=401, detail='Пользователь с такими данными уже существует')

    return True

@app.post('/account/signUp')
async def signUpUser(data: dict,
                     session: Session = Depends(get_session),
                     role: str = Header(None, alias="X-User-Role")):
    dataDB = None
    if role == 'candidate':
        login_is_mail = '@' in data['login']
        dataDB = Candidate(
            firstName=data['firstName'],
            lastName=data['lastName'],
            patronymic=data.get('patronymic'),
            phone=data['login'] if not login_is_mail else None,
            mail=data['login'] if login_is_mail else None,
            password=data['candidatePass']
        )
    elif role == 'company':
        dataDB = Company(
            name=data['companyName'],
            mail=data['login'],
            password=data['companyPass']
        )

    dataDB.password = hash_password(dataDB.password)
    session.add(dataDB)
    session.commit()
    return {'message': 'Успешная регистрация'}


@app.post('/account/login')
async def loginUser(data: dict,
                    response: Response,
                    session: Session = Depends(get_session)):
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


@app.get('/getRole')
async def getRole(request: Request):
    payload = get_payload(request)
    role = payload.model_extra['role']
    return role


@app.get('/getUserId')
async def getUserId(request: Request):
    payload = get_payload(request)
    uid = payload.model_extra['uid']
    return uid


@app.get('/allCandidates')
async def getAllCandidates(session: Session = Depends(get_session)):
    candidates = session.query(Candidate).all()
    return candidates


@app.get('/candidate/{candidate_id}', response_model=CandidateDataSchema)
async def getCandidateData(candidate_id: int,
                           session: Session = Depends(get_session)):
    record = session.execute(
        CANDIDATE_DATA_STMT,
        {"candidate_id": candidate_id}
    )
    candidate_data = record.fetchone()
    return candidate_data

# TODO: Объединить в одну ручку sendCandidateResponse и sendCompanyResponse
@app.post('/sendCandidateResponse', dependencies=[Depends(security.access_token_required)])
async def sendCandidateResponse(data: dict, request: Request,
                          session: Session = Depends(get_session)):
    payload = get_payload(request)

    candidate_id = int(payload.model_extra['uid'])
    vacancy_id = int(data['vacancyId'])
    res_mess = data['resMess']

    dataDB = Responses(vacancy_id=vacancy_id,
                       candidate_id=candidate_id,
                       response_type=1,
                       message=res_mess)
    session.add(dataDB)
    session.commit()

    return {'message': 'Резюме успешно отправлено'}


@app.post('/sendCompanyResponse', dependencies=[Depends(security.access_token_required)])
async def sendCandidateResponse(data: dict, request: Request,
                                session: Session = Depends(get_session)):
    payload = get_payload(request)

    company_id = int(payload.model_extra['uid'])
    candidate_id = int(data['candidateId'])
    res_mess = data['resMess']

    dataDB = Responses(company_id=company_id,
                       candidate_id=candidate_id,
                       response_type=2,
                       message=res_mess)
    session.add(dataDB)
    session.commit()

    return {'message': 'Приглашение успешно отправлено'}


@app.get('/isResponseAnswered')
async def isResponseAnswered(request: Request, vacancy_id: int = Query(None),
                             candidate_id: int = Query(None), response_type: int = Query(None),
                             session: Session = Depends(get_session)) -> None | bool:
    """
    Ручка смотрит на статут ответа (is_answered) в таблице Responses для обеих ролей
    :param vacancy_id: айди вакансии
    :param candidate_id: айди кандидата
    :param response_type: тип запрос (1 - от соискателя, 2 - от компании)
    :param request: реквест с запроса (Request)
    :param session: подключение к бд (Session)
    :return: None, 0 или 1
    """
    payload = get_payload(request)
    user_id = int(payload.model_extra['uid'])

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
async def missing_token_handler(request: Request, exc: MissingTokenError):
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
