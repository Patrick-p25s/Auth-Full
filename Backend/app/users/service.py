from app.users.schema import UserCreate, UserOut
from app.users.repository import UserRepository

from fastapi import HTTPException, status


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def register(self, new_user: UserCreate) -> UserOut:
        if await self.repo.get_by_email(new_user.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        return await self.repo.create(
            {
                "name": new_user.name,
                "email": new_user.email,
                "password": new_user.password,
            }
        )
