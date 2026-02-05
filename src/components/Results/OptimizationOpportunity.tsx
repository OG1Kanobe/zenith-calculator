'use client';

import { useState } from 'react';
import { TotalResults, TaskSelection, Industry } from '@/types/calculator.types';
import OptimizationAlert from './OptimizationAlert';
import OneOffPackageCard from './OneOffPackageCard';
import FullServiceCollapsible from './FullServiceCollapsible';
import { formatCurrency } from '@/lib/calculatorLogic';
import { TASKS } from '@/lib/taskData';

// Keep your existing task categories
const GROWTH_TASKS = [
  'lead-prospecting',
  'appointment-setting', 
  'rfp-tender-draft',
  'social-content-gen',
  'seo-articles',
  'client-onboarding'
];

const PROBLEM_TASKS = [
  'level-1-support'
];

const NEUTRAL_TASKS = [
  'email-campaigns',
  'invoice-processing',
  'nda-legal-review',
  'resume-screening'
];

interface OptimizationOpportunityProps {
  results: TotalResults;
  selectedTasks: TaskSelection[];
  industry: Industry;
  onRecalculate: (newSelections: TaskSelection[]) => void;
  onCustomStrategy: () => void;
}

export default function OptimizationOpportunity({ 
  results, 
  selectedTasks,
  industry,
  onRecalculate,
  onCustomStrategy 
}: OptimizationOpportunityProps) {
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  
  // Calculate 3-year total
  const threeYearTotal = results.totalSavingsYear1 + (results.totalSavingsYear2Plus * 2);
  
  // Determine severity
  const severity: 'moderate' | 'strong' = threeYearTotal < -15000 ? 'strong' : 'moderate';
  
  // Generate smart suggestions
  const suggestions = generateSuggestions(selectedTasks, industry);
  
  // Calculate total time saved
  const totalTimeSavedHours = results.taskResults.reduce((total, task) => {
    return total + task.annualHoursSaved;
  }, 0);

  return (
    <div className="space-y-8">
      {/* New Alert Banner */}
      <OptimizationAlert 
        threeYearTotal={threeYearTotal}
        severity={severity}
      />

      {/* New One-Off Package Card */}
      <OneOffPackageCard 
        onBookConsultation={onCustomStrategy}
      />

      {/* New Collapsible Full-Service */}
      <FullServiceCollapsible 
        results={results}
        onBookConsultation={onCustomStrategy}
      />

      {/* Divider */}
      <div className="border-t-2 border-gray-700"></div>

      {/* Keep Your Existing Optimization Suggestions Section */}
      <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-2 border-blue-500 rounded-xl p-4 md:p-8">
        <div className="flex items-start gap-2 md:gap-3 mb-4 md:mb-6">
          <span className="text-2xl md:text-4xl">⚡</span>
          <div>
            <h2 className="font-mono text-blue-400 text-lg md:text-2xl mb-1 md:mb-2">
              INSTANT ROI ALTERNATIVES
            </h2>
            <p className="text-[#f5f5f5] font-inter-tight text-sm md:text-base">
              Or optimize your current selection for better ROI
            </p>
          </div>
        </div>
        
        {/* Current Selection Summary */}
        <div className="bg-[#010112]/50 border border-blue-800 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-[#5ccfa2] text-sm uppercase tracking-wider">
              Your Current Selection:
            </h3>
            
            <button
              onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
              className="text-xs font-inter-tight text-[#5ccfa2] hover:text-[#6ee0b3] 
                       underline transition-colors"
            >
              {showDetailedBreakdown ? '← Simple view' : 'Show detailed breakdown →'}
            </button>
          </div>

          {!showDetailedBreakdown ? (
            <>
              {/* Scenario B: Year 1 negative, Year 2+ positive */}
              {results.totalSavingsYear1 < 0 && results.totalSavingsYear2Plus > 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-base md:text-lg">
                    <div>
                      <span className="text-[#a0a0a0] font-inter-tight">Year 1: </span>
                      <span className="text-[#ff6b6b] font-mono font-bold">
                        {formatCurrency(results.totalSavingsYear1)}
                      </span>
                      <span className="text-[#a0a0a0] text-sm ml-2">(investment phase)</span>
                    </div>
                    <div>
                      <span className="text-[#a0a0a0] font-inter-tight">Year 2+: </span>
                      <span className="text-[#5ccfa2] font-mono font-bold">
                        +{formatCurrency(results.totalSavingsYear2Plus)}/year
                      </span>
                      <span className="text-[#5ccfa2] text-sm ml-2">(profitable!)</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#5ccfa2]/10 border border-[#5ccfa2]/30 rounded-lg p-4">
                    <p className="text-[#f5f5f5] font-inter-tight text-sm leading-relaxed">
                      💡 Your setup investment pays off in Year 2, plus you reclaim{' '}
                      <strong className="text-[#5ccfa2]">
                        {totalTimeSavedHours.toFixed(0)} working hours/year
                      </strong>{' '}
                      from day one.
                    </p>
                  </div>
                </div>
              )}

              {/* Scenario C: Year 2+ still negative but 3-year cumulative positive */}
              {results.totalSavingsYear1 < 0 && 
               results.totalSavingsYear2Plus < 0 && 
               threeYearTotal > 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-base md:text-lg">
                    <div>
                      <span className="text-[#a0a0a0] font-inter-tight">Year 1: </span>
                      <span className="text-[#ff6b6b] font-mono font-bold">
                        {formatCurrency(results.totalSavingsYear1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#a0a0a0] font-inter-tight">Years 2-3: </span>
                      <span className="text-[#ff6b6b] font-mono font-bold">
                        {formatCurrency(results.totalSavingsYear2Plus)}/year
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">3-Year Cumulative:</p>
                    <p className="text-[#5ccfa2] font-mono font-bold text-xl">
                      +{formatCurrency(threeYearTotal)}
                    </p>
                    <p className="text-[#a0a0a0] text-xs font-inter-tight">(break-even by year 3)</p>
                  </div>
                  
                  <div className="bg-[#5ccfa2]/10 border border-[#5ccfa2]/30 rounded-lg p-4">
                    <p className="text-[#f5f5f5] font-inter-tight text-sm leading-relaxed">
                      💡 Long-term investment that reclaims{' '}
                      <strong className="text-[#5ccfa2]">
                        {totalTimeSavedHours.toFixed(0)} working hours/year
                      </strong>{' '}
                      throughout the period.
                    </p>
                  </div>
                </div>
              )}

              {/* Scenario A: All years negative */}
              {results.totalSavingsYear1 < 0 && 
               results.totalSavingsYear2Plus < 0 && 
               threeYearTotal <= 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-base md:text-lg">
                    <div>
                      <span className="text-[#a0a0a0] font-inter-tight">Year 1: </span>
                      <span className="text-[#ff6b6b] font-mono font-bold">
                        {formatCurrency(results.totalSavingsYear1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#a0a0a0] font-inter-tight">Years 2-3: </span>
                      <span className="text-[#ff6b6b] font-mono font-bold">
                        {formatCurrency(results.totalSavingsYear2Plus)}/year
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                    <p className="text-[#f5f5f5] font-inter-tight text-sm leading-relaxed">
                      💡 While this requires ongoing investment, you reclaim{' '}
                      <strong className="text-[#5ccfa2]">
                        {totalTimeSavedHours.toFixed(0)} working hours/year
                      </strong>. 
                      This freed capacity can generate revenue that offsets the automation cost.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
              <div>
                <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">Year 1</p>
                <p className="text-[#ff6b6b] font-mono font-bold text-base md:text-xl">
                  {formatCurrency(results.totalSavingsYear1)}
                </p>
              </div>
              
              <div>
                <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">Year 2</p>
                <p className={`font-mono font-bold text-base md:text-xl ${results.totalSavingsYear2Plus >= 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'}`}>
                  {results.totalSavingsYear2Plus >= 0 ? '+' : ''}{formatCurrency(results.totalSavingsYear2Plus)}
                </p>
              </div>

              <div>
                <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">Year 3</p>
                <p className={`font-mono font-bold text-base md:text-xl ${results.totalSavingsYear2Plus >= 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'}`}>
                  {results.totalSavingsYear2Plus >= 0 ? '+' : ''}{formatCurrency(results.totalSavingsYear2Plus)}
                </p>
              </div>
              
              <div>
                <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">3-Year Total</p>
                <p className={`font-mono font-bold text-xl ${threeYearTotal > 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'}`}>
                  {threeYearTotal > 0 ? '+' : ''}{formatCurrency(threeYearTotal)}
                </p>
              </div>
            </div>
          )}
          
          <p className="text-[#f5f5f5] font-inter-tight text-xs md:text-sm mt-4 pt-4 border-t border-gray-700">
            Selected: {results.taskResults.map(t => t.taskName).join(', ')}
          </p>
        </div>
        
        {/* Optimization Options */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="bg-[#010112]/50 border border-gray-700 rounded-lg p-4 md:p-6 hover:border-[#5ccfa2] transition-colors"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h4 className="font-inter-tight text-[#f5f5f5] font-semibold text-base md:text-lg mb-2">
                    {suggestion.title}
                  </h4>
                  <p className="text-[#a0a0a0] font-inter-tight text-xs md:text-sm mb-3">
                    {suggestion.description}
                  </p>
                      
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                    <div>
                      <p className="text-[#a0a0a0] text-xs font-inter-tight">Year 1 Savings</p>
                      <p className="text-[#5ccfa2] font-mono font-bold text-xl md:text-2xl">
                        +{formatCurrency(suggestion.projectedYear1Savings)}
                      </p>
                    </div>
                    {suggestion.savingsIncrease && (
                      <div className="text-[#5ccfa2] font-inter-tight text-xs md:text-sm">
                        ↑ {formatCurrency(suggestion.savingsIncrease)} improvement
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => onRecalculate(suggestion.newSelections)}
                  className="w-full md:w-auto px-6 py-3 bg-[#5ccfa2] text-[#010112] rounded-lg font-mono font-semibold text-sm md:text-base
                           hover:bg-[#6ee0b3] transition-colors"
                >
                  {suggestion.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Keep all your existing helper functions
function getVolumeContext(taskId: string): string {
  const contexts: Record<string, string> = {
    'lead-prospecting': 'leads',
    'appointment-setting': 'appointments',
    'rfp-tender-draft': 'proposals',
    'social-content-gen': 'content',
    'seo-articles': 'articles',
    'client-onboarding': 'clients'
  };
  return contexts[taskId] || 'volume';
}

function generateSuggestions(
  currentSelections: TaskSelection[], 
  industry: Industry
): Array<{
  title: string;
  description: string;
  projectedYear1Savings: number;
  savingsIncrease?: number;
  buttonText: string;
  newSelections: TaskSelection[];
}> {

  const suggestions = [];
  
  const calculateSavings = (selections: TaskSelection[]) => {
    const manualCost = selections.reduce((total, sel) => {
      const task = TASKS.find(t => t.id === sel.taskId);
      if (!task) return total;
      
      const industryMultiplier = industry === 'Legal' ? 2.0 :
                                 industry === 'Healthcare' ? 1.8 :
                                 industry === 'Financial Services' ? 1.7 :
                                 industry === 'Professional Services' ? 1.5 :
                                 industry === 'Technology' ? 1.2 :
                                 industry === 'Real Estate' ? 1.3 : 1.0;
      
      const humanTimeInHours = task.humanTimeMinutes / 60;
      const effectiveHourlyRate = task.humanCostPerHour * 1.2 * industryMultiplier;
      const monthlyManualCost = sel.volume * humanTimeInHours * effectiveHourlyRate;
      return total + (monthlyManualCost * 12);
    }, 0);
    
    const aiCost = selections.reduce((total, sel) => {
      const task = TASKS.find(t => t.id === sel.taskId);
      if (!task) return total;
      
      const annualVolume = sel.volume * 12;
      const annualAIRunCost = annualVolume * task.aiRunCost;
      return total + task.zenithSetupFee + (task.zenithMonthlyFee * 12) + annualAIRunCost;
    }, 0);
    
    return manualCost - aiCost;
  };
  
  const currentYear1Savings = calculateSavings(currentSelections);
  // Suggestion 1: Scale volume (ONLY for growth tasks)
  if (currentSelections.length === 1) {
    const taskId = currentSelections[0].taskId;
    
    // Only suggest scaling for growth-oriented tasks
    if (GROWTH_TASKS.includes(taskId)) {
      const scaledSelections = currentSelections.map(sel => ({
        ...sel,
        volume: Math.ceil(sel.volume * 3)
      }));
      
      const scaledSavings = calculateSavings(scaledSelections);
      const task = TASKS.find(t => t.id === taskId);
      
      if (scaledSavings > 0 && task) {
        suggestions.push({
          title: `Option 1: Scale Your Volume`,
          description: `Increase from ${currentSelections[0].volume} to ${scaledSelections[0].volume} ${task.name.toLowerCase()} per month. More ${getVolumeContext(taskId)} = more business opportunity.`,
          projectedYear1Savings: scaledSavings,
          savingsIncrease: scaledSavings - currentYear1Savings,
          buttonText: 'Recalculate',
          newSelections: scaledSelections
        });
      }
    }
    
    // For neutral tasks, add context (less aggressive scaling)
    if (NEUTRAL_TASKS.includes(taskId)) {
      const scaledSelections = currentSelections.map(sel => ({
        ...sel,
        volume: Math.ceil(sel.volume * 1.5) // Less aggressive
      }));
      
      const scaledSavings = calculateSavings(scaledSelections);
      const task = TASKS.find(t => t.id === taskId);
      
      if (scaledSavings > 0 && task) {
        suggestions.push({
          title: `Option 1: Growth Scenario`,
          description: `If your business grows to ${scaledSelections[0].volume} ${task.name.toLowerCase()} per month, here's your projected ROI.`,
          projectedYear1Savings: scaledSavings,
          savingsIncrease: scaledSavings - currentYear1Savings,
          buttonText: 'See Scenario',
          newSelections: scaledSelections
        });
      }
    }
    
    // For problem tasks, skip volume scaling entirely
  }
  
  // Suggestion 2: Add complementary high-value automation
  const unselectedTasks = TASKS.filter(
    t => !currentSelections.find(s => s.taskId === t.id)
  );
  
  // Find high-value complementary tasks
  const complementaryTasks = unselectedTasks.filter(t => 
    ['social-content-gen', 'lead-prospecting', 'seo-articles', 'client-onboarding'].includes(t.id)
  );
  
  if (complementaryTasks.length > 0) {
    const bestComplement = complementaryTasks[0];
    const combinedSelections = [
      ...currentSelections,
      { taskId: bestComplement.id, volume: bestComplement.suggestedVolume }
    ];
    
    const combinedSavings = calculateSavings(combinedSelections);
    
    if (combinedSavings > 0) {
      suggestions.push({
        title: `Option ${suggestions.length + 1}: Add ${bestComplement.name}`,
        description: `Combine your current selection with ${bestComplement.name} (${bestComplement.suggestedVolume}/month). Shared overhead improves ROI significantly.`,
        projectedYear1Savings: combinedSavings,
        savingsIncrease: combinedSavings - currentYear1Savings,
        buttonText: 'See Package',
        newSelections: combinedSelections
      });
    }
  }
  
  // Suggestion 3: Popular high-ROI package (adjusted email campaigns)
  const popularPackage: TaskSelection[] = [
    { taskId: 'lead-prospecting', volume: 80 },
    { taskId: 'social-content-gen', volume: 20 },
    { taskId: 'email-campaigns', volume: 12 } // Reduced from 30 to 12
  ];
  
  const packageSavings = calculateSavings(popularPackage);
  
  if (packageSavings > 0 && currentSelections.length < 3) {
    suggestions.push({
      title: `Option ${suggestions.length + 1}: Popular Starter Package`,
      description: `Our most popular combination: Lead Prospecting (80/mo) + Social Media (20/mo) + Email Campaigns (12/mo). Proven ROI.`,
      projectedYear1Savings: packageSavings,
      savingsIncrease: packageSavings - currentYear1Savings,
      buttonText: 'Try Package',
      newSelections: popularPackage
    });
  }
  
  return suggestions.filter(s => s.projectedYear1Savings > 0).slice(0, 3);
}