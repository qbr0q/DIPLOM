from authx import TokenPayload
from passlib.context import CryptContext
from authx.schema import TokenPayload
from sqlalchemy.orm import Session, DeclarativeBase
from typing import Any, Type
from fastapi import Request

from db.models import Company, Candidate
from db.utils import (insert_row, delete_row, update_row)
from config import config


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(
        password: str
) -> str:
    """
    Возвращает хеш пароля
    :param password: пароль
    :return: хеш пароля
    """
    return pwd_context.hash(password)


def verify_password(
        plain_password: str,
        hashed_password: str
) -> bool:
    """
    Сравнивает хеши пароля из базы и введенного
    :param plain_password: введенный пароль из формы
    :param hashed_password: пароль из базы
    :return: булевое значение, обозначающее совпадение паролей
    """
    return pwd_context.verify(plain_password, hashed_password)


def find_user(
        session: Session,
        login: str | Any
) -> Type[Candidate] | Type[Company]:
    # если входит через почту
    if '@' in login:
        user = session.query(Company).filter(Company.mail == login).first()
        if not user:
            user = session.query(Candidate).filter(Candidate.mail == login).first()
    else:
        user = session.query(Company).filter(Company.phone == login).first()
        if not user:
            user = session.query(Candidate).filter(Candidate.phone == login).first()

    return user


def get_payload(
        request: Request
) -> TokenPayload:
    """
    Возвращает раскодированный токен из куки
    :param request:
    :return:
    """
    token = request.cookies.get("access_token")
    payload = TokenPayload.decode(token, config.JWT_SECRET_KEY)
    return payload


def update_profile_data(
        session,
        table,
        changes,
        record_id,
        candidate_id=None
):
    if changes.get('_new'):
        data_to_insert = table(candidate_id=candidate_id, **changes)
        insert_row(session, data_to_insert)
    elif changes.get('_deleted'):
        row_to_del = session.query(table).filter_by(id=record_id).first()
        delete_row(session, row_to_del)
    else:
        table_row = session.query(table).filter_by(id=record_id).first()
        update_row(session, table_row, changes)

