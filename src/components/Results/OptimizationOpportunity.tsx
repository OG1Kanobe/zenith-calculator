'use client';

import { formatCurrency } from '@/lib/calculatorLogic';
import { TotalResults, TaskSelection, Industry } from '@/types/calculator.types';
import { TASKS } from '@/lib/taskData';

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
  
  // Calculate 3-year total
  const threeYearTotal = results.totalSavingsYear1 + (results.totalSavingsYear2Plus * 2);
  
  // Generate smart suggestions
  const suggestions = generateSuggestions(selectedTasks, industry);
  
  return (
    <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-2 border-orange-500 rounded-xl p-8 mb-8">
      <div className="flex items-start gap-3 mb-6">
        <span className="text-4xl">💡</span>
        <div>
          <h2 className="font-mono text-orange-400 text-2xl mb-2">
            OPTIMIZATION OPPORTUNITY DETECTED
          </h2>
          <p className="text-[#f5f5f5] font-inter-tight">
            We found ways to improve your ROI significantly
          </p>
        </div>
      </div>
      
      {/* Current Selection Summary */}
      <div className="bg-[#010112]/50 border border-orange-800 rounded-lg p-6 mb-6">
        <h3 className="font-mono text-[#5ccfa2] text-sm uppercase tracking-wider mb-4">
          Your Current Selection:
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
          <div>
            <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">Year 1</p>
            <p className="text-[#ff6b6b] font-mono font-bold text-xl">
              {formatCurrency(results.totalSavingsYear1)}
            </p>
            <p className="text-[#a0a0a0] text-xs font-inter-tight">(investment phase)</p>
          </div>
          
          <div>
            <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">Year 2</p>
            <p className="text-[#5ccfa2] font-mono font-bold text-xl">
              +{formatCurrency(results.totalSavingsYear2Plus)}
            </p>
            <p className="text-[#a0a0a0] text-xs font-inter-tight">(profitable)</p>
          </div>
          
          <div>
            <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">Year 3</p>
            <p className="text-[#5ccfa2] font-mono font-bold text-xl">
              +{formatCurrency(results.totalSavingsYear2Plus)}
            </p>
            <p className="text-[#a0a0a0] text-xs font-inter-tight">(profitable)</p>
          </div>
          
          <div>
            <p className="text-[#a0a0a0] text-xs font-inter-tight mb-1">3-Year Total</p>
            <p className={`font-mono font-bold text-xl ${threeYearTotal > 0 ? 'text-[#5ccfa2]' : 'text-[#ff6b6b]'}`}>
              {threeYearTotal > 0 ? '+' : ''}{formatCurrency(threeYearTotal)}
            </p>
          </div>
        </div>
        
        <p className="text-[#f5f5f5] font-inter-tight text-sm">
          Selected: {results.taskResults.map(t => t.taskName).join(', ')}
        </p>
      </div>
      
      {/* Divider */}
      <div className="border-t border-orange-800 my-6"></div>
      
      {/* Optimization Options */}
      <h3 className="font-mono text-orange-400 text-xl mb-4">
        ⚡ INSTANT ROI ALTERNATIVES:
      </h3>
      
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="bg-[#010112]/50 border border-gray-700 rounded-lg p-6 hover:border-[#5ccfa2] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-inter-tight text-[#f5f5f5] font-semibold text-lg mb-2">
                  {suggestion.title}
                </h4>
                <p className="text-[#a0a0a0] font-inter-tight text-sm mb-3">
                  {suggestion.description}
                </p>
                
                {/* Projected savings */}
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[#a0a0a0] text-xs font-inter-tight">Year 1 Savings</p>
                    <p className="text-[#5ccfa2] font-mono font-bold text-2xl">
                      +{formatCurrency(suggestion.projectedYear1Savings)}
                    </p>
                  </div>
                  {suggestion.savingsIncrease && (
                    <div className="text-[#5ccfa2] font-inter-tight text-sm">
                      ↑ {formatCurrency(suggestion.savingsIncrease)} improvement
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => onRecalculate(suggestion.newSelections)}
                className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto px-6 py-3 bg-[#5ccfa2] text-[#010112] rounded-lg font-mono font-semibold text-sm md:text-base
                        hover:bg-[#6ee0b3] transition-colors"
>
                {suggestion.buttonText}
              </button>
            </div>
          </div>
        ))}
        
        {/* Custom Strategy Option */}
        <div className="bg-[#010112]/50 border border-gray-700 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-inter-tight text-[#f5f5f5] font-semibold text-lg mb-2">
                Option {suggestions.length + 1}: Custom Package
              </h4>
              <p className="text-[#a0a0a0] font-inter-tight text-sm mb-3">
                Let our team design a solution tailored to your specific volume, budget, and timeline. 
                We'll find the optimal combination of automations for your business.
              </p>
            </div>
            
            <button
              onClick={onCustomStrategy}
              className="ml-4 px-6 py-3 bg-transparent border-2 border-[#5ccfa2] text-[#5ccfa2] rounded-lg font-mono font-semibold
                       hover:bg-[#5ccfa2] hover:text-[#010112] transition-colors whitespace-nowrap"
            >
              Custom Strategy
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom note */}
      <div className="mt-6 pt-6 border-t border-orange-800">
        <p className="text-[#a0a0a0] text-sm font-inter-tight">
          💡 <strong className="text-[#f5f5f5]">Pro Tip:</strong> Combining multiple automations 
          provides better economies of scale and faster ROI due to shared setup costs.
        </p>
      </div>
    </div>
  );
}

