'use client';

import { useState } from 'react';
import { CalculationResult } from '@/types/calculator.types';
import { formatCurrency, formatNumber } from '@/lib/calculatorLogic';

interface TaskBreakdownProps {
  taskResults: CalculationResult[];
}

export default function TaskBreakdown({ taskResults }: TaskBreakdownProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  
  const toggleTask = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };
  
  return (
    <div className="mb-8">
      <h3 className="font-mono text-[#5ccfa2] text-lg uppercase tracking-wider mb-4">
        Breakdown by Automation
      </h3>
      
      <div className="space-y-3">
        {taskResults.map((task) => {
          const isExpanded = expandedTasks.has(task.taskId);
          
          return (
            <div 
              key={task.taskId}
              className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
            >
              {/* Collapsed Header */}
              <button
                onClick={() => toggleTask(task.taskId)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="text-left">
                  <h4 className="font-inter-tight text-[#f5f5f5] font-semibold mb-1">
                    {task.taskName}
                  </h4>
                  <p className="text-[#a0a0a0] text-sm font-inter-tight">
                    Min. {formatCurrency(task.savingsYear1)}/year saved
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#5ccfa2] text-sm">
                    {isExpanded ? 'Hide details' : 'See details'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-[#5ccfa2] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-gray-800">
                  <div className="space-y-4">
                    {/* Manual Cost */}
                    <div>
                      <h5 className="font-inter-tight text-[#f5f5f5] font-semibold mb-2">
                        Manual Cost: <span className="text-[#ff6b6b]">{formatCurrency(task.annualManualCost)}</span>/year
                      </h5>
                      <p className="text-[#a0a0a0] text-sm font-inter-tight">
                        Based on {task.volume} {task.volume === 1 ? 'item' : 'items'} per month × {formatNumber(task.annualHoursSaved / task.volume / 12, 1)} hours each
                      </p>
                    </div>
                    
                    {/* Zenith Solution */}
                    <div>
                      <h5 className="font-inter-tight text-[#f5f5f5] font-semibold mb-2">
                        Zenith AI Solution (Year 1): <span className="text-[#5ccfa2]">{formatCurrency(task.zenithYear1Cost)}</span>
                      </h5>
                      <ul className="text-[#f5f5f5] text-sm font-inter-tight space-y-1 ml-4">
                        <li>• Setup: {formatCurrency(task.zenithYear1Cost - task.zenithYear2PlusCost)}</li>
                        <li>• Monthly optimization: {formatCurrency(task.zenithYear2PlusCost / 12)}/month</li>
                        <li className="text-[#a0a0a0] text-xs mt-2">* {task.aiCostDisclaimer}</li>
                      </ul>
                    </div>
                    
                    {/* Savings */}
                    <div className="pt-4 border-t border-gray-800">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[#a0a0a0] text-sm font-inter-tight mb-1">
                            Year 1 Savings
                          </p>
                          <p className={`font-mono font-bold text-xl ${task.savingsYear1 >= 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'}`}>
                            {task.savingsYear1 >= 0 ? '+' : ''}{formatCurrency(task.savingsYear1)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#a0a0a0] text-sm font-inter-tight mb-1">
                            Year 2+ Savings
                          </p>
                          <p className={`font-mono font-bold text-xl ${task.savingsYear2Plus >= 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'}`}>
                            {task.savingsYear2Plus >= 0 ? '+' : ''}{formatCurrency(task.savingsYear2Plus)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[#f5f5f5] font-inter-tight text-sm">
                          ROI (Year 1):
                        </span>
                        <span className={`font-mono font-bold text-lg ${task.roiYear1 >= 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'}`}>
                          {task.roiYear1 >= 0 ? '+' : ''}{formatNumber(task.roiYear1, 0)}%
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[#f5f5f5] font-inter-tight text-sm">
                          Time Reclaimed:
                        </span>
                        <span className="font-mono text-[#5ccfa2] font-semibold">
                          {formatNumber(task.workingDaysSaved, 0)} working days/year
                        </span>
                      </div>
                      
                      {/* Disclaimer when negative savings but positive time savings */}
                      {task.savingsYear1 < 0 && task.workingDaysSaved > 0 && (
                        <div className="mt-4 p-3 bg-orange-900/20 border border-orange-800 rounded">
                          <p className="text-orange-400 text-xs font-inter-tight">
                            💡 <strong>Note:</strong> While Year 1 requires additional investment of {formatCurrency(Math.abs(task.savingsYear1))}, 
                            you'll still reclaim {formatNumber(task.workingDaysSaved, 0)} working days. 
                            This time can be redirected to revenue-generating activities. 
                            Year 2+ becomes profitable at {formatCurrency(task.savingsYear2Plus)}/year.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}