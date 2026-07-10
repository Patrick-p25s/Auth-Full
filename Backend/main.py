from fastapi import FastAPI, Depends
from database import get_db, Base
from Schema import UserOut, UserCreate
from CrudUser import create_user
from sqlalchemy.orm import Session

app = FastAPI()


@app.get("/")
def index():
    return {"message": "Bonjour "}


@app.post("/new_user", response_model=UserOut)
def create_new_user(new_user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db=db, new_user=new_user)
