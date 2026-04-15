from fastapi import APIRouter, HTTPException
from app.schemas.stress_schema import StressInput, StressOutput
from app.services.stress_service import predict_stress

router = APIRouter()

@router.post("", response_model=StressOutput)
async def get_stress_prediction(data: StressInput):
    try:
        result = predict_stress(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
