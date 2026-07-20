from pydantic import BaseModel, ConfigDict
from datetime import datetime
from app.Tache.model import Category

# Tous ce qui est validation des données entrée par l'utilisateur


class TaskCreate(BaseModel):
    tache: str
    category: Category


class TaskOut(TaskCreate):
    id: int
    is_completed: bool
    create_at: datetime
    update_at: datetime

    model_config = ConfigDict(from_attributes=True)
