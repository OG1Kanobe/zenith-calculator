'use client';

import { useState } from 'react';
import { TotalResults } from '@/types/calculator.types';
import { formatCurrency, formatNumber } from '@/lib/calculatorLogic';

interface FullServiceCollapsibleProps {
  results: TotalResults;
  onBookConsultation: () => void;
}

export default function FullServiceCollapsible({ results, onBookConsultation }: FullServiceCollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-2 border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gray-900/50 hover:bg-gray-800/50 p-6 flex items-center justify-between transition-colors"
      >
        <div className="text-left">
          <h3 className="font-inter-tight text-[#f5f5f5] text-xl font-bold mb-1">
            Still Interested in Full-Service?
          </h3>
          <p className="font-inter-tight text-[#a0a0a0] text-sm">
            Setup + Monthly Optimization + Ongoing Support
          </p>
        </div>
        <span className="text-[#a0a0a0] text-2xl">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 bg-gray-900/30 border-t border-gray-700">
          {/* Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="font-inter-tight text-[#a0a0a0] text-xs mb-1">Year 1</p>
              <p className={`font-inter-tight text-2xl font-bold ${
                results.totalSavingsYear1 >= 0 ? 'text-[#5ccfa2]' : 'text-red-400'
              }`}>
                {results.totalSavingsYear1 >= 0 ? '+' : ''}{formatCurrency(results.totalSavingsYear1)}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="font-inter-tight text-[#a0a0a0] text-xs mb-1">Year 2+</p>
              <p className={`font-inter-tight text-2xl font-bold ${
                results.totalSavingsYear2Plus >= 0 ? 'text-[#5ccfa2]' : 'text-red-400'
              }`}>
                {results.totalSavingsYear2Plus >= 0 ? '+' : ''}{formatCurrency(results.totalSavingsYear2Plus)}/year
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="font-inter-tight text-[#a0a0a0] text-xs mb-1">Time Saved</p>
              <p className="font-inter-tight text-[#5ccfa2] text-2xl font-bold">
                {formatNumber(results.totalAnnualHours, 0)} hrs/yr
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-gray-800/30 rounded-lg p-5 mb-6">
            <h4 className="font-inter-tight text-[#f5f5f5] font-semibold mb-3">
              What's Included:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 font-inter-tight text-[#a0a0a0] text-sm">
                <span className="text-[#5ccfa2]">✓</span>
                <span>Complete setup and integration</span>
              </li>
              <li className="flex items-start gap-2 font-inter-tight text-[#a0a0a0] text-sm">
                <span className="text-[#5ccfa2]">✓</span>
                <span>Monthly optimization and performance monitoring</span>
              </li>
              <li className="flex items-start gap-2 font-inter-tight text-[#a0a0a0] text-sm">
                <span className="text-[#5ccfa2]">✓</span>
                <span>Ongoing technical support</span>
              </li>
              <li className="flex items-start gap-2 font-inter-tight text-[#a0a0a0] text-sm">
                <span className="text-[#5ccfa2]">✓</span>
                <span>AI usage costs covered in monthly fee</span>
              </li>
              <li className="flex items-start gap-2 font-inter-tight text-[#a0a0a0] text-sm">
                <span className="text-[#5ccfa2]">✓</span>
                <span>Continuous improvements and updates</span>
              </li>
            </ul>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gray-800/30 rounded-lg p-5 mb-6">
            <h4 className="font-inter-tight text-[#f5f5f5] font-semibold mb-3">
              Cost Breakdown:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between font-inter-tight">
                <span className="text-[#a0a0a0]">Setup Fee (Year 1 only):</span>
                <span className="text-[#f5f5f5]">{formatCurrency(results.totalZenithYear1Cost - results.totalZenithYear2PlusCost)}</span>
              </div>
              <div className="flex justify-between font-inter-tight">
                <span className="text-[#a0a0a0]">Ongoing (Monthly + AI):</span>
                <span className="text-[#f5f5f5]">{formatCurrency(results.totalZenithYear2PlusCost)}/year</span>
              </div>
            </div>
          </div>

          <button
  onClick={() => window.open('https://cal.com/taahir/ai', '_blank', 'noopener,noreferrer')}
  className="w-full bg-gray-700 hover:bg-gray-600 text-[#f5f5f5] font-mono font-bold py-3 px-6 rounded-lg transition-colors"
>
  Discuss Full-Service Options →
</button>
        </div>
      )}
    </div>
  );
}