import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Loader2, BarChart3 } from 'lucide-react';
import { mockCalculateSoilQuality, soilTypes } from '../mock';
import { Progress } from '../components/ui/progress';

const SoilQualityScore = () => {
  const [formData, setFormData] = useState({
    soil_type: '',
    pH: '',
    N: '',
    P: '',
    K: '',
    moisture: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      soil_type: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const data = {
        soil_type: formData.soil_type,
        pH: parseFloat(formData.pH),
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        moisture: parseFloat(formData.moisture)
      };
      
      const qualityResult = mockCalculateSoilQuality(data);
      setResult(qualityResult);
      setLoading(false);
    }, 800);
  };

  const getQualityColor = (label) => {
    switch(label) {
      case 'Excellent': return 'text-green-700 bg-green-100';
      case 'Good': return 'text-emerald-700 bg-emerald-100';
      case 'Moderate': return 'text-yellow-700 bg-yellow-100';
      case 'Poor': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-emerald-500 to-teal-600';
    if (score >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-orange-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Soil Quality Score Assessment</h1>
          <p className="text-gray-600 mt-2">Evaluate overall soil health and quality</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Soil Parameters</CardTitle>
              <CardDescription>Enter all soil measurements for quality assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="soil_type">Soil Type</Label>
                  <Select onValueChange={handleSelectChange} required>
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
                  <Label htmlFor="pH">pH Level (0-14)</Label>
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
                    className="border-green-200"
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
                      Calculating...
                    </>
                  ) : (
                    'Calculate Quality Score'
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
                  <CardTitle>Soil Quality Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score Display */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-green-200 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getScoreColor(result.score)} flex items-center justify-center shadow-lg`}>
                        <div className="text-center">
                          <p className="text-4xl font-bold text-white">{result.score}</p>
                          <p className="text-sm text-white opacity-90">/ 100</p>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${getQualityColor(result.label)}`}>
                      {result.label}
                    </span>
                  </div>

                  {/* Breakdown */}
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
                        Quality Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Nitrogen</span>
                          <span className="font-medium text-gray-900">{result.breakdown.nitrogen}%</span>
                        </div>
                        <Progress value={result.breakdown.nitrogen} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Phosphorus</span>
                          <span className="font-medium text-gray-900">{result.breakdown.phosphorus}%</span>
                        </div>
                        <Progress value={result.breakdown.phosphorus} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Potassium</span>
                          <span className="font-medium text-gray-900">{result.breakdown.potassium}%</span>
                        </div>
                        <Progress value={result.breakdown.potassium} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">pH Level</span>
                          <span className="font-medium text-gray-900">{result.breakdown.pH}%</span>
                        </div>
                        <Progress value={result.breakdown.pH} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Moisture</span>
                          <span className="font-medium text-gray-900">{result.breakdown.moisture}%</span>
                        </div>
                        <Progress value={result.breakdown.moisture} />
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilQualityScore;