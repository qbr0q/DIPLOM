from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sqlmodel import Session

from config import HOST, PORT
from db.models import *
from db.sql import *


app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get('/allVacancy', response_model=list[VacancyCardSchema])
async def get_all_vacancy():
    with Session(engine) as session:
        records = session.execute(ALL_VACANCY_STMT)
        all_vacancy = records.fetchall()
    return all_vacancy


@app.get('/vacancy/{vacancy_id}', response_model=VacancyInfoSchema)
async def getVacancyInfo(vacancy_id: int):
    with Session(engine) as session:
        record = session.execute(
            VACANCY_INFO_STMT,
            {"vacancy_id": vacancy_id}
        )
        vacancy_info = record.fetchone()
    return vacancy_info


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=HOST,
        port=PORT
    )
