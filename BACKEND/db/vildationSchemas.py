from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import List
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


class CandidateInfoSchema(BaseModel):
    firstName: str
