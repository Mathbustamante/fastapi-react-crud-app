from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database, users, models

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, tags=['Users'], prefix='/api/users')

@app.get("/")
async def root():
    return {"message": "Welcome to my API!"}
