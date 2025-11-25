import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { TestTube, Sprout, Leaf, BarChart3, Calendar, Calculator, Lightbulb } from 'lucide-react';

const Home = () => {
  const modules = [
    {
      icon: TestTube,
      title: 'Soil Classification',
      description: 'Image Analysis & Parameter Analysis',
      link: '/soil-classification',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Sprout,
      title: 'Crop Recommendation',
      description: 'Get top 3 suitable crops for your soil',
      link: '/crop-recommendation',
      color: 'from-lime-500 to-lime-600'
    },
    {
      icon: Leaf,
      title: 'Fertilizer Advisor',
      description: 'Recommend best fertilizer type and amount',
      link: '/fertilizer',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: BarChart3,
      title: 'Soil Quality Score',
      description: 'Assess overall soil health and quality',
      link: '/soil-quality',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Calendar,
      title: 'Crop Calendar',
      description: 'Month-wise farming schedule',
      link: '/crop-calendar',
      color: 'from-green-600 to-lime-600'
    },
    {
      icon: Lightbulb,
      title: 'Improvement Tips',
      description: 'Get soil improvement suggestions',
      link: '/improvement-tips',
      color: 'from-teal-600 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                FertiCrop AI
              </h1>
              <p className="text-sm text-gray-600 mt-1">Smart System for Soil, Crop & Fertilizer Prediction</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Agricultural Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leverage Machine Learning and Deep Learning to make data-driven farming decisions.
            Analyze soil, predict crops, and optimize fertilizer usage.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Link to={module.link} key={index}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-green-100 group cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{module.title}</CardTitle>
                    <CardDescription className="text-gray-600">{module.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-green-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            FertiCrop AI - Final Year Engineering Project © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
