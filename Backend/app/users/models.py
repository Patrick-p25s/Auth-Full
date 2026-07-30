from app.core.database import Base
from Backend.app.core.base_model import IdTimeStamp
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, Uuid, func, text
from datetime import datetime
import uuid


class Users(Base, IdTimeStamp):
    __tablename__ = "users"
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[str] = mapped_column(String(50), nullable=False, default="user")
    taches: Mapped["Taches"] = relationship(back_populates="owner")
