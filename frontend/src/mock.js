// Mock data for FertiCrop AI system

export const soilTypes = [
  { id: 'clay', name: 'Clay', description: 'Heavy, sticky soil with good nutrient retention' },
  { id: 'sandy', name: 'Sandy', description: 'Light, gritty soil with good drainage' },
  { id: 'loamy', name: 'Loamy', description: 'Ideal soil with balanced properties' },
  { id: 'laterite', name: 'Laterite', description: 'Rich in iron and aluminum' },
  { id: 'silt', name: 'Silt', description: 'Smooth, fine-grained soil' }
];

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const crops = [
  { name: 'Rice', season: 'Kharif', suitable_soil: ['clay', 'loamy'], min_ph: 5.5, max_ph: 7.0 },
  { name: 'Wheat', season: 'Rabi', suitable_soil: ['loamy', 'clay'], min_ph: 6.0, max_ph: 7.5 },
  { name: 'Cotton', season: 'Kharif', suitable_soil: ['loamy', 'clay'], min_ph: 6.0, max_ph: 8.0 },
  { name: 'Sugarcane', season: 'Perennial', suitable_soil: ['loamy', 'clay'], min_ph: 6.5, max_ph: 7.5 },
  { name: 'Maize', season: 'Kharif', suitable_soil: ['loamy', 'sandy'], min_ph: 5.5, max_ph: 7.5 },
  { name: 'Pulses', season: 'Rabi', suitable_soil: ['loamy', 'clay'], min_ph: 6.0, max_ph: 7.5 },
  { name: 'Groundnut', season: 'Kharif', suitable_soil: ['sandy', 'loamy'], min_ph: 6.0, max_ph: 7.0 },
  { name: 'Soybean', season: 'Kharif', suitable_soil: ['loamy', 'clay'], min_ph: 6.0, max_ph: 7.0 },
  { name: 'Potato', season: 'Rabi', suitable_soil: ['loamy', 'sandy'], min_ph: 5.5, max_ph: 6.5 },
  { name: 'Tomato', season: 'Both', suitable_soil: ['loamy'], min_ph: 6.0, max_ph: 7.0 }
];

export const fertilizers = [
  { name: 'Urea', npk: '46-0-0', price_per_kg: 6, use: 'Nitrogen source' },
  { name: 'DAP', npk: '18-46-0', price_per_kg: 27, use: 'Phosphorus source' },
  { name: 'MOP', npk: '0-0-60', price_per_kg: 17, use: 'Potassium source' },
  { name: 'NPK Complex', npk: '10-26-26', price_per_kg: 24, use: 'Balanced fertilizer' },
  { name: 'Organic Compost', npk: '1-1-1', price_per_kg: 5, use: 'Soil health improvement' },
  { name: 'SSP', npk: '0-16-0', price_per_kg: 8, use: 'Phosphorus and Sulphur' },
  { name: 'Ammonium Sulphate', npk: '21-0-0', price_per_kg: 10, use: 'Nitrogen and Sulphur' }
];

export const cropCalendars = {
  'Rice': [
    { stage: 'Sowing', month: 'June', task: 'Prepare soil, sow seeds or transplant seedlings' },
    { stage: 'Growth', month: 'July-August', task: 'Regular irrigation, apply first dose of fertilizer' },
    { stage: 'Mid-Growth', month: 'September', task: 'Apply second dose of fertilizer, pest control' },
    { stage: 'Maturity', month: 'October', task: 'Reduce irrigation, monitor grain filling' },
    { stage: 'Harvest', month: 'November', task: 'Harvest when grains are golden, thresh and store' }
  ],
  'Wheat': [
    { stage: 'Sowing', month: 'November', task: 'Prepare field, sow seeds with seed drill' },
    { stage: 'Growth', month: 'December-January', task: 'First irrigation, apply nitrogen fertilizer' },
    { stage: 'Mid-Growth', month: 'February', task: 'Second irrigation, weed control' },
    { stage: 'Maturity', month: 'March', task: 'Monitor grain development, pest management' },
    { stage: 'Harvest', month: 'April', task: 'Harvest when moisture content is 15-20%' }
  ],
  'Cotton': [
    { stage: 'Sowing', month: 'April-May', task: 'Deep ploughing, sow seeds' },
    { stage: 'Growth', month: 'June-July', task: 'Regular irrigation, apply fertilizers' },
    { stage: 'Flowering', month: 'August-September', task: 'Pest control, irrigation management' },
    { stage: 'Boll Development', month: 'October', task: 'Monitor boll opening, reduce irrigation' },
    { stage: 'Harvest', month: 'November-January', task: 'Pick cotton when bolls fully open' }
  ],
  'Maize': [
    { stage: 'Sowing', month: 'June-July', task: 'Prepare soil, sow seeds' },
    { stage: 'Growth', month: 'August', task: 'Irrigation, apply nitrogen fertilizer' },
    { stage: 'Flowering', month: 'September', task: 'Ensure adequate moisture, pest control' },
    { stage: 'Maturity', month: 'October', task: 'Monitor cob development' },
    { stage: 'Harvest', month: 'November', task: 'Harvest when moisture is 20-25%' }
  ]
};

export const mockPredictSoilType = (imageFile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const random = Math.random();
      let soilType;
      if (random < 0.3) soilType = 'loamy';
      else if (random < 0.5) soilType = 'clay';
      else if (random < 0.7) soilType = 'sandy';
      else if (random < 0.85) soilType = 'laterite';
      else soilType = 'silt';
      
      resolve({
        soil_type: soilType,
        confidence: (Math.random() * 0.2 + 0.8).toFixed(2),
        probabilities: {
          'clay': (Math.random() * 0.3).toFixed(2),
          'sandy': (Math.random() * 0.3).toFixed(2),
          'loamy': (Math.random() * 0.3).toFixed(2),
          'laterite': (Math.random() * 0.2).toFixed(2),
          'silt': (Math.random() * 0.2).toFixed(2)
        }
      });
    }, 1500);
  });
};

