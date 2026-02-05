'use client';

import { CalculationMethod } from '@/types/calculator.types';

interface CalculationMethodSelectorProps {
  selected: CalculationMethod;
  onChange: (method: CalculationMethod) => void;
}

export default function CalculationMethodSelector({ selected, onChange }: CalculationMethodSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block font-inter-tight text-[#f5f5f5] text-sm mb-3">
        Calculate savings based on:
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Salary Option */}
        <button
          onClick={() => onChange('salary')}
          className={`p-4 rounded-lg border-2 transition-all text-left ${
            selected === 'salary'
              ? 'border-[#5ccfa2] bg-[#5ccfa2]/10'
              : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
              selected === 'salary' ? 'border-[#5ccfa2]' : 'border-gray-600'
            }`}>
              {selected === 'salary' && (
                <div className="w-3 h-3 rounded-full bg-[#5ccfa2]"></div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-inter-tight text-[#f5f5f5] font-semibold mb-1">
                Average Salaries
              </p>
              <p className="font-inter-tight text-[#a0a0a0] text-xs leading-relaxed">
                Conservative estimate based on typical employee salaries. Best for operational cost analysis.
              </p>
            </div>
          </div>
        </button>

        {/* Hourly Rate Option */}
        <button
          onClick={() => onChange('hourly')}
          className={`p-4 rounded-lg border-2 transition-all text-left ${
            selected === 'hourly'
              ? 'border-[#5ccfa2] bg-[#5ccfa2]/10'
              : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
              selected === 'hourly' ? 'border-[#5ccfa2]' : 'border-gray-600'
            }`}>
              {selected === 'hourly' && (
                <div className="w-3 h-3 rounded-full bg-[#5ccfa2]"></div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-inter-tight text-[#f5f5f5] font-semibold mb-1">
                Hourly Rates
              </p>
              <p className="font-inter-tight text-[#a0a0a0] text-xs leading-relaxed">
                Includes overhead and opportunity cost. Best for agencies, consultancies, or capacity planning.
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Info Tip */}
      <div className="mt-3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
        <p className="font-inter-tight text-[#a0a0a0] text-xs">
          💡 <strong className="text-[#f5f5f5]">Tip:</strong> {
            selected === 'salary' 
              ? 'Salary-based calculations show realistic, conservative savings for salaried employees.'
              : 'Hourly rates include overhead costs and show the full opportunity cost of time spent on manual tasks.'
          }
        </p>
      </div>
    </div>
  );
}