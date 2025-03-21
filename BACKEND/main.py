from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sqlmodel import Session, select

from config import HOST, PORT
from db.models import engine, Company, Vacancy


app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )



@app.get('/')
async def test():
    print(1)
    with Session(engine) as session:
        test = session.get(Vacancy, 1)
        return test.company # тест подключения к бд

@app.get('/allVacancy')
async def get_all_vacancy():
    with Session(engine) as session:
        pass
    all_vacancy = session.exec(select(Vacancy).where(
        Vacancy.deleted == False)
    ).all()
    return all_vacancy


@app.get('/vacancy/{vacancy_id}')
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
