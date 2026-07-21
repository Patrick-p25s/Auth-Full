from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.users.schema import UserCreate, UserOut, LoginOut, LoginRequest
from app.users.repository import UserRepository
from app.users.service import UserService

router = APIRouter(prefix="/user", tags=["User route"])


def _get_service(db: AsyncSession = Depends(get_db)):
    return UserService(UserRepository(db))


@router.post("/register", response_model=UserOut)
async def registering(new_user: UserCreate, sercive=Depends(_get_service)):
    return await sercive.register(new_user=new_user)


@router.post("/login", response_model=LoginOut)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), service=Depends(_get_service)
):
    data = LoginRequest(email=form_data.username, password=form_data.password)
    return await service.login(data)


@router.get("/me", response_model=UserOut)
async def get_my_profile(user=Depends(get_current_user)):
    return await user
