import os
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv
from urllib.parse import quote


class Settings:
    PROJECT_NAME = "Portfolio"
    PROJECT_VERSION = "0.0.1"

    def __init__(self):
        # Путь для среды разработки: поднимаемся на 3 уровня вверх от config.py до корня проекта prej
        env_path_dev = Path(__file__).parent.parent.parent.parent / '.env'
        # Путь для Docker: предполагаем, что .env смонтирован в корень контейнера
        env_path_docker = Path('/') / '.env'

        # Проверяем, где находится файл .env
        if env_path_docker.exists():
            env_path = env_path_docker
        elif env_path_dev.exists():
            env_path = env_path_dev
        else:
            raise RuntimeError(f".env файл не найден ни в {env_path_dev}, ни в {env_path_docker}")

        # Загружаем .env файл
        if not load_dotenv(dotenv_path=env_path, override=True):
            raise RuntimeError(f"Не удалось загрузить .env файл из {env_path}")

        # Остальная инициализация остается без изменений
        self.POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
        self.POSTGRES_PASSWORD: Optional[str] = os.getenv("POSTGRES_PASSWORD")
        self.POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "db")
        self.POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
        self.POSTGRES_DB: str = os.getenv("POSTGRES_DB", "db")
        self.REDIS_URL: str = os.getenv("REDIS_URL", "redis://redis:6379/0")
        self.ACCESS_TOKEN: str = os.getenv("ACCESS_TOKEN")
        self.NUMBER_ATTEMPTS: int = int(os.getenv("NUMBER_ATTEMPTS"))
        self.SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.SMTP_PORT: int = os.getenv("SMTP_PORT", 465)
        self.SMTP_USERNAME: str = os.getenv("SMTP_USERNAME")
        self.SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD")
        self.RECIPIENT_EMAIL: str = os.getenv("RECIPIENT_EMAIL")

        if not self.ACCESS_TOKEN:
            raise ValueError("ACCESS_TOKEN not set")

    @property
    def ASYNC_DATABASE_URL(self) -> str:
        """Формирует URL для асинхронного подключения к базе данных."""
        password = quote(self.POSTGRES_PASSWORD) if self.POSTGRES_PASSWORD else ""
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{password}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    @property
    def SYNC_DATABASE_URL(self) -> str:
        """Формирует URL для синхронного подключения к базе данных."""
        password = quote(self.POSTGRES_PASSWORD) if self.POSTGRES_PASSWORD else ""
        return (
            f"postgresql://{self.POSTGRES_USER}:{password}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )


settings = Settings()