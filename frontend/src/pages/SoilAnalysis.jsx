import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { mockClassifySoil, soilTypes } from '../mock';

const SoilAnalysis = () => {
  const [formData, setFormData] = useState({
    pH: '',
    N: '',
    P: '',
    K: '',
    organicCarbon: '',
    moisture: '',
    EC: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = {
      pH: parseFloat(formData.pH),
      N: parseFloat(formData.N),
      P: parseFloat(formData.P),
      K: parseFloat(formData.K),
      organicCarbon: parseFloat(formData.organicCarbon),
      moisture: parseFloat(formData.moisture),
      EC: parseFloat(formData.EC)
    };
    
    const prediction = await mockClassifySoil(data);
    setResult(prediction);
    setLoading(false);
  };

  const getSoilInfo = (soilType) => {
    return soilTypes.find(s => s.id === soilType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Soil Classification (Random Forest)</h1>
          <p className="text-gray-600 mt-2">Enter soil parameters for RF-based classification</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Soil Parameters</CardTitle>
              <CardDescription>Enter measured values from your soil sample</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pH">pH Level (0-14)</Label>
                  <Input
                    id="pH"
                    name="pH"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.pH}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 6.5"
                    className="border-green-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="N">Nitrogen (N) - kg/ha</Label>
                  <Input
                    id="N"
                    name="N"
                    type="number"
                    step="0.1"
                    value={formData.N}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 45"
                    className="border-green-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="P">Phosphorus (P) - kg/ha</Label>
                  <Input
                    id="P"
                    name="P"
                    type="number"
                    step="0.1"
                    value={formData.P}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 30"
                    className="border-green-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="K">Potassium (K) - kg/ha</Label>
                  <Input
                    id="K"
                    name="K"
                    type="number"
                    step="0.1"
                    value={formData.K}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 50"
                    className="border-green-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organicCarbon">Organic Carbon (%)</Label>
                  <Input
                    id="organicCarbon"
                    name="organicCarbon"
                    type="number"
                    step="0.1"
                    value={formData.organicCarbon}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 0.8"
                    className="border-green-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moisture">Moisture Content (%)</Label>
                  <Input
                    id="moisture"
                    name="moisture"
                    type="number"
                    step="0.1"
                    value={formData.moisture}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 25"
                    className="border-green-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="EC">Electrical Conductivity (EC) - dS/m</Label>
                  <Input
                    id="EC"
                    name="EC"
                    type="number"
                    step="0.1"
                    value={formData.EC}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 0.5"
                    className="border-green-200 focus:border-emerald-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Classifying...
                    </>
                  ) : (
                    'Classify Soil'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result */}
          {result && (
            <Card className="border-green-100 animate-in fade-in duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <CardTitle>Classification Result</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 mb-2">Predicted Soil Type</p>
                  <p className="text-4xl font-bold text-emerald-700 capitalize mb-2">
                    {getSoilInfo(result.soil_type)?.name}
                  </p>
                  <p className="text-gray-700 mb-4">{getSoilInfo(result.soil_type)?.description}</p>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Model Confidence</p>
                    <p className="text-2xl font-bold text-emerald-700">{(result.confidence * 100).toFixed(1)}%</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-2">Algorithm Used</p>
                  <p className="text-lg font-semibold text-blue-700">Random Forest Classifier</p>
                  <p className="text-sm text-blue-600 mt-1">Based on NPK, pH, moisture, and EC values</p>
                </div>

                <Button 
                  onClick={() => setResult(null)}
                  variant="outline"
                  className="w-full border-green-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Classify Another Sample
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysis;