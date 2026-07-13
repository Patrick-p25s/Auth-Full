from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import uuid
from app.users.models import Users
from app.users.schema import UserCreate, UserOut


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, id: str | uuid.UUID):
        stmt = await self.db.execute(select(Users).where(Users.id == id))
        return stmt.scalar_one_or_none()

    async def get_by_email(self, email: str):
        stmt = await self.db.execute(select(Users).where(Users.email == email))
        return stmt.scalar_one_or_none()

    async def create(self, data: dict):
        new_user = Users(**data)
        self.db.add(new_user)
        await self.db.commit()
        await self.db.refresh(new_user)
        return new_user
