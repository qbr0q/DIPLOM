from passlib.context import CryptContext
from authx.schema import TokenPayload

from db.models import Company, Candidate
from config import config


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def find_user(session, login):
    if '@' in login: # если входим через почту
        user = session.query(Company).filter(Company.mail == login).first()
        if not user:
            user = session.query(Candidate).filter(Candidate.mail == login).first()
    else:
        user = session.query(Company).filter(Company.phone == login).first()
        if not user:
            user = session.query(Candidate).filter(Candidate.phone == login).first()

    return user


def get_payload(request):
    token = request.cookies.get("access_token")
    payload = TokenPayload.decode(token, config.JWT_SECRET_KEY)
    return payload