// Smart suggestion generator with REAL calculations
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
  
  // Helper to calculate savings for a set of selections
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
  
  // Current Year 1 savings (negative)
  const currentYear1Savings = calculateSavings(currentSelections);
  
  // Suggestion 1: Scale volume (3x current)
  if (currentSelections.length === 1) {
    const scaledSelections = currentSelections.map(sel => ({
      ...sel,
      volume: Math.ceil(sel.volume * 3)
    }));
    
    const scaledSavings = calculateSavings(scaledSelections);
    const task = TASKS.find(t => t.id === currentSelections[0].taskId);
    
    if (scaledSavings > 0 && task) {
      suggestions.push({
        title: `Option 1: Scale Your Volume`,
        description: `Increase from ${currentSelections[0].volume} to ${scaledSelections[0].volume} ${task.name.toLowerCase()} per month. Higher volume spreads setup costs more efficiently.`,
        projectedYear1Savings: scaledSavings,
        savingsIncrease: scaledSavings - currentYear1Savings,
        buttonText: 'Recalculate',
        newSelections: scaledSelections
      });
    }
  }
  
  // Suggestion 2: Add complementary high-value automation
  const unselectedTasks = TASKS.filter(
    t => !currentSelections.find(s => s.taskId === t.id)
  );
  
  // Find high-value complementary tasks
  const complementaryTasks = unselectedTasks.filter(t => 
    ['social-content-gen', 'lead-prospecting', 'seo-articles'].includes(t.id)
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
        description: `Combine your current selection with ${bestComplement.name} (${bestComplement.suggestedVolume}/month). Shared overhead and setup costs dramatically improve ROI.`,
        projectedYear1Savings: combinedSavings,
        savingsIncrease: combinedSavings - currentYear1Savings,
        buttonText: 'See Package',
        newSelections: combinedSelections
      });
    }
  }
  
  // Suggestion 3: Popular high-ROI package
  const popularPackage: TaskSelection[] = [
    { taskId: 'lead-prospecting', volume: 80 },
    { taskId: 'social-content-gen', volume: 20 },
    { taskId: 'email-campaigns', volume: 30 }
  ];
  
  const packageSavings = calculateSavings(popularPackage);
  
  if (packageSavings > 0 && currentSelections.length < 3) {
    suggestions.push({
      title: `Option ${suggestions.length + 1}: Popular Starter Package`,
      description: `Our most popular combination for ${industry} businesses: Lead Prospecting (80/mo) + Social Media (20/mo) + Email Campaigns (30/mo). Proven ROI.`,
      projectedYear1Savings: packageSavings,
      savingsIncrease: packageSavings - currentYear1Savings,
      buttonText: 'Try Package',
      newSelections: popularPackage
    });
  }
  
  return suggestions.filter(s => s.projectedYear1Savings > 0).slice(0, 3);
}