from fastapi import APIRouter, HTTPException
from app.schemas.diabetes_schema import DiabetesInput, DiabetesOutput
from app.services.diabetes_service import predict_diabetes

router = APIRouter()

@router.post("", response_model=DiabetesOutput)
async def get_diabetes_prediction(data: DiabetesInput):
    try:
        result = predict_diabetes(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
