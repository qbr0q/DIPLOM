from sqlmodel import (SQLModel, Field,
                      create_engine, Relationship)
from sqlalchemy import JSON, String
from datetime import datetime
from typing import List
from pydantic import BaseModel, field_validator
import json


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
    jobDescription: str = Field(sa_type=String(1024))
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


class VacancyCardSchema(BaseModel):
    id: int
    createDate: datetime
    position: str
    salary: float
    duration: str
    isCalling: bool
    name: str
    region: str
    currencySymbol: str


class VacancyInfoSchema(BaseModel):
    position: str
    jobDescription: str
    salary: float
    currencySymbol: str
    duration: str
    jobDuties: List[str]
    candidateRequirements: List[str]
    isCalling: bool
    companyName: str
    companyDescription: str
    companyAddress: str

    @field_validator("jobDuties", "candidateRequirements", mode="before")
    @classmethod
    def parse_json_field(cls, v):
        return json.loads(v)


engine = create_engine("mysql+pymysql://dbuser:dbpassword@localhost:3306/dpmdb")
SQLModel.metadata.create_all(engine)
