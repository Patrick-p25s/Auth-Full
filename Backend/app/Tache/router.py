from sqlalchemy.ext.asyncio import AsyncSession
from app.Tache.schemas import TaskCreate, TaskOut
from app.Tache.model import Taches
from app.Tache.service import TaskService
from app.Tache.repository import TaskRepository
from app.core.database import get_db

from fastapi import Depends, Query, APIRouter
from typing import Annotated


def _get_service(db: AsyncSession = Depends(get_db)) -> TaskService:
    return TaskService(TaskRepository(db=db))


router = APIRouter(prefix="/task", tags=["Tache manipulation"])


@router.post("/create", response_model=TaskOut, summary="Créer un tache par un")
async def create_task(
    tache: Annotated[TaskCreate, Query()], service=Depends(_get_service)
) -> TaskOut:
    return await service.create_task(tache)


@router.get("/get/{id}", summary="Recupérér un tache par son id")
async def get_task(id: int, service=Depends(_get_service)):
    return await service.get_tache(id)


@router.get("/get", summary="Recupérer tous les taches disponible")
async def get_all(service=Depends(_get_service)):
    return await service.get_all()


@router.put("/update/{id}", summary="Mettre à jours les contenus de tache")
async def update_task(id: int, task: TaskCreate, service=Depends(_get_service)):
    return await service.update_task(id, task)


@router.patch("/finish/{id}", summary="Finir ou refaire la tache par id")
async def finished_toogle(id: int, service=Depends(_get_service)):
    return await service.finish_toogle(id)


@router.delete("/delete/{id}", summary="Supprimer un tache par son id")
async def delete_task(id: int, service=Depends(_get_service)):
    return await service.delete_tache(id)
