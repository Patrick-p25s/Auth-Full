import uuid
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, DateTime, func


class IdTimeStamp:
    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True), default=lambda: uuid.uuid4(), primary_key=True
    )
    create_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=func.now()
    )
    update_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=func.now(), onupdate=func.now()
    )
