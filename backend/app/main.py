from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .routes import diabetes, heart, stress

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(diabetes.router, prefix="/predict/diabetes", tags=["Diabetes"])
app.include_router(heart.router, prefix="/predict/heart", tags=["Heart"])
app.include_router(stress.router, prefix="/predict/stress", tags=["Stress"])

@app.get("/")
def read_root():
    return {"message": "Welcome to HealthAI API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}