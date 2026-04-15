from pydantic import BaseModel
from typing import List, Optional

class StressInput(BaseModel):
    sleep_hours: float
    daily_steps: float
    resting_hr: float
    bmi: float
    cholesterol: float
    water_intake_l: float
    diastolic_bp: float
    systolic_bp: float
    smoker: float
    alcohol: float

class StressOutput(BaseModel):
    success: bool
    model: str = "stress"
    prediction: int
    stress_level: str
    label: str
    confidence: Optional[float] = None
    wellness_tips: List[str]
