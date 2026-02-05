'use client';
import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/calculatorLogic';
import { TotalResults } from '@/types/calculator.types';

interface ResultsSummaryProps {
  results: TotalResults;
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  const [showSavingsCalc, setShowSavingsCalc] = useState(false);
  const [showTimeCalc, setShowTimeCalc] = useState(false);

  return (
    <div className="mb-8">
      <h1 className="font-mono text-[#5ccfa2] text-4xl text-center mb-8">
        YOUR POTENTIAL SAVINGS
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Total Savings Card */}
        <div className="bg-gradient-to-br from-gray-900 to-[#010112] border-2 border-[#5ccfa2] rounded-xl p-6">
          <h3 className="font-mono text-[#5ccfa2] text-sm uppercase tracking-wider mb-3">
            Total Savings (Year 1)
          </h3>
          <div className={`text-5xl font-mono font-bold mb-2 ${
            results.totalSavingsYear1 >= 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'
          }`}>
            {results.totalSavingsYear1 >= 0 ? '+' : ''}{formatCurrency(results.totalSavingsYear1)}
          </div>
          <p className="text-[#a0a0a0] text-sm font-inter-tight">
            per year
          </p>
          
          {/* Toggle Button */}
          <button
            onClick={() => setShowSavingsCalc(!showSavingsCalc)}
            className="text-xs font-inter-tight text-[#5ccfa2] hover:text-[#6ee0b3] 
                       underline transition-colors mt-2"
          >
            {showSavingsCalc ? '← Hide calculation' : 'Show calculation →'}
          </button>
          
          {/* Collapsible Calculation */}
          {showSavingsCalc && (
            <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
              <div className="flex justify-between text-sm font-inter-tight">
                <span className="text-[#a0a0a0]">Manual cost:</span>
                <span className="text-[#f5f5f5] font-semibold">
                  {formatCurrency(results.totalAnnualManualCost)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-inter-tight">
                <span className="text-[#a0a0a0]">Zenith cost:</span>
                <span className="text-[#f5f5f5] font-semibold">
                  {formatCurrency(results.totalZenithYear1Cost)}
                </span>
              </div>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-[#f5f5f5] text-sm font-inter-tight">
              Year 2+ savings: <span className={`font-semibold ${
                results.totalSavingsYear2Plus >= 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'
              }`}>
                {results.totalSavingsYear2Plus >= 0 ? '+' : ''}{formatCurrency(results.totalSavingsYear2Plus)}
              </span>/year
            </p>
          </div>
        </div>
        
        {/* Hours Saved Card */}
        <div className="bg-gradient-to-br from-gray-900 to-[#010112] border-2 border-[#5ccfa2] rounded-xl p-6">
          <h3 className="font-mono text-[#5ccfa2] text-sm uppercase tracking-wider mb-3">
            Time Reclaimed
          </h3>
          <div className="text-5xl font-mono font-bold text-[#5ccfa2] mb-2">
            {formatNumber(results.totalAnnualHours, 0)} hrs
          </div>
          <p className="text-[#a0a0a0] text-sm font-inter-tight">
            per year
          </p>
          
          {/* Toggle Button */}
          <button
            onClick={() => setShowTimeCalc(!showTimeCalc)}
            className="text-xs font-inter-tight text-[#5ccfa2] hover:text-[#6ee0b3] 
                       underline transition-colors mt-2"
          >
            {showTimeCalc ? '← Hide calculation' : 'Show calculation →'}
          </button>
          
          {/* Collapsible Calculation */}
          {showTimeCalc && (
            <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
              {results.taskResults.map((task) => {
                // Calculate total manual time for this task
                const taskData = results.taskResults.find(t => t.taskId === task.taskId);
                const manualTimePerTask = taskData ? (taskData.taskName.length > 0 ? task.annualHoursSaved : 0) : 0;
                
                return (
                  <div key={task.taskId} className="mb-3 pb-3 border-b border-gray-800 last:border-0">
                    <p className="text-[#f5f5f5] text-sm font-inter-tight font-semibold mb-2">
                      {task.taskName}
                    </p>
                    <div className="flex justify-between text-xs font-inter-tight">
                      <span className="text-[#a0a0a0]">Hours saved:</span>
                      <span className="text-[#5ccfa2] font-semibold">
                        {formatNumber(task.annualHoursSaved, 0)} hrs/year
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-inter-tight mt-1">
                      <span className="text-[#a0a0a0]">Working days:</span>
                      <span className="text-[#5ccfa2] font-semibold">
                        {formatNumber(task.workingDaysSaved, 1)} days
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-[#f5f5f5] text-sm font-inter-tight">
              That's <span className="text-[#5ccfa2] font-semibold">
                {formatNumber(results.totalWorkingDays, 0)} working days
              </span> reclaimed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}