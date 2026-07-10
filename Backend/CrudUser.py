from model import Users
from Schema import UserCreate, UserOut
from sqlalchemy.orm import Session


def create_user(db: Session, new_user: UserCreate) -> UserOut:
    new_user = Users(
        name=new_user.name, email=new_user.email, password=new_user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
