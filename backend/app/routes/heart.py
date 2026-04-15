from fastapi import APIRouter, HTTPException
from app.schemas.heart_schema import HeartInput, HeartOutput
from app.services.heart_service import predict_heart

router = APIRouter()

@router.post("", response_model=HeartOutput)
async def get_heart_prediction(data: HeartInput):
    try:
        result = predict_heart(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
