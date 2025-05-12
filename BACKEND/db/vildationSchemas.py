from pydantic import BaseModel, field_validator
from datetime import datetime, date
from typing import List, Optional
import json


class VacancyCardSchema(BaseModel):
    id: int
    createDate: datetime
    position: str
    salary: float
    duration: str
    isCalling: bool
    name: str
    currencySymbol: str


class CandidateCardSchema(BaseModel):
    id: int
    firstName: str
    lastName: str
    patronymic: str | None
    phone: str | None
    mail: str | None
    password: str


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

    @field_validator("jobDuties", "candidateRequirements", mode="before")
    @classmethod
    def parse_json_field(cls, v):
        return json.loads(v)


class CandidateMainDataSchema(BaseModel):
    candidateId: int
    lastName: str
    firstName: str
    patronymic: str | None
    phone: str | None
    mail: str | None
    candidateInfoId: int
    birth_date: date | None
    sex: str | None
    about: str | None


class CandidateEducationSchema(BaseModel):
    candidateEducationId: int
    institution: str | None
    specialization: str | None
    education_start_date: date | None
    education_end_date: date | None


class CandidateWorkExperienceSchema(BaseModel):
    id: int
    company_name: str | None
    position: str| None
    experience: int | None


class CandidateDataSchema(BaseModel):
    main_data: Optional[CandidateMainDataSchema]
    education: List[CandidateEducationSchema]
    experience: List[CandidateWorkExperienceSchema]
