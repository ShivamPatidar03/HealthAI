from pydantic import BaseModel
from typing import List, Optional

class HeartInput(BaseModel):
    Age: float
    GenHlth: float
    HighBP: float
    HighChol: float
    DiffWalk: float
    PhysHlth: float
    Sex: float
    Stroke: float
    Diabetes: float
    Income: float
    BMI: float
    Smoker: float

class HeartOutput(BaseModel):
    success: bool
    model: str = "heart"
    prediction: int
    risk_level: str
    probability: Optional[float] = None
    threshold_used: Optional[float] = None
    recommendations: List[str]
