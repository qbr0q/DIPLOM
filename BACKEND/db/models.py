from sqlmodel import (SQLModel, Field,
                      create_engine, Relationship)
from sqlalchemy import JSON, String, Column, Text
from sqlalchemy.orm import declarative_base
from datetime import datetime, date
from typing import List


class Company(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    password: str = Field(sa_type=String(64))
    phone: str = Field(default=None, nullable=True)
    mail: str
    vacancies: List['Vacancy'] = Relationship(back_populates='company')


class Candidate(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    firstName: str
    lastName: str
    patronymic: str = Field(default=None, nullable=True)
    phone: str = Field(default=None, nullable=True)
    mail: str = Field(default=None, nullable=True)
    password: str = Field(sa_type=String(64))


class CandidateInfo(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    birth_date: date = Field(default=None, nullable=True)
    sex: str = Field(default=None, nullable=True)
    about: str = Field(sa_type=String(1024), default=None, nullable=True)
    image_base64: str = Field(sa_column=Column(Text, nullable=True))
    candidate_id: int = Field(foreign_key='candidate.id')


class CandidateEducation(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    institution: str = Field(default=None, nullable=True)
    specialization: str = Field(default=None, nullable=True)
    education_start_date: date = Field(default=None, nullable=True)
    education_end_date: date = Field(default=None, nullable=True)
    candidate_id: int = Field(foreign_key='candidate.id')


class CandidateWorkExperience(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    company_name: str = Field(default=None, nullable=True)
    position: str = Field(default=None, nullable=True)
    experience: int = Field(default=None, nullable=True)
    candidate_id: int = Field(foreign_key='candidate.id')


class CandidateSkills(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    skill_name: str = Field(default=None, nullable=True)
    level: int = Field(default=None, nullable=True)
    candidate_id: int = Field(foreign_key='candidate.id')


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
    is_answered: bool = Field(default=False)
    message: str = Field(nullable=True)

# rb справочники
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


class ProfileImages(SQLModel, table=True):
    __tablename__ = 'rbDefaultImages'

    id: int = Field(default=None, primary_key=True)
    name: str
    image_base64: str = Field(sa_column=Column(Text, nullable=True))


engine = create_engine("mysql+pymysql://dbuser:dbpassword@26.163.65.187:3306/dpmdb")
SQLModel.metadata.create_all(engine)
Base = declarative_base()