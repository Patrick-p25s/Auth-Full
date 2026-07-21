import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import BigInteger, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.core.Model_base import IdTimeStamp


class FileCategory(str, Enum):
    IMAGE = "image"
    VIDEO = "video"
    DOCUMENT = "document"
    AUDIO = "audio"
    ARCHIVE = "archive"
    OTHER = "other"


class FileUpload(Base, IdTimeStamp):
    __tablename__ = "file_uploads"
    original_filename: Mapped[str] = mapped_column(nullable=False)
    stored_filename: Mapped[str] = mapped_column(nullable=False, unique=True)
    extension: Mapped[str] = mapped_column(nullable=False)
    category: Mapped[FileCategory] = mapped_column(nullable=False)
    file_path: Mapped[str] = mapped_column(nullable=False)
    content_type: Mapped[str] = mapped_column(nullable=False)
    size_bytes: Mapped[int] = mapped_column(BigInteger, nullable=False)
