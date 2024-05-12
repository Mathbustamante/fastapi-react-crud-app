from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Annotated
import models, schemas, database

db_dependency = Annotated[Session, Depends(database.get_db)]

router = APIRouter()

@router.get("/")
async def get_users(db: db_dependency):
    users = db.query(models.User).all()
    return {'status': 'success', 'users': users}

@router.get("/{id}")
async def get_user(id: str, db: db_dependency):
    db_user = db.query(models.User).get(id)
    
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with id: {id} not found')
    
    return {"status": "success", "user": db_user}

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(user: schemas.User, db: db_dependency):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Email already exists")
    
    new_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        age=user.age,
        marital_status=user.marital_status,
        address=user.address
    )
    
    db.add(new_user)
    db.commit()
    return {"status": "success", "user": user}

@router.put("/{id}")
async def update_user(id: str, user: schemas.User, db: db_dependency):
    if db.query(models.User).filter(models.User.id != id).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Email already exists")
        
    db_user = db.query(models.User).get(id)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with id: {id} not found')
            
    user_data = user.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    return {"status": "success", "user": user_data}

@router.delete("/{id}")
async def delete_user(id: str, db: db_dependency):
    db_user = db.query(models.User).get(id)
    
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with id: {id} not found')
    
    db.delete(db_user)
    db.commit()
    return {"status": "success", "user": db_user}
