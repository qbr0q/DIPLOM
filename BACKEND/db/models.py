from sqlmodel import (SQLModel, Field,
                      create_engine, Relationship)
from datetime import datetime
from typing import List


class Company(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    region: str
    description: str
    address: str
    deleted: bool = Field(default=0)
    vacancies: List['Vacancy'] = Relationship(back_populates='company')


class Vacancy(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    createDate: datetime
    position: str
    salary: float
    duration: str
    currency: str
    isCalling: bool
    deleted: bool = Field(default=0)
    company_id: int = Field(foreign_key='company.id')
    company: Company = Relationship(back_populates='vacancies')


engine = create_engine("mysql+pymysql://dbuser:dbpassword@localhost:3306/dpmdb")
SQLModel.metadata.create_all(engine)
