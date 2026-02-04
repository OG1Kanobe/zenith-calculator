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
  );
}
