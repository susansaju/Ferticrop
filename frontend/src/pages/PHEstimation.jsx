import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Upload, Loader2, Droplets } from 'lucide-react';
import { mockEstimatePH } from '../mock';
import { Progress } from '../components/ui/progress';

const PHEstimation = () => {
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
    const estimation = await mockEstimatePH(selectedFile);
    setResult(estimation);
    setLoading(false);
  };

  const getPHCategory = (pH) => {
    if (pH < 5.5) return { label: 'Strongly Acidic', color: 'text-red-700 bg-red-100' };
    if (pH < 6.5) return { label: 'Slightly Acidic', color: 'text-orange-700 bg-orange-100' };
    if (pH < 7.5) return { label: 'Neutral', color: 'text-green-700 bg-green-100' };
    if (pH < 8.5) return { label: 'Slightly Alkaline', color: 'text-blue-700 bg-blue-100' };
    return { label: 'Strongly Alkaline', color: 'text-indigo-700 bg-indigo-100' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">pH Level Estimation (CNN)</h1>
          <p className="text-gray-600 mt-2">Estimate soil pH from image using deep learning</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle>Upload Soil Image</CardTitle>
            <CardDescription>CNN-based regression model will estimate pH level (0-14)</CardDescription>
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
                    Estimating pH...
                  </>
                ) : (
                  'Estimate pH Level'
                )}
              </Button>
            )}

            {/* Results */}
            {result && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <Droplets className="h-8 w-8 text-white mx-auto mb-1" />
                        <p className="text-4xl font-bold text-white">{result.pH}</p>
                        <p className="text-sm text-white opacity-90">pH</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${getPHCategory(result.pH).color}`}>
                      {getPHCategory(result.pH).label}
                    </span>
                  </div>

                  {/* pH Scale */}
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">pH Scale Reference</p>
                    <div className="h-8 rounded-full overflow-hidden flex">
                      <div className="flex-1 bg-red-500"></div>
                      <div className="flex-1 bg-orange-500"></div>
                      <div className="flex-1 bg-yellow-400"></div>
                      <div className="flex-1 bg-green-500"></div>
                      <div className="flex-1 bg-green-600"></div>
                      <div className="flex-1 bg-cyan-500"></div>
                      <div className="flex-1 bg-blue-500"></div>
                      <div className="flex-1 bg-indigo-500"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0 (Acidic)</span>
                      <span>7 (Neutral)</span>
                      <span>14 (Alkaline)</span>
                    </div>
                    <div className="mt-3 text-center">
                      <div 
                        className="inline-block w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-emerald-600"
                        style={{ marginLeft: `${(result.pH / 14) * 100 - 50}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-blue-900 mb-1">Model Information</p>
                    <p className="text-lg font-semibold text-blue-700">CNN Regression Model</p>
                    <p className="text-sm text-blue-600 mt-1">Analyzes soil color and texture features to estimate pH</p>
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
                  Estimate Another Sample
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PHEstimation;