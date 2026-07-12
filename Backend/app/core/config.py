from pydantic_settings import BaseSettings


class Setting(BaseSettings):
    DATABASE_URL: str
    ALGORITHM: str
    EXPIRES_TOKEN: int
    SECRET_KEY: str

    class Config:
        env_file = ".env"


setting = Setting()
