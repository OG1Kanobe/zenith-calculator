'use client';

import { useState } from 'react';
import TaskSelector from '@/components/Calculator/TaskSelector';
import LiveCounter from '@/components/Calculator/LiveCounter';
import IndustrySelector from '@/components/Calculator/IndustrySelector';
import CalculateButton from '@/components/Calculator/CalculateButton';
import { TaskSelection, Industry } from '@/types/calculator.types';
import { calculateManualCost, calculateTotalHours } from '@/lib/calculatorLogic';

export default function Home() {
  const [selectedTasks, setSelectedTasks] = useState<TaskSelection[]>([]);
  const [industry, setIndustry] = useState<Industry>('Other');
  const [showResults, setShowResults] = useState(false);

  const totalManualCost = calculateManualCost(selectedTasks, industry);
  const totalHours = calculateTotalHours(selectedTasks);

  const handleCalculate = () => {
    if (selectedTasks.length === 0) {
      alert('Please select at least one task');
      return;
    }
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#010112] text-[#f5f5f5] flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="font-mono text-[#5ccfa2] text-4xl mb-4">Results Coming Soon</h1>
          <p className="font-inter-tight mb-8">Session 2: We'll build the results page</p>
          <button
            onClick={() => setShowResults(false)}
            className="px-6 py-3 bg-[#5ccfa2] text-[#010112] font-mono rounded-lg hover:bg-[#6ee0b3] transition-colors"
          >
            Back to Calculator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010112] text-[#f5f5f5]">
      {/* Header */}
      <header className="border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-mono text-[#5ccfa2] text-2xl">Zenith AI</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Input Form (60%) */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[#5ccfa2] text-3xl mb-2">
              Calculate Your
            </h2>
            <h2 className="font-mono text-[#5ccfa2] text-3xl mb-6">
                Automation Savings
              </h2>

              <IndustrySelector
                selected={industry}
                onChange={setIndustry}
              />

              <p className="font-inter-tight text-[#f5f5f5] mb-8 mt-8">
                Select the tasks you currently do manually:
              </p>

            <TaskSelector
              selectedTasks={selectedTasks}
              onChange={setSelectedTasks}
            />

            {/* Mobile Calculate Button */}
            <div className="lg:hidden mt-8">
              <CalculateButton 
                onClick={handleCalculate}
                disabled={selectedTasks.length === 0}
              />
            </div>
          </div>

          {/* Right Side - Live Counter (40%) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8">
              <LiveCounter
                totalCost={totalManualCost}
                totalHours={totalHours}
                taskCount={selectedTasks.length}
              />
              
              {/* Desktop Calculate Button */}
              <div className="hidden lg:block mt-6">
                <CalculateButton 
                  onClick={handleCalculate}
                  disabled={selectedTasks.length === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
