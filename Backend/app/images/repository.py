import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.images.models import FileUpload


class FileUploadRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, file_upload: FileUpload) -> FileUpload:
        self.session.add(file_upload)
        await self.session.commit()
        await self.session.refresh(file_upload)
        return file_upload

    async def get_by_id(self, file_id: uuid.UUID) -> FileUpload | None:
        result = await self.session.execute(
            select(FileUpload).where(FileUpload.id == file_id)
        )
        return result.scalar_one_or_none()

    async def list_all(self, skip: int = 0, limit: int = 50) -> list[FileUpload]:
        result = await self.session.execute(
            select(FileUpload).offset(skip).limit(limit)
        )
        return list(result.scalars().all())
