from app.core.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, String, DateTime, Text, func
import uuid
import datetime


class Tache(Base):
    id: Mapped[str] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: uuid.uuid4().hex
    )
    tache: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(150), nullable=False)
    create_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), default=func.now()
    )
