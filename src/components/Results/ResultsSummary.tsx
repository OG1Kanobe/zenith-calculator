'use client';

import { formatCurrency, formatNumber } from '@/lib/calculatorLogic';
import { TotalResults } from '@/types/calculator.types';

interface ResultsSummaryProps {
  results: TotalResults;
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  return (
    <div className="mb-8">
      <h1 className="font-mono text-[#5ccfa2] text-4xl text-center mb-8">
        YOUR POTENTIAL SAVINGS
      </h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Total Savings Card */}
        <div className="bg-gradient-to-br from-gray-900 to-[#010112] border-2 border-[#5ccfa2] rounded-xl p-6">
          <h3 className="font-mono text-[#5ccfa2] text-sm uppercase tracking-wider mb-3">
            Total Savings (Year 1)
          </h3>
          <div className="text-5xl font-mono font-bold text-[#5ccfa2] mb-2">
            {formatCurrency(results.totalSavingsYear1)}
          </div>
          <p className="text-[#a0a0a0] text-sm font-inter-tight">
            per year
          </p>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-[#f5f5f5] text-sm font-inter-tight">
              Year 2+ savings: <span className="text-[#5ccfa2] font-semibold">{formatCurrency(results.totalSavingsYear2Plus)}</span>/year
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
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-[#f5f5f5] text-sm font-inter-tight">
              That's <span className="text-[#5ccfa2] font-semibold">{formatNumber(results.totalWorkingDays, 0)} working days</span> reclaimed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}