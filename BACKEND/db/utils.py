from db.models import (Candidate, CandidateInfo, CandidateEducation,
                       CandidateWorkExperience)
from sqlalchemy.orm import Session, DeclarativeBase
from typing import Dict, Any


string_tables = {
    'Candidate': Candidate,
    'CandidateInfo': CandidateInfo,
    'CandidateEducation': CandidateEducation,
    'CandidateWorkExperience': CandidateWorkExperience
}


def commit_data(
        session: Session,
        data: DeclarativeBase
) -> int:
    """
    Коммитит изменения в базу
    :param session: подключение к бд
    :param data: данные для коммита
    :return: айди новой записи
    """
    session.add(data)
    session.commit()
    return data.id


def update_row(
        session: Session,
        table_row: DeclarativeBase,
        values: Dict[str, Dict[str, Any]]
) -> None:
    """
    Устанавливает значение для конкретной записи
    :param session: подключение к бд
    :param data: изменения для обновления
    :param values: словарь
    :return:
    """
    for key, value in values.items():
        setattr(table_row, key, value)

    session.commit()


def insert_row(
        session,
        data
):
    session.add(data)
    session.commit()


def delete_row(
        session,
        row_to_del
):
    session.delete(row_to_del)
    session.commit()


def get_record(session, stmt, param: dict):
    record = session.execute(
        stmt,
        {param['field']: param['value']}
    )
    return record
