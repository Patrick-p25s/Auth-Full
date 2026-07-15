import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

from app.Images.models import FileCategory, FileUpload
from app.Images.repository import FileUploadRepository

EXTENSION_MAP: dict[str, FileCategory] = {
    # Images
    ".jpg": FileCategory.IMAGE,
    ".jpeg": FileCategory.IMAGE,
    ".png": FileCategory.IMAGE,
    ".gif": FileCategory.IMAGE,
    ".webp": FileCategory.IMAGE,
    ".svg": FileCategory.IMAGE,
    # Vidéos
    ".mp4": FileCategory.VIDEO,
    ".mov": FileCategory.VIDEO,
    ".avi": FileCategory.VIDEO,
    ".mkv": FileCategory.VIDEO,
    ".webm": FileCategory.VIDEO,
    # Documents
    ".pdf": FileCategory.DOCUMENT,
    ".doc": FileCategory.DOCUMENT,
    ".docx": FileCategory.DOCUMENT,
    ".xls": FileCategory.DOCUMENT,
    ".xlsx": FileCategory.DOCUMENT,
    ".txt": FileCategory.DOCUMENT,
    # Audio
    ".mp3": FileCategory.AUDIO,
    ".wav": FileCategory.AUDIO,
    ".ogg": FileCategory.AUDIO,
    # Archives
    ".zip": FileCategory.ARCHIVE,
    ".rar": FileCategory.ARCHIVE,
    ".tar": FileCategory.ARCHIVE,
}

MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 Mo — ajuste selon tes besoins
UPLOAD_ROOT = Path("media/uploads")


class FileUploadService:
    def __init__(self, repository: FileUploadRepository):
        self.repository = repository

    @staticmethod
    def _resolve_category(extension: str) -> FileCategory:
        return EXTENSION_MAP.get(extension.lower(), FileCategory.OTHER)

    async def upload(self, file: UploadFile) -> FileUpload:
        if not file.filename:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Nom de fichier manquant")

        extension = Path(file.filename).suffix.lower()
        category = self._resolve_category(extension)

        # Lecture + vérification de la taille
        content = await file.read()
        size_bytes = len(content)
        if size_bytes > MAX_FILE_SIZE:
            raise HTTPException(
                status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, "Fichier trop volumineux"
            )

        # Dossier classé par catégorie : media/uploads/image/, media/uploads/document/, ...
        target_dir = UPLOAD_ROOT / category.value
        target_dir.mkdir(parents=True, exist_ok=True)

        stored_filename = f"{uuid.uuid4()}{extension}"
        target_path = target_dir / stored_filename

        target_path.write_bytes(content)

        file_upload = FileUpload(
            original_filename=file.filename,
            stored_filename=stored_filename,
            extension=extension,
            category=category,
            file_path=str(target_path),
            content_type=file.content_type or "application/octet-stream",
            size_bytes=size_bytes,
        )
        return await self.repository.create(file_upload)
