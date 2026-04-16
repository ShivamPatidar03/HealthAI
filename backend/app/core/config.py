from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union

class Settings(BaseSettings):
    PROJECT_NAME: str = "HealthAI API"
    API_V1_STR: str = "/api/v1"
    
    # Deployment
    DEBUG: bool = False
    PORT: int = 8000
    
    # CORS
    # Can be a list or a comma-separated string
    CORS_ORIGINS: Union[str, List[str]] = [
        "https://health-ai-pearl-ten.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def get_cors_origins(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, str):
            # Support comma-separated strings from environment variables
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]
        return self.CORS_ORIGINS

settings = Settings()
