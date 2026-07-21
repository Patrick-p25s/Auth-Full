from app.core.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, DateTime, Boolean, func, Enum, ForeignKey
from datetime import datetime
import uuid
from enum import Enum as PyEnum

from app.core.Model_base import IdTimeStamp


class Category(str, PyEnum):
    perso = "perso"
    groupe = "groupe"
    pro = "pro"
    autre = "autre"


class Taches(Base, IdTimeStamp):
    __tablename__ = "Tasks"

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )
    tache: Mapped[str] = mapped_column(String(250), nullable=False)
    category: Mapped[Category] = mapped_column(
        Enum(Category),
        default=Category.perso,
        nullable=False,
    )
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)

    owner: Mapped["Users"] = relationship(back_populates="taches", uselist=True)
