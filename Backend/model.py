from uuid import UUID, uuid4
from database import Base
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import String, Integer, DateTime, Uuid, func, Boolean


def get_uuid():
    return str(uuid4())


class Users(Base):
    __tablename__ = "user"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=get_uuid())
    name: Mapped[str] = mapped_column(String(250))
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    create_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now())


class Tache(Base):
    __tablename__ = "taches"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=get_uuid())
    tache: Mapped[str] = mapped_column(String(50), nullable=False)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    category: Mapped[str] = mapped_column(String(150), nullable=False)
    create_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now())
