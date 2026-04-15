import os
import pickle
import joblib
from pathlib import Path
from typing import Any

# Determine absolute path to models directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODELS_DIR = Path(os.environ.get("MODELS_DIR", BASE_DIR / "models"))

class ModelLoader:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
            cls._instance._load_models()
        return cls._instance

    def _load_models(self):
        # 1. Load Mandatory Models (Diabetes & Heart)
        try:
            # Diabetes model
            self.diabetes_model = self._load_file(MODELS_DIR / "diabetes_model_simple.pkl")
            
            # Heart model
            heart_model_dir = MODELS_DIR / "heart_model"
            self.heart_model = self._load_file(heart_model_dir / "heart_model.pkl")
            self.heart_features = self._load_file(heart_model_dir / "features.pkl")
            self.heart_threshold = self._load_file(heart_model_dir / "threshold.pkl")
            
        except Exception as e:
            print(f"CRITICAL: Mandatory models failed to load: {e}")
            raise RuntimeError(f"Startup failed: Mandatory models (Diabetes/Heart) missing or corrupt. {e}")

        # 2. Load Optional Models (Stress - ignored by Git due to size)
        try:
            stress_model_dir = MODELS_DIR / "stress_model"
            self.stress_model = self._load_file(stress_model_dir / "stress_model.pkl")
            self.stress_features = self._load_file(stress_model_dir / "stress_features.pkl")
            self.stress_label_map = self._load_file(stress_model_dir / "stress_label_map.pkl")
            print("INFO: Stress model loaded successfully.")
        except Exception as e:
            self.stress_model = None
            print(f"WARNING: Stress model could not be loaded (likely missing from GitHub due to 100MB+ size). Stress predictions will be unavailable. Error: {e}")

    def _load_file(self, file_path: Path) -> Any:
        if not file_path.exists():
            raise FileNotFoundError(f"Model file not found: {file_path}")
        
        try:
            with open(file_path, "rb") as f:
                return pickle.load(f)
        except Exception:
            try:
                return joblib.load(file_path)
            except Exception as e:
                raise ImportError(f"Failed to load {file_path}: {e}")

model_loader = ModelLoader()
