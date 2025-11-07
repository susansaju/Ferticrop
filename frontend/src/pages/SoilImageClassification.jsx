import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Upload, Loader2, CheckCircle } from 'lucide-react';
import { mockPredictSoilType, soilTypes } from '../mock';

const SoilImageClassification = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    const prediction = await mockPredictSoilType(selectedFile);
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
          <h1 className="text-3xl font-bold text-gray-900">Soil Type Classification (CNN)</h1>
          <p className="text-gray-600 mt-2">Upload soil image for MobileNetV2-based classification</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle>Upload Soil Image</CardTitle>
            <CardDescription>Supported formats: JPG, PNG (Max 5MB)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
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
                    <p className="text-sm text-gray-600">or drag and drop</p>
                  </div>
                )}
              </label>
            </div>

            {/* Submit Button */}
            {selectedFile && !result && (
              <Button 
                onClick={handleSubmit} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Image...
                  </>
                ) : (
                  'Classify Soil Type'
                )}
              </Button>
            )}

            {/* Results */}
            {result && (
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
                    <p className="text-3xl font-bold text-emerald-700 capitalize">{getSoilInfo(result.soil_type)?.name}</p>
                    <p className="text-sm text-gray-600 mt-2">{getSoilInfo(result.soil_type)?.description}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-700 mb-1">Confidence Score</p>
                    <div className="flex items-center space-x-3">
                      <Progress value={result.confidence * 100} className="flex-1" />
                      <span className="text-lg font-bold text-emerald-700">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Probability Distribution */}
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="text-lg">Probability Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(result.probabilities).map(([type, prob]) => (
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
                    setResult(null);
                  }}
                  variant="outline"
                  className="w-full border-green-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Classify Another Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SoilImageClassification;