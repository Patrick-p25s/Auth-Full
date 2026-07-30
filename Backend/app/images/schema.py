import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.images.models import FileCategory


class FileUploadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    original_filename: str
    extension: str
    category: FileCategory
    file_path: str
    content_type: str
    size_bytes: int
    created_at: datetime
