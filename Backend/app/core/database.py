from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.core.config import setting
from sqlalchemy.orm import DeclarativeBase

engine = create_async_engine(url=setting.DATABASE_URL, echo=True)

AsyncSessionLocal = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=True
)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with AsyncSessionLocal as session:
        yield session
