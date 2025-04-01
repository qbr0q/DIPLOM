from fastapi import FastAPI, Header, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sqlmodel import Session
from passlib.context import CryptContext
from typing import Union

from config import HOST, PORT
from db.models import *
from db.vildationSchemas import *
from db.sql import *


app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
    if role == 'candidate':
        dataDB = Candidate(**data)
    elif role == 'company':
        dataDB = Company(**data)
    session.add(dataDB)
    session.commit()

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=HOST,
        port=PORT
    )
