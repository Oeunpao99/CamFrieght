from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg://camfreight:camfreight@localhost:5432/camfreight"
    REDIS_URL: str = "redis://localhost:6379/0"
    CORS_ORIGINS: str = "http://localhost:5173"

    AZURE_OPENAI_API_KEY: str = ""
    AZURE_OPENAI_ENDPOINT: str = ""
    AZURE_OPENAI_DEPLOYMENT: str = "gpt-5.2"
    AZURE_OPENAI_API_VERSION: str = "2024-10-21"

    ADMIN_USERNAME: str = "superadmin@quote"
    ADMIN_PASSWORD: str = "superadmin@password"

    class Config:
        env_file = ".env"


settings = Settings()
