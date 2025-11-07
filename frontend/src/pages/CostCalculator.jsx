import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Calculator, PieChart, Plus, Trash2 } from 'lucide-react';
import { fertilizers } from '../mock';

const CostCalculator = () => {
  const [items, setItems] = useState([{ fertilizer: '', quantity: '', customPrice: '' }]);
  const [totalCost, setTotalCost] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const addItem = () => {
    setItems([...items, { fertilizer: '', quantity: '', customPrice: '' }]);
    setCalculated(false);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setCalculated(false);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    setCalculated(false);
  };

  const calculateCost = () => {
    let total = 0;
    items.forEach(item => {
      if (item.fertilizer && item.quantity) {
        const fert = fertilizers.find(f => f.name === item.fertilizer);
        const price = item.customPrice ? parseFloat(item.customPrice) : fert.price_per_kg;
        const quantity = parseFloat(item.quantity);
        total += price * quantity;
      }
    });
    setTotalCost(total);
    setCalculated(true);
  };

  const getItemCost = (item) => {
    if (!item.fertilizer || !item.quantity) return 0;
    const fert = fertilizers.find(f => f.name === item.fertilizer);
    const price = item.customPrice ? parseFloat(item.customPrice) : fert.price_per_kg;
    const quantity = parseFloat(item.quantity);
    return price * quantity;
  };

  const getCostBreakdown = () => {
    return items.map((item, index) => {
      if (!item.fertilizer || !item.quantity) return null;
      return {
        name: item.fertilizer,
        cost: getItemCost(item),
        percentage: totalCost > 0 ? ((getItemCost(item) / totalCost) * 100).toFixed(1) : 0
      };
    }).filter(item => item !== null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Fertilizer Cost Calculator</h1>
          <p className="text-gray-600 mt-2">Calculate total fertilizer cost with market rates</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Add Fertilizers</CardTitle>
                <CardDescription>Select fertilizers and enter quantities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border border-green-200 p-4 rounded-lg space-y-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Item #{index + 1}</span>
                      {items.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Fertilizer Type</Label>
                      <Select 
                        value={item.fertilizer}
                        onValueChange={(value) => updateItem(index, 'fertilizer', value)}
                      >
                        <SelectTrigger className="border-green-200">
                          <SelectValue placeholder="Select fertilizer" />
                        </SelectTrigger>
                        <SelectContent>
                          {fertilizers.map((fert) => (
                            <SelectItem key={fert.name} value={fert.name}>
                              {fert.name} ({fert.npk})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Quantity (kg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          placeholder="25"
                          className="border-green-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price (₹/kg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={item.customPrice}
                          onChange={(e) => updateItem(index, 'customPrice', e.target.value)}
                          placeholder={item.fertilizer ? `${fertilizers.find(f => f.name === item.fertilizer)?.price_per_kg}` : 'Auto'}
                          className="border-green-200"
                        />
                      </div>
                    </div>

                    {item.fertilizer && item.quantity && (
                      <div className="bg-emerald-50 p-2 rounded text-center">
                        <span className="text-sm text-gray-600">Item Cost: </span>
                        <span className="text-lg font-bold text-emerald-700">₹{getItemCost(item).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                ))}

                <Button 
                  onClick={addItem}
                  variant="outline"
                  className="w-full border-green-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Fertilizer
                </Button>

                <Button 
                  onClick={calculateCost}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Total Cost
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {calculated && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-emerald-600" />
                    Cost Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-green-200 text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Fertilizer Cost</p>
                    <p className="text-5xl font-bold text-emerald-700">₹{totalCost.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mt-2">for {items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0).toFixed(1)} kg total</p>
                  </div>

                  {/* Cost Breakdown */}
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <PieChart className="h-5 w-5 mr-2 text-emerald-600" />
                        Cost Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {getCostBreakdown().map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.percentage}% of total</p>
                          </div>
                          <p className="text-xl font-bold text-emerald-700">₹{item.cost.toFixed(2)}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-blue-900">
                        <strong>Note:</strong> Prices shown are estimated market rates. 
                        Actual prices may vary based on location, brand, and seasonal factors.
                      </p>
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

export default CostCalculator;