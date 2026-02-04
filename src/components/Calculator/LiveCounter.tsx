'use client';

import { useEffect, useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/calculatorLogic';

interface LiveCounterProps {
  totalCost: number;
  totalHours: number;
  taskCount: number;
}

export default function LiveCounter({ totalCost, totalHours, taskCount }: LiveCounterProps) {
  const [displayCost, setDisplayCost] = useState(0);
  const [displayHours, setDisplayHours] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Animate counter when values change
  useEffect(() => {
    const duration = 500; // ms
    const steps = 30;
    const costStep = (totalCost - displayCost) / steps;
    const hoursStep = (totalHours - displayHours) / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      
      if (currentStep >= steps) {
        setDisplayCost(totalCost);
        setDisplayHours(totalHours);
        clearInterval(interval);
      } else {
        setDisplayCost(prev => prev + costStep);
        setDisplayHours(prev => prev + hoursStep);
      }
    }, duration / steps);
    
    return () => clearInterval(interval);
  }, [totalCost, totalHours]);

  const workingDays = Math.round(totalHours / 8);

  return (
    <>
      {/* Desktop Version (Original) */}
      <div className="hidden lg:block">
        <div className={`
          bg-gradient-to-br from-gray-900 to-[#010112] 
          border-2 rounded-xl p-6
          ${taskCount > 0 ? 'border-[#5ccfa2] pulse-glow' : 'border-gray-800'}
          transition-all duration-300
        `}>
          <h3 className="font-mono text-[#5ccfa2] text-sm uppercase tracking-wider mb-4">
            Your Current Leakage
          </h3>
          
          {/* Main Cost Display */}
          <div className="mb-6">
            <div className="text-5xl font-mono font-bold mb-1">
              <span className={taskCount > 0 ? 'text-[#ff6b6b]' : 'text-gray-700'}>
                {formatCurrency(displayCost)}
              </span>
            </div>
            <p className="text-[#a0a0a0] text-sm font-inter-tight">
              per year in manual labor
            </p>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-800 my-4"></div>
          
          {/* Hours Display */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-inter-tight text-[#f5f5f5] font-semibold">
                {formatNumber(displayHours, 0)}
              </span>
              <span className="text-[#a0a0a0] text-sm font-inter-tight">
                hours/year
              </span>
            </div>
            
            {workingDays > 0 && (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-inter-tight text-[#5ccfa2] font-semibold">
                  = {formatNumber(workingDays, 0)}
                </span>
                <span className="text-[#a0a0a0] text-sm font-inter-tight">
                  working days
                </span>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <p className="text-[#a0a0a0] text-xs font-inter-tight">
              {taskCount === 0 ? (
                'Select tasks to see your leakage'
              ) : (
                `Based on ${taskCount} selected task${taskCount === 1 ? '' : 's'}`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Version (Sticky Bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#010112] via-[#010112] to-transparent pb-safe">
        <div className={`
          mx-4 mb-4 rounded-xl border-2 overflow-hidden
          ${taskCount > 0 ? 'border-[#5ccfa2]' : 'border-gray-800'}
          transition-all duration-300
        `}>
          {/* Collapsed View */}
          <div className="bg-gradient-to-br from-gray-900 to-[#010112] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-mono text-[#5ccfa2] text-xs uppercase tracking-wider mb-1">
                  Current Leakage
                </h3>
                <div className="text-2xl font-mono font-bold">
                  <span className={taskCount > 0 ? 'text-[#ff6b6b]' : 'text-gray-700'}>
                    {formatCurrency(displayCost)}
                  </span>
                </div>
                <p className="text-[#a0a0a0] text-xs font-inter-tight">
                  per year in manual labor
                </p>
              </div>
              
              {taskCount > 0 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#5ccfa2] text-xs font-mono px-3 py-2 border border-[#5ccfa2] rounded"
                >
                  {isExpanded ? 'Hide' : 'View More'}
                </button>
              )}
            </div>
            
            {/* Expanded Details */}
            {isExpanded && (
              <div className="pt-3 border-t border-gray-800 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-inter-tight text-[#f5f5f5] font-semibold">
                    {formatNumber(displayHours, 0)}
                  </span>
                  <span className="text-[#a0a0a0] text-xs font-inter-tight">
                    hours/year
                  </span>
                </div>
                
                {workingDays > 0 && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-inter-tight text-[#5ccfa2] font-semibold">
                      = {formatNumber(workingDays, 0)}
                    </span>
                    <span className="text-[#a0a0a0] text-xs font-inter-tight">
                      working days
                    </span>
                  </div>
                )}
                
                <p className="text-[#a0a0a0] text-xs font-inter-tight pt-2">
                  Based on {taskCount} selected task{taskCount === 1 ? '' : 's'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}