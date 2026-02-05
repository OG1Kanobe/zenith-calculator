import { Task } from '@/types/calculator.types';

export const TASKS: Task[] = [
  // SALES
    {
      id: 'lead-prospecting',
      category: 'Sales',
      name: 'Lead Prospecting',
      humanTimeMinutes: 15,
      humanCostPerHour: 350, // Keep for hourly mode
      annualSalary: 300000, // NEW: Junior Sales Rep salary
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
      humanCostPerHour: 300,
      annualSalary: 280000, // NEW: Sales Coordinator salary
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
      humanCostPerHour: 400,
      annualSalary: 350000, // NEW: Marketing Coordinator salary
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
      humanCostPerHour: 350,
      annualSalary: 320000, // NEW: Social Media Manager salary
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
      humanCostPerHour: 400,
      annualSalary: 380000, // NEW: Content Writer salary
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
      humanCostPerHour: 250,
      annualSalary: 240000, // NEW: Support Agent salary
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
      humanCostPerHour: 280,
      annualSalary: 260000, // NEW: Accounts Clerk salary
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
      humanCostPerHour: 800,
      annualSalary: 650000, // NEW: Junior Legal Counsel salary
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
      humanCostPerHour: 320,
      annualSalary: 300000, // NEW: HR Coordinator salary
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
      humanCostPerHour: 400,
      annualSalary: 380000, // NEW: Client Success Manager salary
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
      humanCostPerHour: 600,
      annualSalary: 550000, // NEW: Proposals Manager salary
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
