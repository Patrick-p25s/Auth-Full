from app.users.schema import UserCreate, UserOut, LoginRequest, LoginOut
from app.users.repository import UserRepository
from app.core.security import hash_password, check_password
from app.core.token import create_token

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
                "password": hash_password(new_user.password),
            }
        )

    async def login(self, data: LoginRequest):
        user = await self.repo.get_by_email(data.email)

        if user is None or not check_password(data.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        token = create_token({"sub": user.id})

        return LoginOut(access_token=token, token_type="Barear")
