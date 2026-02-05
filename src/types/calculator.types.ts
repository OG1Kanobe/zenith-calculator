export interface Task {
  id: string;
  category: 'Sales' | 'Marketing' | 'Support' | 'Ops' | 'HR';
  name: string;
  humanTimeMinutes: number;
  humanCostPerHour: number;
  annualSalary: number;
  zenithSetupFee: number;
  zenithMonthlyFee: number;
  aiRunCost: number;
  suggestedVolume: number;
  typicalVolumeRange: string;
}

export interface TaskSelection {
  taskId: string;
  volume: number;
}

export type Industry = 
  | 'Legal' 
  | 'Healthcare' 
  | 'Financial Services' 
  | 'Professional Services' 
  | 'Technology' 
  | 'Real Estate' 
  | 'Other';

export type CalculationMethod = 'hourly' | 'salary'; // NEW

export interface IndustryMultiplier {
  industry: Industry;
  multiplier: number;
  description: string;
}

export interface CalculationResult {
  taskId: string;
  taskName: string;
  volume: number;
  annualManualCost: number;
  zenithYear1Cost: number;
  zenithYear2PlusCost: number;
  savingsYear1: number;
  savingsYear2Plus: number;
  roiYear1: number;
  annualHoursSaved: number;
  workingDaysSaved: number;
  breakevenMonth: number;
  aiCostDisclaimer: string;
}

export interface TotalResults {
  totalAnnualManualCost: number;
  totalZenithYear1Cost: number;
  totalZenithYear2PlusCost: number;
  totalSavingsYear1: number;
  totalSavingsYear2Plus: number;
  totalAnnualHours: number;
  totalWorkingDays: number;
  overallROI: number;
  costReductionPercentage: number;
  taskResults: CalculationResult[];
}