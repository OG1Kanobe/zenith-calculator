import { TaskSelection, Industry, CalculationResult, TotalResults, CalculationMethod } from '@/types/calculator.types';
import { getTaskById } from './taskData';
import { getIndustryMultiplier } from './industryData';

const OVERHEAD_MULTIPLIER = 1.2; // Management, office space, taxes, benefits
const ANNUAL_WORKING_HOURS = 2080; // 40 hours/week × 52 weeks

/**
 * Calculate annual manual cost for selected tasks
 */
export function calculateManualCost(
  selections: TaskSelection[], 
  industry: Industry,
  calculationMethod: CalculationMethod = 'salary'
): number {
  const industryMultiplier = getIndustryMultiplier(industry);
  
  return selections.reduce((total, selection) => {
    const task = getTaskById(selection.taskId);
    if (!task) return total;
    
    const humanTimeInHours = task.humanTimeMinutes / 60;
    
    let effectiveHourlyRate: number;
    
    if (calculationMethod === 'salary') {
      // Salary-based: Annual salary ÷ 2080 working hours, then apply industry multiplier
      const baseHourlyFromSalary = task.annualSalary / ANNUAL_WORKING_HOURS;
      effectiveHourlyRate = baseHourlyFromSalary * industryMultiplier;
    } else {
      // Hourly-based: Use hourly rate + overhead + industry multiplier
      effectiveHourlyRate = task.humanCostPerHour * OVERHEAD_MULTIPLIER * industryMultiplier;
    }
    
    const monthlyManualCost = selection.volume * humanTimeInHours * effectiveHourlyRate;
    const annualManualCost = monthlyManualCost * 12;
    
    return total + annualManualCost;
  }, 0);
}

/**
 * Calculate total hours saved across all tasks
 */
export function calculateTotalHours(selections: TaskSelection[]): number {
  return selections.reduce((total, selection) => {
    const task = getTaskById(selection.taskId);
    if (!task) return total;
    
    const humanTimeInHours = task.humanTimeMinutes / 60;
    const annualHours = selection.volume * humanTimeInHours * 12;
    
    return total + annualHours;
  }, 0);
}

/**
 * Calculate detailed results for a single task
 */
export function calculateTaskResult(
  selection: TaskSelection, 
  industry: Industry,
  calculationMethod: CalculationMethod = 'salary'
): CalculationResult | null {
  const task = getTaskById(selection.taskId);
  if (!task) return null;
  
  const industryMultiplier = getIndustryMultiplier(industry);
  
  // Manual cost calculation
  const humanTimeInHours = task.humanTimeMinutes / 60;
  
  let effectiveHourlyRate: number;
  
  if (calculationMethod === 'salary') {
    const baseHourlyFromSalary = task.annualSalary / ANNUAL_WORKING_HOURS;
    effectiveHourlyRate = baseHourlyFromSalary * industryMultiplier;
  } else {
    effectiveHourlyRate = task.humanCostPerHour * OVERHEAD_MULTIPLIER * industryMultiplier;
  }
  
  const monthlyManualCost = selection.volume * humanTimeInHours * effectiveHourlyRate;
  const annualManualCost = monthlyManualCost * 12;
  
  // Zenith cost calculation
  const annualVolume = selection.volume * 12;
  const annualAIRunCost = annualVolume * task.aiRunCost;
  const zenithYear1Cost = task.zenithSetupFee + (task.zenithMonthlyFee * 12) + annualAIRunCost;
  const zenithYear2PlusCost = (task.zenithMonthlyFee * 12) + annualAIRunCost;
  
  // Savings calculation
  const savingsYear1 = annualManualCost - zenithYear1Cost;
  const savingsYear2Plus = annualManualCost - zenithYear2PlusCost;
  
  // ROI calculation
  const roiYear1 = (savingsYear1 / zenithYear1Cost) * 100;
  
  // Time reclaimed
  const annualHoursSaved = selection.volume * humanTimeInHours * 12;
  const workingDaysSaved = annualHoursSaved / 8;
  
  // Breakeven month calculation
  const monthlySavings = (annualManualCost / 12) - task.zenithMonthlyFee - (selection.volume * task.aiRunCost);
  const breakevenMonth = monthlySavings > 0 ? Math.ceil(task.zenithSetupFee / monthlySavings) : Infinity;
  
  // Generate AI cost disclaimer
  const aiCostDisclaimer = generateAICostDisclaimer(task, selection.volume);
  
  return {
    taskId: task.id,
    taskName: task.name,
    volume: selection.volume,
    annualManualCost,
    zenithYear1Cost,
    zenithYear2PlusCost,
    savingsYear1,
    savingsYear2Plus,
    roiYear1,
    annualHoursSaved,
    workingDaysSaved,
    breakevenMonth,
    aiCostDisclaimer
  };
}

