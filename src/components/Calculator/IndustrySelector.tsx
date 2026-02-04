'use client';

import { Industry } from '@/types/calculator.types';
import { INDUSTRY_MULTIPLIERS } from '@/lib/industryData';

interface IndustrySelectorProps {
  selected: Industry;
  onChange: (industry: Industry) => void;
}

export default function IndustrySelector({ selected, onChange }: IndustrySelectorProps) {
  return (
    <div className="mb-8 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
      <label className="font-mono text-[#5ccfa2] text-sm uppercase tracking-wider mb-3 block">
        What industry are you in?
      </label>
      
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value as Industry)}
        className="w-full px-4 py-3 bg-[#010112] border border-gray-700 rounded-lg
                 text-[#f5f5f5] font-inter-tight
                 focus:outline-none focus:border-[#5ccfa2] focus:ring-2 focus:ring-[#5ccfa2]
                 cursor-pointer transition-all"
      >
        {INDUSTRY_MULTIPLIERS.map(({ industry, description, multiplier }) => (
          <option key={industry} value={industry}>
          {industry} - {description}
        </option>
        ))}
      </select>
      
      <p className="text-[#a0a0a0] text-xs font-inter-tight mt-2">
        Industry multipliers account for higher professional rates in specialized fields
      </p>
    </div>
  );
}
