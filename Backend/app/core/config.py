from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Setting(BaseSettings):
    DATABASE_URL: str
    ALGORITHM: str
    EXPIRES_TOKEN: int
    SECRET_KEY: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


setting = Setting()
