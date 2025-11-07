import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Loader2, Leaf, Package } from 'lucide-react';
import { mockRecommendFertilizer, crops } from '../mock';

const FertilizerRecommendation = () => {
  const [formData, setFormData] = useState({
    crop: '',
    N: '',
    P: '',
    K: ''
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
      crop: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const npkValues = {
      N: parseFloat(formData.N),
      P: parseFloat(formData.P),
      K: parseFloat(formData.K)
    };
    
    const recommendations = await mockRecommendFertilizer(formData.crop, npkValues);
    setResult(recommendations);
    setLoading(false);
  };

  const getTotalCost = () => {
    if (!result) return 0;
    return result.fertilizers.reduce((sum, fert) => sum + (fert.quantity * fert.price_per_kg), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Fertilizer Recommendation System</h1>
          <p className="text-gray-600 mt-2">Get optimal fertilizer type and quantity recommendations</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Crop & Soil Data</CardTitle>
              <CardDescription>Enter crop name and current NPK levels</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop">Select Crop</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Choose crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop.name} value={crop.name}>{crop.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="N">Current Nitrogen (N) - kg/ha</Label>
                  <Input
                    id="N"
                    name="N"
                    type="number"
                    step="0.1"
                    value={formData.N}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 40"
                    className="border-green-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="P">Current Phosphorus (P) - kg/ha</Label>
                  <Input
                    id="P"
                    name="P"
                    type="number"
                    step="0.1"
                    value={formData.P}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 25"
                    className="border-green-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="K">Current Potassium (K) - kg/ha</Label>
                  <Input
                    id="K"
                    name="K"
                    type="number"
                    step="0.1"
                    value={formData.K}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 35"
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
                    'Get Fertilizer Recommendations'
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
                  <CardTitle>Recommended Fertilizers</CardTitle>
                  <CardDescription>Optimal fertilizer mix for {formData.crop}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.fertilizers.map((fert, index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-green-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{fert.name}</h3>
                            <p className="text-sm text-gray-600">NPK: {fert.npk}</p>
                          </div>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                          {fert.reason}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="bg-white p-2 rounded">
                          <p className="text-xs text-gray-600">Quantity</p>
                          <p className="text-lg font-bold text-emerald-700">{fert.quantity} kg</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <p className="text-xs text-gray-600">Total Cost</p>
                          <p className="text-lg font-bold text-emerald-700">₹{(fert.quantity * fert.price_per_kg).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mt-2 italic">{fert.use}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Fertilizer Cost</p>
                      <p className="text-3xl font-bold text-emerald-700">₹{getTotalCost().toFixed(2)}</p>
                    </div>
                    <Leaf className="h-12 w-12 text-emerald-600 opacity-50" />
                  </div>
                  <p className="text-xs text-gray-600 mt-3">Estimated cost for per hectare application</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;