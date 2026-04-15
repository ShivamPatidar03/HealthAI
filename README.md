# HealthAI | AI-Powered Predictive Diagnostics

HealthAI is a state-of-the-art health monitoring and predictive diagnostics platform. It leverages advanced Machine Learning models to provide insights into potential health risks like Diabetes, Heart Disease, and Stress levels.

## 🚀 Features

- **Diabetes Prediction**: Analyzes glucose levels, BMI, and other factors.
- **Heart Disease Assessment**: Evaluates cardiovascular health indicators.
- **Stress Monitoring**: Multi-level stress analysis based on lifestyle metrics.
- **Modern UI**: Futuristic, responsive dashboard built with React and GSAP.

---

## 🛠️ Project Structure

```
health_monitoring_system/
├── frontend/           # React Frontend (Vite)
│   ├── src/            # Application logic
│   ├── public/         # Static assets (Favicons, Icons)
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
├── backend/            # FastAPI Backend
│   ├── app/            # Application logic
│   ├── models/         # Pre-trained ML models (.pkl)
│   └── requirements.txt
├── .gitignore          # Root Git ignore
└── README.md           # Project documentation
```

---

## ⚡ Setup Instructions

### Backend (FastAPI)

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```
2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Mac/Linux
   # venv\Scripts\activate     # Windows
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Environment Variables**:
   Copy `.env.example` to `.env` and configure your settings.
5. **Run the server**:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend (React + Vite)

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   Copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.
4. **Run in development**:
   ```bash
   npm run dev
   ```
5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment Notes

- **Frontend**: Best deployed on platforms like Vercel, Netlify, or Render (Static Site).
- **Backend**: Can be deployed on Render (Web Service), Railway, AWS, or any Docker-compatible hosting.
- **CORS**: Ensure `CORS_ORIGINS` in the backend environment matches your deployed frontend URL.

---

## 📄 License

This project is licensed under the MIT License.
