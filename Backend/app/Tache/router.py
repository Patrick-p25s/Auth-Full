from sqlalchemy.ext.asyncio import AsyncSession
from app.Tache.schemas import TaskCreate, TaskOut
from app.Tache.model import Taches
from app.Tache.service import TaskService
from app.Tache.repository import TaskRepository
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.users.schema import UserOut

from fastapi import Depends, Query, APIRouter
from typing import Annotated
from uuid import UUID


def _get_service(db: AsyncSession = Depends(get_db)) -> TaskService:
    return TaskService(TaskRepository(db=db))


router = APIRouter(prefix="/task", tags=["Tache manipulation"])


@router.post("/create", response_model=TaskOut, summary="Créer un tache par un")
async def create_task(
    tache: Annotated[TaskCreate, Query()],
    service: TaskService = Depends(_get_service),
    user: UserOut = Depends(get_current_user),
) -> TaskOut:
    return await service.create_task(new_task=tache, user_id=user.id)


@router.get("/get/{id}", summary="Recupérér un tache par son id")
async def get_task(
    id: UUID,
    service: TaskService = Depends(_get_service),
    user: UserOut = Depends(get_current_user),
):
    print(type(user.id), user.id)
    return await service.get_tache(id=id, user_id=user.id)


@router.get("/get", summary="Recupérer tous les taches disponible")
async def get_all(
    service: TaskService = Depends(_get_service),
    user: UserOut = Depends(get_current_user),
):
    return await service.get_all(user_id=user.id)


@router.put("/update/{id}", summary="Mettre à jours les contenus de tache")
async def update_task(
    id: UUID,
    task: TaskCreate,
    service: TaskService = Depends(_get_service),
    user: UserOut = Depends(get_current_user),
):
    return await service.update_task(id=id, task=task, user_id=user.id)


@router.patch("/finish/{id}", summary="Finir ou refaire la tache par id")
async def finished_toogle(
    id: UUID,
    service: TaskService = Depends(_get_service),
    user: UserOut = Depends(get_current_user),
):
    return await service.finish_toogle(id=id, user_id=user.id)


@router.delete("/delete/{id}", summary="Supprimer un tache par son id")
async def delete_task(
    id: UUID,
    service: TaskService = Depends(_get_service),
    user: UserOut = Depends(get_current_user),
):
    return await service.delete_tache(id=id, user_id=user.id)
