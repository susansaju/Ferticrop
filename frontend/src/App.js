import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SoilImageClassification from './pages/SoilImageClassification';
import SoilAnalysis from './pages/SoilAnalysis';
import CropRecommendation from './pages/CropRecommendation';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import SoilQualityScore from './pages/SoilQualityScore';
import PHEstimation from './pages/PHEstimation';
import CropCalendar from './pages/CropCalendar';
import CostCalculator from './pages/CostCalculator';
import ImprovementTips from './pages/ImprovementTips';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/soil-image" element={<SoilImageClassification />} />
          <Route path="/soil-analysis" element={<SoilAnalysis />} />
          <Route path="/crop-recommendation" element={<CropRecommendation />} />
          <Route path="/fertilizer" element={<FertilizerRecommendation />} />
          <Route path="/soil-quality" element={<SoilQualityScore />} />
          <Route path="/ph-estimation" element={<PHEstimation />} />
          <Route path="/crop-calendar" element={<CropCalendar />} />
          <Route path="/cost-calculator" element={<CostCalculator />} />
          <Route path="/improvement-tips" element={<ImprovementTips />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;