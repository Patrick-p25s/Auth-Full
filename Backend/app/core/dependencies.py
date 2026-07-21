from app.core.token import decode_token
from fastapi import Depends, HTTPException, status
from app.core.database import get_db
from app.users.repository import UserRepository
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordBearer
from uuid import UUID


auth2_scheme = OAuth2PasswordBearer("/user/login")


async def get_current_user(
    token: str = Depends(auth2_scheme), db: AsyncSession = Depends(get_db)
):
    payload = decode_token(token=token)

    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    user = await UserRepository(db=db).get_by_id(UUID(payload["sub"]))

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalide crédentials"
        )

    return user
