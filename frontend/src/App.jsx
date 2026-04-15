import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DiabetesPrediction from './pages/DiabetesPrediction.jsx';
import HeartDiseasePrediction from './pages/HeartDiseasePrediction.jsx';
import StressPrediction from './pages/StressPrediction.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="models/diabetes" element={<DiabetesPrediction />} />
          <Route path="models/heart" element={<HeartDiseasePrediction />} />
          <Route path="models/stress" element={<StressPrediction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