export const mockClassifySoil = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { pH } = data;
      let soilType;
      if (pH < 6.0) soilType = 'laterite';
      else if (pH < 6.5) soilType = 'sandy';
      else if (pH < 7.5) soilType = 'loamy';
      else soilType = 'clay';
      
      resolve({
        soil_type: soilType,
        confidence: (Math.random() * 0.15 + 0.85).toFixed(2)
      });
    }, 1000);
  });
};

export const mockRecommendCrops = (soilData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suitableCrops = crops.filter(crop => 
        crop.suitable_soil.includes(soilData.soil_type) &&
        soilData.pH >= crop.min_ph &&
        soilData.pH <= crop.max_ph
      );
      
      const recommendations = suitableCrops.slice(0, 3).map(crop => ({
        name: crop.name,
        season: crop.season,
        probability: (Math.random() * 0.2 + 0.8).toFixed(2),
        suitable_soil: crop.suitable_soil.join(', ')
      }));
      
      resolve({ recommendations });
    }, 1000);
  });
};

export const mockRecommendFertilizer = (cropName, npkValues) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let recommendedFertilizers = [];
      
      if (npkValues.N < 50) {
        recommendedFertilizers.push({ ...fertilizers[0], quantity: 25, reason: 'Low Nitrogen' });
      }
      if (npkValues.P < 30) {
        recommendedFertilizers.push({ ...fertilizers[1], quantity: 20, reason: 'Low Phosphorus' });
      }
      if (npkValues.K < 40) {
        recommendedFertilizers.push({ ...fertilizers[2], quantity: 15, reason: 'Low Potassium' });
      }
      
      if (recommendedFertilizers.length === 0) {
        recommendedFertilizers.push({ ...fertilizers[4], quantity: 30, reason: 'Maintenance' });
      }
      
      resolve({ fertilizers: recommendedFertilizers });
    }, 1000);
  });
};

export const mockCalculateSoilQuality = (soilData) => {
  const nScore = Math.min(soilData.N / 100, 1);
  const pScore = Math.min(soilData.P / 50, 1);
  const kScore = Math.min(soilData.K / 80, 1);
  const phScore = soilData.pH >= 6.0 && soilData.pH <= 7.5 ? 1 : 0.5;
  const moistureScore = soilData.moisture ? Math.min(soilData.moisture / 100, 1) : 0.7;
  
  const qualityScore = ((nScore + pScore + kScore + phScore + moistureScore) / 5 * 100).toFixed(1);
  
  let qualityLabel;
  if (qualityScore < 40) qualityLabel = 'Poor';
  else if (qualityScore < 60) qualityLabel = 'Moderate';
  else if (qualityScore < 80) qualityLabel = 'Good';
  else qualityLabel = 'Excellent';
  
  return {
    score: qualityScore,
    label: qualityLabel,
    breakdown: {
      nitrogen: (nScore * 100).toFixed(1),
      phosphorus: (pScore * 100).toFixed(1),
      potassium: (kScore * 100).toFixed(1),
      pH: (phScore * 100).toFixed(1),
      moisture: (moistureScore * 100).toFixed(1)
    }
  };
};

export const mockEstimatePH = (imageFile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pH = (Math.random() * 4 + 5).toFixed(1);
      resolve({ pH: parseFloat(pH) });
    }, 1500);
  });
};

export const mockGetSoilImprovementTips = (soilData) => {
  const tips = [];
  
  if (soilData.pH < 6) {
    tips.push({
      issue: 'Low pH (Acidic Soil)',
      suggestion: 'Add lime or dolomite to increase pH. Apply organic manure to improve soil structure.',
      priority: 'High'
    });
  }
  
  if (soilData.pH > 8) {
    tips.push({
      issue: 'High pH (Alkaline Soil)',
      suggestion: 'Add elemental sulfur or gypsum to reduce pH. Incorporate organic matter.',
      priority: 'High'
    });
  }
  
  if (soilData.N < 50) {
    tips.push({
      issue: 'Low Nitrogen',
      suggestion: 'Use Urea, ammonium sulfate, or organic compost to boost nitrogen levels.',
      priority: 'Medium'
    });
  }
  
  if (soilData.P < 30) {
    tips.push({
      issue: 'Low Phosphorus',
      suggestion: 'Apply DAP or SSP. Add bone meal or rock phosphate for organic option.',
      priority: 'Medium'
    });
  }
  
  if (soilData.K < 40) {
    tips.push({
      issue: 'Low Potassium',
      suggestion: 'Use MOP (Muriate of Potash) or wood ash to increase potassium.',
      priority: 'Medium'
    });
  }
  
  if (soilData.soil_type === 'sandy') {
    tips.push({
      issue: 'Sandy Soil - Poor Water Retention',
      suggestion: 'Add organic matter, compost, or coco peat to improve water retention and nutrient holding capacity.',
      priority: 'Medium'
    });
  }
  
  if (soilData.soil_type === 'clay') {
    tips.push({
      issue: 'Clay Soil - Poor Drainage',
      suggestion: 'Add sand, organic matter, or gypsum to improve drainage and aeration.',
      priority: 'Medium'
    });
  }
  
  if (tips.length === 0) {
    tips.push({
      issue: 'Soil Health Maintenance',
      suggestion: 'Your soil is in good condition. Continue with regular organic matter addition and crop rotation.',
      priority: 'Low'
    });
  }
  
  return tips;
};