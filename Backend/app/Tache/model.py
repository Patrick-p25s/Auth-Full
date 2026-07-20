from app.core.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, DateTime, Boolean, func, Enum
from datetime import datetime
from enum import Enum as PyEnum

# C'est ici qu'on crée les tables et tous les relation (Models)


class Category(str, PyEnum):
    perso = "perso"
    groupe = "groupe"
    pro = "pro"
    autre = "autre"


class Taches(Base):
    __tablename__ = "Tasks"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    tache: Mapped[str] = mapped_column(String(250), nullable=False)
    category: Mapped[Category] = mapped_column(
        Enum(Category),
        default=Category.perso,
        nullable=False,
    )
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    create_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=func.now()
    )
    update_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=func.now(), onupdate=func.now()
    )
