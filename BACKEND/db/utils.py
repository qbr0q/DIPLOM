from db.models import Candidate, CandidateInfo
from sqlalchemy.orm import Session, DeclarativeBase
from typing import Dict, Any


string_tables = {
    'Candidate': Candidate,
    'CandidateInfo': CandidateInfo
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


def update_data(
        session: Session,
        data: DeclarativeBase,
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
        setattr(data, key, value)

    session.commit()
