from fastapi import FastAPI
from app.users.router import router as user_router
from app.images.router import router as image_router
from app.tache.router import router as task_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # l'URL de ton front Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {"Message ": "Bonjours Patrick"}


app.include_router(user_router)
app.include_router(image_router)
app.include_router(task_router)
