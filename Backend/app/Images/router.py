import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db  # adapte selon ta dépendance de session
from app.Images.repository import FileUploadRepository
from app.Images.schema import FileUploadRead
from app.Images.service import FileUploadService

router = APIRouter(prefix="/files", tags=["files"])


def get_file_upload_service(db: AsyncSession = Depends(get_db)) -> FileUploadService:
    return FileUploadService(FileUploadRepository(db))


@router.post(
    "/upload", response_model=FileUploadRead, status_code=status.HTTP_201_CREATED
)
async def upload_file(
    file: UploadFile,
    service: FileUploadService = Depends(get_file_upload_service),
):
    return await service.upload(file)


@router.get("/{file_id}", response_model=FileUploadRead)
async def get_file(
    file_id: uuid.UUID,
    service: FileUploadService = Depends(get_file_upload_service),
):
    result = await service.repository.get_by_id(file_id)
    if not result:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Fichier introuvable")
    return result


@router.get("/", response_model=list[FileUploadRead])
async def list_files(
    skip: int = 0,
    limit: int = 50,
    service: FileUploadService = Depends(get_file_upload_service),
):
    return await service.repository.list_all(skip, limit)
