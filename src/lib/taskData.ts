import { Task } from '@/types/calculator.types';

export const TASKS: Task[] = [
  // SALES
  {
    id: 'lead-prospecting',
    category: 'Sales',
    name: 'Lead Prospecting',
    humanTimeMinutes: 15,
    humanCostPerHour: 150, // R120-180k salary = ~R70/hr effective
    annualSalary: 135000, // Junior Sales Rep: R9.5k/month avg (Indeed, PayScale)
    zenithSetupFee: 25000,
    zenithMonthlyFee: 1500,
    aiRunCost: 2.5,
    suggestedVolume: 80,
    typicalVolumeRange: '50-200',
  },
  {
    id: 'appointment-setting',
    category: 'Sales',
    name: 'Appointment Setting',
    humanTimeMinutes: 20,
    humanCostPerHour: 140, // Similar to prospecting role
    annualSalary: 120000, // Inside Sales Coordinator: R10k/month (PayScale R120k)
    zenithSetupFee: 20000,
    zenithMonthlyFee: 1200,
    aiRunCost: 1.8,
    suggestedVolume: 40,
    typicalVolumeRange: '20-100',
  },
  {
    id: 'email-campaigns',
    category: 'Marketing',
    name: 'Email Campaigns',
    humanTimeMinutes: 45,
    humanCostPerHour: 180, // Marketing Coordinator mid-level
    annualSalary: 200000, // Marketing Coordinator: R16-18k/month
    zenithSetupFee: 15000,
    zenithMonthlyFee: 800,
    aiRunCost: 1.2,
    suggestedVolume: 12,
    typicalVolumeRange: '4-20',
  },
  {
    id: 'social-content-gen',
    category: 'Marketing',
    name: 'Social Media Content',
    humanTimeMinutes: 30,
    humanCostPerHour: 170, // Social Media Manager
    annualSalary: 180000, // Social Media Manager: R13-16k/month (Indeed R16k, PayScale R176k avg but entry R130k)
    zenithSetupFee: 18000,
    zenithMonthlyFee: 900,
    aiRunCost: 0.8,
    suggestedVolume: 20,
    typicalVolumeRange: '15-60',
  },
  {
    id: 'seo-articles',
    category: 'Marketing',
    name: 'SEO Blog Articles',
    humanTimeMinutes: 120,
    humanCostPerHour: 190, // Content Writer/Copywriter
    annualSalary: 220000, // Content Writer/Copywriter: R18k/month avg (Indeed R18k, Glassdoor R18-21k)
    zenithSetupFee: 20000,
    zenithMonthlyFee: 1000,
    aiRunCost: 3.5,
    suggestedVolume: 8,
    typicalVolumeRange: '4-15',
  },
  {
    id: 'level-1-support',
    category: 'Support',
    name: 'Level 1 Support',
    humanTimeMinutes: 30,
    humanCostPerHour: 110, // Customer Support Agent
    annualSalary: 110000, // Support Agent: R8.5-10k/month (Indeed R8.5k, PayScale R125k, Glassdoor R8-10k)
    zenithSetupFee: 30000,
    zenithMonthlyFee: 2000,
    aiRunCost: 0.5,
    suggestedVolume: 100,
    typicalVolumeRange: '50-300',
  },
  {
    id: 'invoice-processing',
    category: 'Ops',
    name: 'Invoice Processing',
    humanTimeMinutes: 10,
    humanCostPerHour: 130, // Accounts Clerk
    annualSalary: 140000, // Accounts/Admin Clerk: R11-12k/month
    zenithSetupFee: 12000,
    zenithMonthlyFee: 600,
    aiRunCost: 0.3,
    suggestedVolume: 100,
    typicalVolumeRange: '50-500',
  },
  {
    id: 'nda-legal-review',
    category: 'Ops',
    name: 'NDA/Legal Review',
    humanTimeMinutes: 60,
    humanCostPerHour: 450, // Junior Legal Counsel/Paralegal (still specialized)
    annualSalary: 420000, // Junior Legal: R30-35k/month (legal remains higher)
    zenithSetupFee: 35000,
    zenithMonthlyFee: 2500,
    aiRunCost: 5.0,
    suggestedVolume: 15,
    typicalVolumeRange: '5-30',
  },
  {
    id: 'resume-screening',
    category: 'HR',
    name: 'Resume Screening',
    humanTimeMinutes: 15,
    humanCostPerHour: 145, // HR Coordinator
    annualSalary: 150000, // HR Coordinator: R12-13k/month
    zenithSetupFee: 18000,
    zenithMonthlyFee: 900,
    aiRunCost: 0.4,
    suggestedVolume: 50,
    typicalVolumeRange: '20-150',
  },
  {
    id: 'client-onboarding',
    category: 'Ops',
    name: 'Client Onboarding',
    humanTimeMinutes: 90,
    humanCostPerHour: 200, // Client Success/Account Manager
    annualSalary: 240000, // Client Success Manager: R18-20k/month
    zenithSetupFee: 28000,
    zenithMonthlyFee: 1800,
    aiRunCost: 2.0,
    suggestedVolume: 10,
    typicalVolumeRange: '5-25',
  },
  {
    id: 'rfp-tender-draft',
    category: 'Sales',
    name: 'RFP/Tender Drafting',
    humanTimeMinutes: 180,
    humanCostPerHour: 280, // Proposals Manager (specialized but not exec)
    annualSalary: 320000, // Proposals/Tender Manager: R25-28k/month
    zenithSetupFee: 40000,
    zenithMonthlyFee: 3000,
    aiRunCost: 8.0,
    suggestedVolume: 5,
    typicalVolumeRange: '2-15',
  },
];

export const getTaskById = (taskId: string): Task | undefined => {
  return TASKS.find(task => task.id === taskId);
};

export const getTasksByCategory = (category: Task['category']): Task[] => {
  return TASKS.filter(task => task.category === category);
};

export const TASK_CATEGORIES: Task['category'][] = ['Sales', 'Marketing', 'Support', 'Ops', 'HR'];