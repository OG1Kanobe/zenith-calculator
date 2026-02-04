'use client';

import { formatCurrency } from '@/lib/calculatorLogic';
import { TotalResults } from '@/types/calculator.types';

interface ComparisonChartProps {
  results: TotalResults;
}

export default function ComparisonChart({ results }: ComparisonChartProps) {
  const manualCost = results.totalAnnualManualCost;
  const aiCost = results.totalZenithYear1Cost;
  const percentage = Math.round((aiCost / manualCost) * 100);
  
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
      <h3 className="font-mono text-[#5ccfa2] text-lg uppercase tracking-wider mb-6">
        Cost Comparison
      </h3>
      
      <div className="space-y-6">
        {/* Manual Process Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-inter-tight text-[#f5f5f5] text-sm">
              Current Manual Process
            </span>
            <span className="font-mono text-[#ff6b6b] font-semibold">
              {formatCurrency(manualCost)}
            </span>
          </div>
          <div className="w-full h-12 bg-[#ff6b6b] rounded-lg flex items-center justify-end px-4">
            <span className="font-mono text-[#010112] font-bold text-lg">
              100%
            </span>
          </div>
        </div>
        
        {/* AI Solution Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-inter-tight text-[#f5f5f5] text-sm">
              Zenith AI Solution (Year 1)
            </span>
            <span className="font-mono text-[#5ccfa2] font-semibold">
              {formatCurrency(aiCost)}
            </span>
          </div>
          <div className="w-full h-12 bg-gray-800 rounded-lg relative overflow-hidden">
            <div 
              className="h-full bg-[#5ccfa2] rounded-lg flex items-center justify-end px-4 transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            >
              <span className="font-mono text-[#010112] font-bold text-lg">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-800 text-center">
        <p className="font-inter-tight text-[#f5f5f5] text-lg">
          That's a <span className="text-[#5ccfa2] font-bold text-2xl">{Math.round(results.costReductionPercentage)}%</span> cost reduction 🚀
        </p>
      </div>
    </div>
  );
}