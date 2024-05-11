from pydantic import BaseModel, EmailStr

class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    age: int
    marital_status: str
    address: str
    
    class Config:
        orm_mode = True
