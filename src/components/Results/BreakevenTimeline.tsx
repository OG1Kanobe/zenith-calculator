'use client';

import { formatCurrency } from '@/lib/calculatorLogic';
import { TotalResults } from '@/types/calculator.types';

interface BreakevenTimelineProps {
  results: TotalResults;
}

export default function BreakevenTimeline({ results }: BreakevenTimelineProps) {
  const totalSetupFee = results.taskResults.reduce((sum, task) => {
    const taskData = results.taskResults.find(t => t.taskId === task.taskId);
    return sum + (taskData ? taskData.zenithYear1Cost - (taskData.zenithYear2PlusCost) : 0);
  }, 0);
  
  const monthlyManualCost = results.totalAnnualManualCost / 12;
  const monthlyZenithCost = results.totalZenithYear2PlusCost / 12;
  const monthlySavings = monthlyManualCost - monthlyZenithCost;
  
  // Calculate breakeven month (when cumulative savings exceed setup fee)
  const breakevenMonth = Math.ceil(totalSetupFee / monthlySavings) + 1;
  
 // Generate timeline for first 12 months
 const timeline: Array<{ month: number; cumulative: number; isBreakeven: boolean }> = [];
 let cumulative = -totalSetupFee; // Start with setup cost
 
 for (let month = 1; month <= 12; month++) {
   cumulative += monthlySavings;
   timeline.push({
     month,
     cumulative,
     isBreakeven: cumulative >= 0 && (timeline[timeline.length - 1]?.cumulative ?? -Infinity) < 0
   });
 }
  
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
      <h3 className="font-mono text-[#5ccfa2] text-lg uppercase tracking-wider mb-4">
        Breakeven Analysis
      </h3>
      
      <p className="font-inter-tight text-[#f5f5f5] mb-6">
        After your initial setup investment, you'll break even in <span className="text-[#5ccfa2] font-bold">Month {breakevenMonth}</span>
      </p>
      
      <div className="space-y-2">
        {timeline.map((item) => (
          <div 
            key={item.month}
            className={`
              flex items-center justify-between p-3 rounded-lg
              ${item.cumulative >= 0 ? 'bg-[#5ccfa2]/10' : 'bg-gray-800/50'}
            `}
          >
            <span className="font-mono text-[#f5f5f5]">
              Month {item.month}
            </span>
            <span className={`
              font-mono font-semibold
              ${item.cumulative >= 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'}
            `}>
              {item.cumulative >= 0 ? '+' : ''}{formatCurrency(item.cumulative)}
              {item.isBreakeven && ' ← You\'re in profit!'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <span className="font-inter-tight text-[#f5f5f5]">
            Year 1 Net Gain:
          </span>
          <span className="font-mono text-[#5ccfa2] font-bold text-xl">
            {formatCurrency(results.totalSavingsYear1)}
          </span>
        </div>
      </div>
    </div>
  );
}