from sqlalchemy import Column, Integer, String
from fastapi_utils.guid_type import GUID, GUID_DEFAULT_SQLITE
from database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(GUID, primary_key=True, default=GUID_DEFAULT_SQLITE)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    age = Column(Integer)
    marital_status = Column(String)
    address = Column(String)
