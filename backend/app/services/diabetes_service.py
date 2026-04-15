import numpy as np
import pandas as pd
from app.utils.model_loader import model_loader
from app.schemas.diabetes_schema import DiabetesInput, DiabetesOutput

def predict_diabetes(data: DiabetesInput) -> DiabetesOutput:
    feature_names = ['age', 'bmi', 'blood_glucose_level', 'HbA1c_level', 'hypertension']
    features = pd.DataFrame([[
        data.age,
        data.bmi,
        data.blood_glucose_level,
        data.HbA1c_level,
        data.hypertension
    ]], columns=feature_names)
    
    model = model_loader.diabetes_model
    
    prediction = int(model.predict(features)[0])
    
    probability = None
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(features)[0]
        probability = float(proba[1]) if len(proba) > 1 else float(proba[0])
    
    risk_level = "High Risk" if prediction == 1 else "Low Risk"
    confidence = probability * 100 if probability is not None else 85.0
    
    recs = ["Maintain balanced diet", "Exercise regularly"]
    if prediction == 1:
        recs = ["Consult a physician immediately", "Monitor blood glucose levels tightly", "Re-evaluate diet plan"]
        
    return DiabetesOutput(
        success=True,
        prediction=prediction,
        risk_level=risk_level,
        probability=probability,
        confidence=confidence,
        recommendations=recs
    )
