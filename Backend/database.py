from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

database_url = "sqlite:///./database.db"

engine = create_engine(database_url, echo=True, pool_pre_ping=True)
SessionLocal = sessionmaker(engine, autoflush=True)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
