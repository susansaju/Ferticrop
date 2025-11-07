import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Upload, Loader2, CheckCircle, Image, FlaskConical } from 'lucide-react';
import { mockPredictSoilType, mockClassifySoil, soilTypes } from '../mock';

const SoilClassification = () => {
  // Image Analysis State
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageResult, setImageResult] = useState(null);

  // Parameter Analysis State
  const [formData, setFormData] = useState({
    pH: '',
    N: '',
    P: '',
    K: '',
    organicCarbon: '',
    moisture: '',
    EC: ''
  });
  const [paramLoading, setParamLoading] = useState(false);
  const [paramResult, setParamResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageResult(null);
    }
  };

  const handleImageSubmit = async () => {
    if (!selectedFile) return;
    
    setImageLoading(true);
    const prediction = await mockPredictSoilType(selectedFile);
    setImageResult(prediction);
    setImageLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleParamSubmit = async (e) => {
    e.preventDefault();
    setParamLoading(true);
    
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
    setParamResult(prediction);
    setParamLoading(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Soil Classification</h1>
          <p className="text-gray-600 mt-2">Image Analysis (CNN) & Parameter Analysis (Random Forest)</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="image" className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>Image Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="parameter" className="flex items-center space-x-2">
              <FlaskConical className="h-4 w-4" />
              <span>Parameter Analysis</span>
            </TabsTrigger>
          </TabsList>

          {/* Image Analysis Tab */}
          <TabsContent value="image">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Upload Soil Image</CardTitle>
                  <CardDescription>CNN-based classification using MobileNetV2</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {preview ? (
                        <div className="space-y-4">
                          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
                          <p className="text-sm text-gray-600">Click to change image</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-16 w-16 mx-auto text-green-500" />
                          <p className="text-lg font-medium text-gray-900">Click to upload soil image</p>
                          <p className="text-sm text-gray-600">JPG, PNG (Max 5MB)</p>
                        </div>
                      )}
                    </label>
                  </div>

                  {selectedFile && !imageResult && (
                    <Button 
                      onClick={handleImageSubmit} 
                      disabled={imageLoading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    >
                      {imageLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing Image...
                        </>
                      ) : (
                        'Classify Soil Type'
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {imageResult && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Classification Complete</h3>
                        <p className="text-sm text-gray-600">CNN Model: MobileNetV2</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                      <p className="text-sm text-gray-600 mb-1">Predicted Soil Type</p>
                      <p className="text-3xl font-bold text-emerald-700 capitalize">{getSoilInfo(imageResult.soil_type)?.name}</p>
                      <p className="text-sm text-gray-600 mt-2">{getSoilInfo(imageResult.soil_type)?.description}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-700 mb-1">Confidence Score</p>
                      <div className="flex items-center space-x-3">
                        <Progress value={imageResult.confidence * 100} className="flex-1" />
                        <span className="text-lg font-bold text-emerald-700">{(imageResult.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Probability Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(imageResult.probabilities).map(([type, prob]) => (
                        <div key={type} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-gray-700">{soilTypes.find(s => s.id === type)?.name}</span>
                            <span className="font-medium text-gray-900">{(prob * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={prob * 100} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Button 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                      setImageResult(null);
                    }}
                    variant="outline"
                    className="w-full border-green-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    Classify Another Image
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Parameter Analysis Tab */}
          <TabsContent value="parameter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Soil Parameters</CardTitle>
                  <CardDescription>Random Forest classification using measured values</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleParamSubmit} className="space-y-4">
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
                      disabled={paramLoading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    >
                      {paramLoading ? (
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

              {paramResult && (
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
                        {getSoilInfo(paramResult.soil_type)?.name}
                      </p>
                      <p className="text-gray-700 mb-4">{getSoilInfo(paramResult.soil_type)?.description}</p>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Model Confidence</p>
                        <p className="text-2xl font-bold text-emerald-700">{(paramResult.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-2">Algorithm Used</p>
                      <p className="text-lg font-semibold text-blue-700">Random Forest Classifier</p>
                      <p className="text-sm text-blue-600 mt-1">Based on NPK, pH, moisture, and EC values</p>
                    </div>

                    <Button 
                      onClick={() => setParamResult(null)}
                      variant="outline"
                      className="w-full border-green-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      Classify Another Sample
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SoilClassification;