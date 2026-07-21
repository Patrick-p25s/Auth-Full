from app.Tache.schemas import TaskCreate, TaskOut
from app.Tache.repository import TaskRepository

from fastapi import HTTPException, status
from uuid import UUID

# Le coeur du logique, relie les route au base de donnée, gestion de l'erreur etc


class TaskService:
    def __init__(self, repo: TaskRepository):
        self.repo = repo

    async def create_task(self, new_task: TaskCreate, user_id: UUID | str) -> TaskOut:
        return await self.repo.create(
            {
                "tache": new_task.tache,
                "category": new_task.category,
                "user_id": user_id,
            }
        )

    async def update_task(self, id: UUID, task: TaskCreate, user_id: UUID) -> TaskOut:
        tache = await self.repo.get_by_id(id, user_id=user_id)
        if tache is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Tache non trouvé"
            )
        data = {"tache": task.tache, "category": task.category}
        return await self.repo.update(tache=tache, data=data)

    async def delete_tache(self, id: UUID, user_id: UUID) -> bool:
        tache = await self.repo.get_by_id(id=id, user_id=user_id)
        if tache is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Tache non trouvé"
            )

        await self.repo.delete(tache=tache)
        return True

    async def finish_toogle(self, id: UUID, user_id: UUID) -> TaskOut:
        tache = await self.repo.get_by_id(id=id, user_id=user_id)
        if tache is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Tache non trouve"
            )

        data = {
            "tache": tache.tache,
            "category": tache.category,
            "is_completed": not tache.is_completed,
        }
        return await self.repo.update(tache=tache, data=data)

    async def get_tache(self, id: UUID, user_id: UUID) -> TaskOut:
        tache = await self.repo.get_by_id(id=id, user_id=user_id)
        if tache is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Tache non trouvé"
            )
        return tache

    async def get_all(self, user_id: UUID) -> list[TaskOut | None]:
        return await self.repo.get_all(user_id=user_id)
