from fastapi import FastAPI
import uvicorn
from sqlmodel import Session

from config import HOST, PORT
from db.models import Company, engine

app = FastAPI()


@app.get('/')
async def test():
    print(1)
    with Session(engine) as session:
        test = session.get(Company, 1)
        print(test.name) # тест подключения к бд


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=HOST,
        port=PORT
    )
