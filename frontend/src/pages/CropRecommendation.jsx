import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Loader2, Sprout } from 'lucide-react';
import { mockRecommendCrops, soilTypes, indianStates } from '../mock';
import { Progress } from '../components/ui/progress';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    soil_type: '',
    pH: '',
    N: '',
    P: '',
    K: '',
    region: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = {
      soil_type: formData.soil_type,
      pH: parseFloat(formData.pH),
      N: parseFloat(formData.N),
      P: parseFloat(formData.P),
      K: parseFloat(formData.K),
      region: formData.region
    };
    
    const recommendations = await mockRecommendCrops(data);
    setResult(recommendations);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Crop Recommendation System</h1>
          <p className="text-gray-600 mt-2">Get top 3 suitable crops based on soil conditions</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Soil Information</CardTitle>
              <CardDescription>Enter your soil parameters and location</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="soil_type">Soil Type</Label>
                  <Select onValueChange={(value) => handleSelectChange('soil_type', value)} required>
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil.id} value={soil.id}>{soil.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region / State</Label>
                  <Select onValueChange={(value) => handleSelectChange('region', value)} required>
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pH">pH Level</Label>
                  <Input
                    id="pH"
                    name="pH"
                    type="number"
                    step="0.1"
                    value={formData.pH}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 6.5"
                    className="border-green-200"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="N">N (kg/ha)</Label>
                    <Input
                      id="N"
                      name="N"
                      type="number"
                      value={formData.N}
                      onChange={handleChange}
                      required
                      placeholder="45"
                      className="border-green-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="P">P (kg/ha)</Label>
                    <Input
                      id="P"
                      name="P"
                      type="number"
                      value={formData.P}
                      onChange={handleChange}
                      required
                      placeholder="30"
                      className="border-green-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="K">K (kg/ha)</Label>
                    <Input
                      id="K"
                      name="K"
                      type="number"
                      value={formData.K}
                      onChange={handleChange}
                      required
                      placeholder="50"
                      className="border-green-200"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Recommendations'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Recommended Crops</CardTitle>
                  <CardDescription>Top {result.recommendations.length} suitable crops for your soil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.recommendations.map((crop, index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
                            <Sprout className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                            <p className="text-sm text-gray-600">Season: {crop.season}</p>
                          </div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                          #{index + 1}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Suitability Score</span>
                          <span className="font-bold text-emerald-700">{(crop.probability * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={crop.probability * 100} />
                      </div>
                      
                      <p className="text-xs text-gray-600 mt-3">Suitable for: {crop.suitable_soil}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <p className="text-sm font-medium text-blue-900 mb-1">Algorithm Used</p>
                  <p className="text-lg font-semibold text-blue-700">Random Forest Classifier</p>
                  <p className="text-sm text-blue-600 mt-1">Based on soil type, pH, NPK values, and regional climate</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;