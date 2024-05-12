import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker
from main import app, database, models

SQLITE_DATABASE_URL = "sqlite:///./test_db.db"

engine = create_engine(
    SQLITE_DATABASE_URL, 
    connect_args={'check_same_thread': False}, 
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture()
def test_db_setup_teardown():
    # Create the tables in the test database
    models.Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        user = models.User(
            id="4d9386e1-0eb5-4938-86b1-fbd119cbef3b",
            first_name="John",
            last_name="Doe",
            email="johndoe@gmail.com",
            age=25,
            marital_status="single",
            address="1017 HR Rotterdam"
        )
        session.add(user)
        session.commit()
    finally:
        session.close()
    yield
    models.Base.metadata.drop_all(bind=engine)
    
app.dependency_overrides[database.get_db] = override_get_db

client = TestClient(app)
