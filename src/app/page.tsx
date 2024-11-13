'use client'; 
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const EnergyCalculator = () => {
  const [formData, setFormData] = useState({
    windowType: '',
    filmPerformance: '',
  });

  const calculationData = {
    'single-clear': {
      medium: {
        savingsPercent: '3.62',
        returnOnInvestment: '2.77',
        annualSavings: '6,206',
        carbonReduction: '21,240'
      },
      'medium-high': {
        savingsPercent: '4.96',
        returnOnInvestment: '2.18',
        annualSavings: '8,535',
        carbonReduction: '29,209'
      },
      high: {
        savingsPercent: '6.29',
        returnOnInvestment: '1.58',
        annualSavings: '10,863',
        carbonReduction: '37,179'
      }
    },
    'dual-clear': {
      medium: {
        savingsPercent: '1.96',
        returnOnInvestment: '5.48',
        annualSavings: '3,138',
        carbonReduction: '10,740'
      },
      'medium-high': {
        savingsPercent: '2.96',
        returnOnInvestment: '4.04',
        annualSavings: '4,867',
        carbonReduction: '16,655'
      },
      high: {
        savingsPercent: '3.96',
        returnOnInvestment: '2.61',
        annualSavings: '6,595',
        carbonReduction: '22,569'
      }
    }
  };

  const getResults = () => {
    if (formData.windowType && formData.filmPerformance) {
      return calculationData[formData.windowType][formData.filmPerformance];
    }
    return null;
  };

  const results = getResults();

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl font-normal text-gray-800 mb-4">
          Energy Savings Calculator
        </CardTitle>
        <p className="text-gray-600 text-sm px-8">
          Based on LLumar's energy simulation program for the Greater Vancouver Area, this calculator helps estimate your potential energy savings with window films.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Building Assumptions */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Building2 className="w-6 h-6 text-teal-600 mt-1" />
            <div>
              <h2 className="text-xl font-normal text-gray-800 mb-2">Building Assumptions</h2>
              <p className="text-sm text-gray-600">Calculations are based on:</p>
              <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                <li>Commercial Buildings</li>
                <li>55,000 sq ft (5,000 sq m floor space)</li>
                <li>20% window to wall ratio on all exposures</li>
                <li>Examples: offices, schools, retail spaces, senior facilities, residences</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Window Type Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-normal text-gray-800 mb-4">1. Select Window Type</h2>
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
            {/* Single Clear Window */}
            <div className="text-center">
              <svg className="h-32 w-24 mx-auto mb-2" viewBox="0 0 100 140">
                <rect 
                  x="10" 
                  y="10" 
                  width="80" 
                  height="120" 
                  fill={formData.windowType === 'single-clear' ? '#FFA500' : '#FFFFFF'}
                  stroke="#666" 
                  strokeWidth="2"
                />
              </svg>
              <div className="flex items-center justify-center">
                <input
                  type="radio"
                  id="single-clear"
                  name="windowType"
                  value="single-clear"
                  checked={formData.windowType === 'single-clear'}
                  onChange={(e) => setFormData({...formData, windowType: e.target.value})}
                  className="mr-2"
                />
                <label htmlFor="single-clear" className="text-sm">
                  Single Clear
                </label>
              </div>
            </div>

            {/* Dual Clear Window */}
            <div className="text-center">
              <svg className="h-32 w-24 mx-auto mb-2" viewBox="0 0 100 140">
                <rect 
                  x="10" 
                  y="10" 
                  width="80" 
                  height="120" 
                  fill={formData.windowType === 'dual-clear' ? '#FFA500' : '#FFFFFF'}
                  stroke="#666" 
                  strokeWidth="2"
                />
                <rect 
                  x="20" 
                  y="20" 
                  width="80" 
                  height="120" 
                  fill={formData.windowType === 'dual-clear' ? '#FFB84D' : '#FFFFFF'}
                  stroke="#666" 
                  strokeWidth="2"
                />
              </svg>
              <div className="flex items-center justify-center">
                <input
                  type="radio"
                  id="dual-clear"
                  name="windowType"
                  value="dual-clear"
                  checked={formData.windowType === 'dual-clear'}
                  onChange={(e) => setFormData({...formData, windowType: e.target.value})}
                  className="mr-2"
                />
                <label htmlFor="dual-clear" className="text-sm">
                  Dual Clear
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Film Performance Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-normal text-gray-800">2. Select Window Film Performance</h2>
            <p className="text-sm text-gray-600 mt-2">
              Solar Heat Gain Coefficient: The lower the film's SHGC, the less solar heat is transmitted.
            </p>
          </div>
          
          <div className="relative pt-6">
            <div className="flex justify-between mb-2">
              <span>Slide to Start</span>
              <span>Neutral</span>
              <span>Dual-Reflective</span>
              <span>Reflective</span>
            </div>
            <input
              type="range"
              min="-1"
              max="2"
              step="1"
              value={formData.filmPerformance === '' ? -1 : 
                     formData.filmPerformance === 'medium' ? 0 : 
                     formData.filmPerformance === 'medium-high' ? 1 : 2}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value === -1) {
                  setFormData({...formData, filmPerformance: ''});
                } else {
                  const values = ['medium', 'medium-high', 'high'];
                  setFormData({...formData, filmPerformance: values[value]});
                }
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* Results Section */}
        {formData.windowType && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-normal text-gray-800 mb-8">3. Your Energy Savings</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {results ? results.savingsPercent : '-'}%
                </div>
                <div className="text-sm text-gray-600">Savings on Annual Energy Costs</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {results ? results.returnOnInvestment : '-'} yrs
                </div>
                <div className="text-sm text-gray-600">Return On Investment</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  CAD ${results ? results.annualSavings : '-'}
                </div>
                <div className="text-sm text-gray-600">Annual Savings</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {results ? results.carbonReduction : '-'} kg
                </div>
                <div className="text-sm text-gray-600">Annual Carbon Reduction</div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              *Actual savings may vary based on specific building conditions, local energy costs, and other factors.
              These calculations are estimates based on typical Greater Vancouver Area commercial buildings.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnergyCalculator;
