'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/calculatorLogic';
import CalculateButton from './CalculateButton';

interface MobileCalculatorFooterProps {
  totalCost: number;
  totalHours: number;
  taskCount: number;
  onCalculate: () => void;
  disabled: boolean;
}

export default function MobileCalculatorFooter({ 
  totalCost, 
  totalHours, 
  taskCount,
  onCalculate,
  disabled
}: MobileCalculatorFooterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const workingDays = Math.round(totalHours / 8);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010112] via-[#010112]/98 to-transparent pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative px-4 pt-3 pb-4 space-y-3">
        {/* Counter Card */}
        <div className={`
          rounded-xl border-2 overflow-hidden
          ${taskCount > 0 ? 'border-[#5ccfa2]' : 'border-gray-800'}
          transition-all duration-300
        `}>
          <div className="bg-gradient-to-br from-gray-900 to-[#010112] p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-mono text-[#5ccfa2] text-xs uppercase tracking-wider mb-1">
                  Current Leakage
                </h3>
                <div className="text-2xl font-mono font-bold">
                  <span className={taskCount > 0 ? 'text-[#ff6b6b]' : 'text-gray-700'}>
                    {formatCurrency(totalCost)}
                  </span>
                </div>
                <p className="text-[#a0a0a0] text-xs font-inter-tight">
                  per year
                </p>
              </div>
              
              {taskCount > 0 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#5ccfa2] text-xs font-mono px-3 py-2 border border-[#5ccfa2] rounded whitespace-nowrap"
                >
                  {isExpanded ? 'Hide' : 'Details'}
                </button>
              )}
            </div>
            
            {/* Expanded Details */}
            {isExpanded && taskCount > 0 && (
              <div className="pt-3 mt-3 border-t border-gray-800 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-inter-tight text-[#f5f5f5] font-semibold">
                    {formatNumber(totalHours, 0)}
                  </span>
                  <span className="text-[#a0a0a0] text-xs font-inter-tight">
                    hours/year = {workingDays} days
                  </span>
                </div>
                
                <p className="text-[#a0a0a0] text-xs font-inter-tight">
                  {taskCount} task{taskCount === 1 ? '' : 's'} selected
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Calculate Button */}
        <CalculateButton 
          onClick={onCalculate}
          disabled={disabled}
        />
      </div>
    </div>
  );
}