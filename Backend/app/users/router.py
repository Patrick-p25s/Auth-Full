from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.users.schema import UserCreate, UserOut
from app.users.repository import UserRepository
from app.users.service import UserService

router = APIRouter(prefix="/user", tags=["User route"])


@router.post("/register", response_model=UserOut)
async def registering(new_user: UserCreate, db: AsyncSession = Depends(get_db)):
    return await UserService(UserRepository(db=db)).register(new_user=new_user)
