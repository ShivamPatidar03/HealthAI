import numpy as np
import pandas as pd
from app.utils.model_loader import model_loader
from app.schemas.heart_schema import HeartInput, HeartOutput

def predict_heart(data: HeartInput) -> HeartOutput:
    model = model_loader.heart_model
    features_ordered = model_loader.heart_features
    threshold = float(model_loader.heart_threshold)
    
    data_dict = data.model_dump()
    
    input_list = []
    for f in features_ordered:
        input_list.append(data_dict.get(f, 0.0))
            
    features = pd.DataFrame([input_list], columns=features_ordered)
    
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(features)[0]
        probability = float(proba[1]) if len(proba) > 1 else float(proba[0])
        prediction = 1 if probability >= threshold else 0
    else:
        prediction = int(model.predict(features)[0])
        probability = float(prediction)
    
    risk_level = "Elevated Risk" if prediction == 1 else "Low Risk"
    
    recs = ["Maintain current heart-healthy habits", "Stay active"]
    if prediction == 1:
        recs = ["Consult a cardiologist", "Monitor blood pressure", "Consider lipid profile testing"]
        
    return HeartOutput(
        success=True,
        prediction=prediction,
        risk_level=risk_level,
        probability=probability,
        threshold_used=threshold,
        recommendations=recs
    )
