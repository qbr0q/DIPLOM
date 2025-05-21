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
    birth_date: str | None
    sex: str | None
    about: str | None
    image_base64: str | None


class CandidateEducationSchema(BaseModel):
    id: int
    institution: str | None
    specialization: str | None
    education_start_date: str | None
    education_end_date: str | None


class CandidateWorkExperienceSchema(BaseModel):
    id: int
    company_name: str | None
    position: str | None
    experience: int | None


class CandidateSkillsSchema(BaseModel):
    id: int
    skill_name: str | None
    level: int | None


class CandidateDataSchema(BaseModel):
    main_data: Optional[CandidateMainDataSchema]
    education: Optional[CandidateEducationSchema]
    experience: List[CandidateWorkExperienceSchema]
    skills: List[CandidateSkillsSchema]
