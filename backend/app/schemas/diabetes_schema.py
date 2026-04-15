from pydantic import BaseModel
from typing import List, Optional

class DiabetesInput(BaseModel):
    age: float
    bmi: float
    blood_glucose_level: float
    HbA1c_level: float
    hypertension: int

class DiabetesOutput(BaseModel):
    success: bool
    model: str = "diabetes"
    prediction: int
    risk_level: str
    probability: Optional[float] = None
    confidence: Optional[float] = None
    recommendations: List[str]
