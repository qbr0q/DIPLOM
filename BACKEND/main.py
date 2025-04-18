from fastapi import (FastAPI, Header, Depends,
                    Request, Response, HTTPException)
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sqlmodel import Session

from config import HOST, PORT, security, config
from db.models import *
from db.vildationSchemas import *
from db.sql import *
from utils import hash_password, verify_password, find_user


app = FastAPI()


def get_session():
    with Session(engine) as session:
        yield session


app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
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


@app.post('/account/signUp')
async def signUpUser(data: dict,
                     session: Session = Depends(get_session),
                     role: str = Header(None, alias="X-User-Role")):
    userMail = find_user(session, data['mail'])
    userPhone = find_user(session, data['phone'])
    if userMail or userPhone:
        raise HTTPException(status_code=401, detail='Пользователь с такими данными уже существует')
    if role == 'candidate':
        dataDB = Candidate(**data)
    elif role == 'company':
        dataDB = Company(**data)
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

    token = security.create_access_token(uid=str(user.id))
    response.set_cookie(
        key=config.JWT_ACCESS_COOKIE_NAME,
        value=token,
        max_age=60 * 60
    )
    return {'message': 'Успешный вход'}


@app.get('/test', dependencies=[Depends(security.access_token_required)])
async def test():
    return {'key': 'top secret'}


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=HOST,
        port=PORT
    )
