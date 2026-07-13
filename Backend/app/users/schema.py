from pydantic import BaseModel, EmailStr, Field
import uuid
import datetime


class UserCreate(BaseModel):
    name: str = Field(default="Your name")
    password: str = Field(default="password")
    email: EmailStr = Field(default="name@example.com")


class UserOut(UserCreate):
    id: uuid.UUID | str
    role: str
    create_at: datetime.datetime
