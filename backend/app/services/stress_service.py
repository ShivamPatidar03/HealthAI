import numpy as np
import pandas as pd
from app.utils.model_loader import model_loader
from app.schemas.stress_schema import StressInput, StressOutput

def predict_stress(data: StressInput) -> StressOutput:
    model = model_loader.stress_model
    features_ordered = model_loader.stress_features
    label_map = model_loader.stress_label_map
    
    data_dict = data.model_dump()
    
    input_list = []
    for f in features_ordered:
        input_list.append(data_dict.get(f, 0.0))
            
    features = pd.DataFrame([input_list], columns=features_ordered)
    
    prediction = int(model.predict(features)[0])
    label_str = label_map.get(prediction, "Unknown")
    
    probability = None
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(features)[0]
        probability = float(max(proba))
        
    confidence = probability * 100 if probability is not None else 85.0
    
    tips = ["You're doing great", "Keep up the good work"]
    if prediction > 0: 
        tips = ["Practice breathing exercises", "Improve sleep schedule", "Take short walks during the day"]
        
    return StressOutput(
        success=True,
        prediction=prediction,
        stress_level=label_str,
        label=label_str,
        confidence=confidence,
        wellness_tips=tips
    )
