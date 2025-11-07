import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';
import { mockGetSoilImprovementTips, soilTypes } from '../mock';

const ImprovementTips = () => {
  const [formData, setFormData] = useState({
    soil_type: '',
    pH: '',
    N: '',
    P: '',
    K: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [tips, setTips] = useState([]);

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
    
    const data = {
      soil_type: formData.soil_type,
      pH: parseFloat(formData.pH),
      N: parseFloat(formData.N),
      P: parseFloat(formData.P),
      K: parseFloat(formData.K)
    };
    
    const suggestions = mockGetSoilImprovementTips(data);
    setTips(suggestions);
    setSubmitted(true);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': return AlertCircle;
      case 'Low': return CheckCircle2;
      default: return Lightbulb;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Soil Improvement Suggestions</h1>
          <p className="text-gray-600 mt-2">Get personalized tips to improve your soil health</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Soil Information</CardTitle>
              <CardDescription>Enter your current soil parameters</CardDescription>
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
                    placeholder="e.g., 5.8"
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
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Get Improvement Tips
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {submitted && tips.length > 0 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-emerald-600" />
                    Improvement Recommendations
                  </CardTitle>
                  <CardDescription>{tips.length} suggestion(s) found</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tips.map((tip, index) => {
                    const PriorityIcon = getPriorityIcon(tip.priority);
                    return (
                      <Card key={index} className="border-green-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              <PriorityIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-900">{tip.issue}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(tip.priority)}`}>
                                  {tip.priority}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{tip.suggestion}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <p className="text-sm text-blue-900">
                    <strong>Important:</strong> These recommendations are based on general soil science principles. 
                    For specific treatments and quantities, consult with local agricultural extension services or soil experts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
                <CardHeader>
                  <CardTitle className="text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <p>1. Test your soil regularly (every 2-3 years)</p>
                  <p>2. Apply recommended amendments gradually</p>
                  <p>3. Monitor changes and adjust practices accordingly</p>
                  <p>4. Maintain organic matter through crop rotation and composting</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImprovementTips;