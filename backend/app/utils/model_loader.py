import os
import pickle
import joblib

# Determine absolute path to models directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# Allow override via environment variable for deployment flexibility
MODELS_DIR = os.environ.get("MODELS_DIR", os.path.join(BASE_DIR, "models"))

class ModelLoader:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
            cls._instance._load_models()
        return cls._instance

    def _load_models(self):
        try:
            # Diabetes model
            diabetes_path = os.path.join(MODELS_DIR, "diabetes_model_simple.pkl")
            self.diabetes_model = self._load_file(diabetes_path)
            
            # Heart model
            heart_model_path = os.path.join(MODELS_DIR, "heart_model", "heart_model.pkl")
            self.heart_model = self._load_file(heart_model_path)
            
            heart_features_path = os.path.join(MODELS_DIR, "heart_model", "features.pkl")
            self.heart_features = self._load_file(heart_features_path)
            
            heart_threshold_path = os.path.join(MODELS_DIR, "heart_model", "threshold.pkl")
            self.heart_threshold = self._load_file(heart_threshold_path)
            
            # Stress model
            stress_model_path = os.path.join(MODELS_DIR, "stress_model", "stress_model.pkl")
            self.stress_model = self._load_file(stress_model_path)
            
            stress_features_path = os.path.join(MODELS_DIR, "stress_model", "stress_features.pkl")
            self.stress_features = self._load_file(stress_features_path)
            
            stress_label_map_path = os.path.join(MODELS_DIR, "stress_model", "stress_label_map.pkl")
            self.stress_label_map = self._load_file(stress_label_map_path)
            
        except Exception as e:
            print(f"Error loading models: {e}")
            raise

    def _load_file(self, file_path):
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Model file not found: {file_path}")
        
        try:
            with open(file_path, "rb") as f:
                return pickle.load(f)
        except Exception:
            # Try joblib if pickle fails
            return joblib.load(file_path)

model_loader = ModelLoader()
