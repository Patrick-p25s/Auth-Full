from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.Tache.model import Taches
from app.Tache.schemas import TaskOut
from uuid import UUID

# Manipulation directe des bases de donnée à appeler dans chaque service


class TaskRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, data: dict) -> TaskOut:
        new_data = Taches(**data)
        self.db.add(new_data)
        await self.db.commit()
        await self.db.refresh(new_data)
        return new_data

    async def get_by_id(self, id: UUID | str, user_id: UUID) -> TaskOut | None:
        stmt = await self.db.execute(
            select(Taches).where(Taches.id == id).where(Taches.user_id == user_id)
        )
        return stmt.scalar_one_or_none()

    async def delete(self, tache: Taches) -> None:
        await self.db.delete(tache)
        await self.db.commit()

    async def update(self, tache: Taches, data: dict) -> TaskOut:
        for key, value in data.items():
            setattr(tache, key, value)
        await self.db.commit()
        await self.db.refresh(tache)
        return tache

    async def get_all(self, user_id: UUID) -> list[TaskOut | None]:
        stmt = await self.db.execute(select(Taches).where(user_id == user_id))
        return stmt.scalars().all()
