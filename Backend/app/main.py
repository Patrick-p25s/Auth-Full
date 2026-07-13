from fastapi import FastAPI
from app.users.router import router as user_router

app = FastAPI()


@app.get("/")
def index():
    return {"Message ": "Bonjours Patrick"}


app.include_router(user_router)
