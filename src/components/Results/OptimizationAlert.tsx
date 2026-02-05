'use client';

import { formatCurrency } from '@/lib/calculatorLogic';

interface OptimizationAlertProps {
  threeYearTotal: number;
  severity: 'moderate' | 'strong';
}

export default function OptimizationAlert({ threeYearTotal, severity }: OptimizationAlertProps) {
  return (
    <div className={`p-6 rounded-lg border-2 mb-8 ${
      severity === 'strong' 
        ? 'bg-orange-900/20 border-orange-500/50' 
        : 'bg-yellow-900/20 border-yellow-500/50'
    }`}>
      <div className="flex items-start gap-4">
        <span className="text-3xl">⚠️</span>
        <div className="flex-1">
          <h3 className="font-inter-tight text-[#f5f5f5] text-xl font-bold mb-2">
            {severity === 'strong' 
              ? 'Full-Service May Not Be Cost-Effective'
              : 'Limited Profitability Detected'
            }
          </h3>
          <p className="font-inter-tight text-[#a0a0a0] text-sm leading-relaxed">
            Your 3-year total shows <strong className="text-orange-400">{formatCurrency(threeYearTotal)}</strong>.
            {severity === 'strong' 
              ? ' At your current volume, our full-service package (setup + monthly + optimization) may not deliver positive ROI within 3 years.'
              : ' Our full-service package shows marginal returns at your current volume.'
            }
          </p>
          <p className="font-inter-tight text-[#f5f5f5] text-sm mt-3">
            💡 <strong>We recommend a different approach that better fits your needs.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}