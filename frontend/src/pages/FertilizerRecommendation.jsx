import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Loader2, Package, Calculator } from 'lucide-react';
import { mockRecommendFertilizer, crops } from '../mock';

const FertilizerAdvisorCombined = () => {

  /* ------------------------------ Advisor States ------------------------------ */
  const [formData, setFormData] = useState({ crop: '', N: '', P: '', K: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  /* ------------------------------ Manual Cost States -------------------------- */
  const [items, setItems] = useState([{ fertilizer: "", qty: "", price: "" }]);
  const [manualTotal, setManualTotal] = useState(0);

  /* ---------------------------- Functions ---------------------------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, crop: value });
  };

  const handleManualChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { fertilizer: "", qty: "", price: "" }]);
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

    const total = recommendations.fertilizers.reduce(
      (sum, fert) => sum + fert.quantity * fert.price_per_kg, 0
    );
    setTotalCost(total);
    setLoading(false);
  };

  const calculateManualCost = () => {
    let total = 0;
    items.forEach(item => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      total += qty * price;
    });
    setManualTotal(total);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-4">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">Fertilizer Advisor & Cost Calculator</h1>
          <p className="text-gray-600 mt-2">Get recommendations + Calculate total cost</p>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Advisor Form */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Enter Crop & Soil Data</CardTitle>
            <CardDescription>Fill the crop and current NPK readings</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <Label>Select Crop</Label>
                <Select value={formData.crop} onValueChange={handleSelectChange} required>
                  <SelectTrigger className="border-green-200">
                    <SelectValue placeholder="Choose crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((c) => (
                      <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* NPK Inputs */}
              <div className="space-y-2">
                <Label>Nitrogen (N) - kg/ha</Label>
                <Input
                  name="N"
                  type="number"
                  value={formData.N}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Phosphorus (P) - kg/ha</Label>
                <Input
                  name="P"
                  type="number"
                  value={formData.P}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Potassium (K) - kg/ha</Label>
                <Input
                  name="K"
                  type="number"
                  value={formData.K}
                  onChange={handleChange}
                  className="border-green-200"
                  required
                />
              </div>

              <Button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Calculating...</> : "Get Recommendations"}
              </Button>

            </form>
          </CardContent>
        </Card>


        {/* Advisor Results */}
        {result && (
          <>
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle>Recommended Fertilizers</CardTitle>
                <CardDescription>Optimal mix for {formData.crop}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {result.fertilizers.map((fert, idx) => (
                  <div key={idx} className="p-4 bg-white border border-green-200 rounded-lg">

                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-emerald-600 p-2 rounded-md">
                        <Package className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{fert.name}</p>
                        <p className="text-gray-700 text-sm">NPK: {fert.npk}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-50 rounded p-2 text-center">
                        <p className="text-gray-700 text-sm">Quantity</p>
                        <p className="text-emerald-700 font-bold text-xl">{fert.quantity} kg</p>
                      </div>

                      <div className="bg-emerald-50 rounded p-2 text-center">
                        <p className="text-gray-700 text-sm">Cost</p>
                        <p className="text-emerald-700 font-bold text-xl">₹{(fert.quantity * fert.price_per_kg).toFixed(2)}</p>
                      </div>
                    </div>

                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-green-200">
              <CardContent className="py-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Advisor Estimated Total</p>
                  <p className="text-4xl font-bold text-emerald-700">₹{totalCost.toFixed(2)}</p>
                </div>
                <Calculator className="h-12 w-12 text-emerald-600 opacity-70" />
              </CardContent>
            </Card>
          </>
        )}



        {/* Manual Cost Calculator Section */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Manual Fertilizer Cost Calculator</CardTitle>
            <CardDescription>Add fertilizers and enter market rates</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">

            {items.map((item, idx) => (
              <div key={idx} className="p-4 bg-white border border-green-200 rounded-lg space-y-3">
                
                <p className="text-gray-600 font-semibold">Item #{idx + 1}</p>
                
                <Label>Fertilizer Type</Label>
                <Select
                  onValueChange={(value) => handleManualChange(idx, 'fertilizer', value)}
                >
                  <SelectTrigger className="border-green-200">
                    <SelectValue placeholder="Select fertilizer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urea">Urea (46-0-0)</SelectItem>
                    <SelectItem value="DAP">DAP (18-46-0)</SelectItem>
                    <SelectItem value="MOP">MOP (0-0-60)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Quantity (kg)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-green-200"
                      value={item.qty}
                      onChange={(e) => handleManualChange(idx, 'qty', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Price (₹/kg)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-green-200"
                      value={item.price}
                      onChange={(e) => handleManualChange(idx, 'price', e.target.value)}
                    />
                  </div>
                </div>

              </div>
            ))}

            <Button
              onClick={handleAddItem}
              className="w-full border border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50"
            >
              + Add Another Fertilizer
            </Button>


            <Button
              onClick={calculateManualCost}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
            >
              Calculate Total Cost
            </Button>

            <div className="text-center text-lg font-bold text-emerald-700">
              ₹{manualTotal.toFixed(2)}
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default FertilizerAdvisorCombined;