/**
 * Calculate total results for all selected tasks
 */
export function calculateTotalResults(
  selections: TaskSelection[], 
  industry: Industry,
  calculationMethod: CalculationMethod = 'salary'
): TotalResults | null {
  if (selections.length === 0) return null;
  
  const taskResults = selections
    .map(selection => calculateTaskResult(selection, industry, calculationMethod))
    .filter((result): result is CalculationResult => result !== null);
  
  const totalAnnualManualCost = taskResults.reduce((sum, r) => sum + r.annualManualCost, 0);
  const totalZenithYear1Cost = taskResults.reduce((sum, r) => sum + r.zenithYear1Cost, 0);
  const totalZenithYear2PlusCost = taskResults.reduce((sum, r) => sum + r.zenithYear2PlusCost, 0);
  const totalSavingsYear1 = totalAnnualManualCost - totalZenithYear1Cost;
  const totalSavingsYear2Plus = totalAnnualManualCost - totalZenithYear2PlusCost;
  const totalAnnualHours = taskResults.reduce((sum, r) => sum + r.annualHoursSaved, 0);
  const totalWorkingDays = totalAnnualHours / 8;
  const overallROI = (totalSavingsYear1 / totalZenithYear1Cost) * 100;
  const costReductionPercentage = (totalSavingsYear1 / totalAnnualManualCost) * 100;
  
  return {
    totalAnnualManualCost,
    totalZenithYear1Cost,
    totalZenithYear2PlusCost,
    totalSavingsYear1,
    totalSavingsYear2Plus,
    totalAnnualHours,
    totalWorkingDays,
    overallROI,
    costReductionPercentage,
    taskResults
  };
}

/**
 * Generate AI cost disclaimer based on task category
 */
function generateAICostDisclaimer(task: any, volume: number): string {
  const unit = getTaskUnit(task.category);
  const variance = getVariancePercentage(task.category);
  const factors = getVarianceFactors(task.category);
  const annualAICost = (task.aiRunCost * volume * 12).toFixed(2);
  
  return `AI costs estimated at R${task.aiRunCost} per ${unit} based on ${volume} ${unit}s/month. Actual costs may vary ±${variance}% based on ${factors}.`;
}

function getTaskUnit(category: string): string {
  const units: Record<string, string> = {
    'Sales': 'lead',
    'Marketing': 'item',
    'Support': 'ticket',
    'Ops': 'document',
    'HR': 'CV'
  };
  return units[category] || 'item';
}

function getVariancePercentage(category: string): number {
  const variances: Record<string, number> = {
    'Sales': 10,
    'Marketing': 15,
    'Support': 10,
    'Ops': 20,
    'HR': 10
  };
  return variances[category] || 15;
}

function getVarianceFactors(category: string): string {
  const factors: Record<string, string> = {
    'Sales': 'lead complexity and data sources used',
    'Marketing': 'content length, image generation, and revisions',
    'Support': 'ticket complexity and response depth',
    'Ops': 'document complexity and processing requirements',
    'HR': 'CV length and analysis depth'
  };
  return factors[category] || 'usage complexity';
}

/**
 * Format currency (ZAR)
 */
export function formatCurrency(amount: number): string {
  return `R ${Math.round(amount).toLocaleString('en-ZA')}`;
}

/**
 * Format number with decimals
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}