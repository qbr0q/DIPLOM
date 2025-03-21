from sqlmodel import (SQLModel, Field,
                      create_engine, Relationship)
from sqlalchemy import JSON
from datetime import datetime
from typing import List


class Company(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    region: str
    description: str
    address: str
    deleted: bool = Field(default=False)
    vacancies: List['Vacancy'] = Relationship(back_populates='company')


class Vacancy(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    createDate: datetime
    position: str
    salary: float
    duration: str
    currency: str
    isCalling: bool
    deleted: bool = Field(default=False)
    company_id: int = Field(foreign_key='company.id')
    company: Company = Relationship(back_populates='vacancies')
    vacancy_info: List['VacancyInfo'] = Relationship(back_populates='vacancy')


class VacancyInfo(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    jobType: List[str] = Field(default=[], sa_type=JSON)
    jobDuties: List[str] = Field(default=[], sa_type=JSON)
    candidateRequirements: List[str] = Field(default=[], sa_type=JSON)
    jobDescription: str
    deleted: bool = Field(default=False)
    vacancy_id: int = Field(foreign_key='vacancy.id')
    vacancy: Vacancy = Relationship(back_populates='vacancy_info')


class JobTypes(SQLModel, table=True):
    __tablename__ = 'rbJobTypes'

    id: int = Field(default=None, primary_key=True)
    typeName: str


class Duration(SQLModel, table=True):
    __tablename__ = 'rbDuration'

    id: int = Field(default=None, primary_key=True)
    durationName: str


class Currency(SQLModel, table=True):
    __tablename__ = 'rbCurrency'

    id: int = Field(default=None, primary_key=True)
    currencyName: str
    currencySymbol: str


engine = create_engine("mysql+pymysql://dbuser:dbpassword@localhost:3306/dpmdb")
SQLModel.metadata.create_all(engine)
