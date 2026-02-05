'use client';

import { useState } from 'react';
import TaskSelector from '@/components/Calculator/TaskSelector';
import LiveCounter from '@/components/Calculator/LiveCounter';
import IndustrySelector from '@/components/Calculator/IndustrySelector';
import CalculateButton from '@/components/Calculator/CalculateButton';
import ResultsSummary from '@/components/Results/ResultsSummary';
import ComparisonChart from '@/components/Results/ComparisonChart';
import BreakevenTimeline from '@/components/Results/BreakevenTimeline';
import TaskBreakdown from '@/components/Results/TaskBreakdown';
import CTAButtons from '@/components/Results/CTAButtons';
import OptimizationOpportunity from '@/components/Results/OptimizationOpportunity';
import { TaskSelection, Industry, CalculationMethod } from '@/types/calculator.types';
import { calculateManualCost, calculateTotalHours, calculateTotalResults } from '@/lib/calculatorLogic';
import MobileCalculatorFooter from '@/components/Calculator/MobileCalculatorFooter';
import PDFResultsView from '@/components/Results/PDFResultsView';
import CalculationMethodSelector from '@/components/Calculator/CalculationMethodSelector';

export default function Home() {
  const [selectedTasks, setSelectedTasks] = useState<TaskSelection[]>([]);
  const [industry, setIndustry] = useState<Industry>('Other');
  const [calculationMethod, setCalculationMethod] = useState<CalculationMethod>('salary'); // NEW
  const [showResults, setShowResults] = useState(false);

  const totalManualCost = calculateManualCost(selectedTasks, industry, calculationMethod);
  const totalHours = calculateTotalHours(selectedTasks);

  const handleCalculate = () => {
    if (selectedTasks.length === 0) {
      alert('Please select at least one task');
      return;
    }
    setShowResults(true);
  };

  const handleSendReport = () => {
    // TODO: Implement email functionality in future
    alert('Email functionality coming soon! For now, take a screenshot of your results.');
  };

  const handleCustomAudit = () => {
    // TODO: Implement custom audit form in future
    alert('Custom audit form coming soon! For now, contact us directly with your results.');
  };

  if (showResults) {
    const results = calculateTotalResults(selectedTasks, industry, calculationMethod);
    
    if (!results) {
      return (
        <div className="min-h-screen bg-[#010112] text-[#f5f5f5] flex items-center justify-center p-8">
          <div className="text-center">
            <p className="font-inter-tight text-[#ff6b6b] mb-4">Error calculating results</p>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="font-mono text-[#5ccfa2] text-2xl">Zenith AI</h1>
            <button
              onClick={() => setShowResults(false)}
              className="px-4 py-2 text-[#5ccfa2] border border-[#5ccfa2] rounded-lg font-mono text-sm hover:bg-[#5ccfa2] hover:text-[#010112] transition-colors"
            >
              ← Back to Calculator
            </button>
          </div>
        </header>

        {/* Results Content */}
<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  {results.totalSavingsYear1 < 0 ? (
    /* Negative ROI: Show ONLY optimization path */
    <>
      <div id="results-content">
        <OptimizationOpportunity
          results={results}
          selectedTasks={selectedTasks}
          industry={industry}
          onRecalculate={(newSelections) => {
            setSelectedTasks(newSelections);
            setShowResults(false);
          }}
          onCustomStrategy={handleCustomAudit}
        />
      </div>
      
      {/* Hidden PDF View */}
      <PDFResultsView 
  results={results}
  selectedTasks={selectedTasks}
  industry={industry}
  calculationMethod={calculationMethod}
/>
      
      <CTAButtons
  targetElementId="pdf-results-content"
  results={results}
  selectedTasks={selectedTasks}
  industry={industry}
  calculationMethod={calculationMethod}
  webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ''}
  onCustomAudit={handleCustomAudit}
/>
    </>
  ) : (
    /* Positive ROI: Show normal results */
    <>
      <div id="results-content">
        <ResultsSummary results={results} />
        <ComparisonChart results={results} />
        <BreakevenTimeline results={results} />
        <TaskBreakdown taskResults={results.taskResults} />
      </div>
      
      {/* Hidden PDF View */}
      <PDFResultsView 
  results={results}
  selectedTasks={selectedTasks}
  industry={industry}
  calculationMethod={calculationMethod}
/>
      
      <CTAButtons
  targetElementId="pdf-results-content"
  results={results}
  selectedTasks={selectedTasks}
  industry={industry}
  calculationMethod={calculationMethod}
  webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ''}
  onCustomAudit={handleCustomAudit}
/>
    </>
  )}
</main>
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

            {/* NEW: Calculation Method Selector */}
            <CalculationMethodSelector
              selected={calculationMethod}
              onChange={setCalculationMethod}
            />

            <p className="font-inter-tight text-[#f5f5f5] mb-8">
              Select the tasks you currently do manually:
            </p>

            <TaskSelector
              selectedTasks={selectedTasks}
              onChange={setSelectedTasks}
            />

            {/* Add bottom padding for mobile sticky footer */}
            <div className="lg:hidden h-64"></div>
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
        
        {/* Mobile Sticky Footer - Counter + Button */}
        <MobileCalculatorFooter
          totalCost={totalManualCost}
          totalHours={totalHours}
          taskCount={selectedTasks.length}
          onCalculate={handleCalculate}
          disabled={selectedTasks.length === 0}
        />
      </main>
    </div>
  );
}