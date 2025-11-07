import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { ArrowLeft, Calendar, Sprout, Droplets, Leaf, TrendingUp } from 'lucide-react';
import { crops, cropCalendars, indianStates } from '../mock';

const CropCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [calendarData, setCalendarData] = useState(null);

  const handleCropChange = (value) => {
    setSelectedCrop(value);
    if (cropCalendars[value]) {
      setCalendarData(cropCalendars[value]);
    } else {
      // Fallback to Rice calendar
      setCalendarData(cropCalendars['Rice']);
    }
  };

  const getStageIcon = (stage) => {
    switch(stage.toLowerCase()) {
      case 'sowing': return Sprout;
      case 'growth': return TrendingUp;
      case 'flowering': return Leaf;
      case 'harvest': return Calendar;
      default: return Droplets;
    }
  };

  const getStageColor = (index) => {
    const colors = [
      'from-emerald-500 to-green-600',
      'from-green-500 to-lime-600',
      'from-lime-500 to-yellow-600',
      'from-yellow-500 to-orange-600',
      'from-orange-500 to-amber-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Crop Calendar</h1>
          <p className="text-gray-600 mt-2">Month-wise farming schedule for your selected crop</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-green-100 mb-6">
          <CardHeader>
            <CardTitle>Select Crop & Region</CardTitle>
            <CardDescription>Choose your crop and location to view farming calendar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop</Label>
                <Select onValueChange={handleCropChange}>
                  <SelectTrigger className="border-green-200">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(cropCalendars).map((cropName) => (
                      <SelectItem key={cropName} value={cropName}>{cropName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region / State</Label>
                <Select onValueChange={setSelectedRegion}>
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
            </div>
          </CardContent>
        </Card>

        {calendarData && selectedCrop && (
          <div className="animate-in fade-in duration-500">
            <Card className="border-green-100 mb-6">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-emerald-600" />
                  {selectedCrop} Farming Calendar
                </CardTitle>
                {selectedRegion && (
                  <CardDescription className="text-base">Region: {selectedRegion}</CardDescription>
                )}
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {calendarData.map((stage, index) => {
                const StageIcon = getStageIcon(stage.stage);
                return (
                  <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${getStageColor(index)} flex-shrink-0`}>
                          <StageIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{stage.stage}</h3>
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                              {stage.month}
                            </span>
                          </div>
                          <p className="text-gray-700">{stage.task}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="border-blue-200 bg-blue-50 mt-6">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> The farming calendar may vary based on local climate conditions, 
                  soil type, and specific varieties. Always consult with local agricultural experts for best practices.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {!calendarData && (
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="py-12 text-center">
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Please select a crop to view the farming calendar</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CropCalendar;