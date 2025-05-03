from sqlmodel import (SQLModel, Field,
                      create_engine, Relationship)
from sqlalchemy import JSON, String
from sqlalchemy.orm import declarative_base
from datetime import datetime
from typing import List


class Company(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    password: str = Field(sa_type=String(64))
    phone: str = Field(default=None)
    mail: str
    region: str = Field(default=None)
    description: str
    address: str = Field(default=None)
    deleted: bool = Field(default=False)
    vacancies: List['Vacancy'] = Relationship(back_populates='company')


class Candidate(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    firstName: str
    lastName: str
    patronymic: str = Field(default=None)
    phone: str = Field(default=None)
    mail: str
    password: str = Field(sa_type=String(64))
    job: str = Field(default=None)
    workExperience: str = Field(default=None)


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
    jobDescription: str = Field(sa_type=String(1024))
    deleted: bool = Field(default=False)
    vacancy_id: int = Field(foreign_key='vacancy.id')
    vacancy: Vacancy = Relationship(back_populates='vacancy_info')


class Responses(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    vacancy_id: int = Field(foreign_key='vacancy.id', nullable=True)
    candidate_id: int = Field(foreign_key='candidate.id', nullable=True)
    company_id: int = Field(foreign_key='company.id', nullable=True)
    response_type: str = Field(default=None)
    message: str = Field(nullable=True)


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


engine = create_engine("mysql+pymysql://dbuser:dbpassword@26.163.65.187:3306/dpmdb")
SQLModel.metadata.create_all(engine)
Base = declarative_base()