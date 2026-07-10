from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID


class UserCreate(BaseModel):
    name: str
    password: str
    email: EmailStr


class UserOut(UserCreate):
    id: str
    create_at: datetime
