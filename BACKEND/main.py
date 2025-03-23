from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sqlmodel import Session, select, and_
from datetime import datetime

from config import HOST, PORT
from db.models import *


app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get('/allVacancy', response_model=list[VacancyCard])
async def get_all_vacancy():
    with Session(engine) as session:
        query = select(
            Vacancy.id,
            Vacancy.createDate,
            Vacancy.position,
            Vacancy.salary,
            Vacancy.duration,
            Vacancy.isCalling,
            Company.name,
            Company.region,
            Currency.currencySymbol
        ).join(
            Company
        ).join(
            Currency, Currency.currencyName == Vacancy.currency
        ).where(
            and_(Vacancy.deleted == False, Company.deleted == False)
        ).order_by(
            Vacancy.createDate
        )
        all_vacancy = session.exec(query).all()
    return all_vacancy



@app.get('/vacancy/{vacancyId}')
async def getVacancyInfo(vacancy_id: int):
    with Session(engine) as session:
        vacancy_info = session.get(Vacancy, vacancy_id)
    return vacancy_info


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=HOST,
        port=PORT
    )
