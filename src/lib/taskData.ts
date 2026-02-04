import { Task } from '@/types/calculator.types';

export const TASKS: Task[] = [
  // SALES
  {
    id: 'lead-prospecting',
    category: 'Sales',
    name: 'Lead Prospecting',
    humanTimeMinutes: 15,
    humanCostPerHour: 350,
    zenithSetupFee: 25000,
    zenithMonthlyFee: 4500,
    aiRunCost: 0.15,
    suggestedVolume: 50,
    typicalVolumeRange: '30-100'
  },
  {
    id: 'appointment-setting',
    category: 'Sales',
    name: 'Appointment Setting',
    humanTimeMinutes: 20,
    humanCostPerHour: 250,
    zenithSetupFee: 15000,
    zenithMonthlyFee: 3500,
    aiRunCost: 0.10,
    suggestedVolume: 40,
    typicalVolumeRange: '20-80'
  },
  {
    id: 'rfp-tender-draft',
    category: 'Sales',
    name: 'RFP/Tender Draft',
    humanTimeMinutes: 300, // 5 hours
    humanCostPerHour: 650,
    zenithSetupFee: 45000,
    zenithMonthlyFee: 8000,
    aiRunCost: 5.00,
    suggestedVolume: 5,
    typicalVolumeRange: '3-10'
  },
  
  // MARKETING
  {
    id: 'social-content-gen',
    category: 'Marketing',
    name: 'Social Content Generation',
    humanTimeMinutes: 180, // 3 hours
    humanCostPerHour: 450,
    zenithSetupFee: 35000,
    zenithMonthlyFee: 7500,
    aiRunCost: 6.50,
    suggestedVolume: 20,
    typicalVolumeRange: '15-40'
  },
  {
    id: 'email-campaigns',
    category: 'Marketing',
    name: 'Email Campaigns',
    humanTimeMinutes: 45,
    humanCostPerHour: 400,
    zenithSetupFee: 15000,
    zenithMonthlyFee: 4000,
    aiRunCost: 0.05,
    suggestedVolume: 30,
    typicalVolumeRange: '20-60'
  },
  {
    id: 'seo-articles',
    category: 'Marketing',
    name: 'SEO Articles',
    humanTimeMinutes: 240, // 4 hours
    humanCostPerHour: 550,
    zenithSetupFee: 20000,
    zenithMonthlyFee: 4500,
    aiRunCost: 1.50,
    suggestedVolume: 10,
    typicalVolumeRange: '5-20'
  },
  
  // SUPPORT
  {
    id: 'level-1-support',
    category: 'Support',
    name: 'Level 1 Support',
    humanTimeMinutes: 15,
    humanCostPerHour: 180,
    zenithSetupFee: 35000,
    zenithMonthlyFee: 6500,
    aiRunCost: 0.20,
    suggestedVolume: 100,
    typicalVolumeRange: '50-200'
  },
  {
    id: 'client-onboarding',
    category: 'Support',
    name: 'Client Onboarding',
    humanTimeMinutes: 120, // 2 hours
    humanCostPerHour: 450,
    zenithSetupFee: 25000,
    zenithMonthlyFee: 5000,
    aiRunCost: 1.00,
    suggestedVolume: 15,
    typicalVolumeRange: '10-30'
  },
  
  // OPS
  {
    id: 'invoice-processing',
    category: 'Ops',
    name: 'Invoice Processing',
    humanTimeMinutes: 10,
    humanCostPerHour: 250,
    zenithSetupFee: 25000,
    zenithMonthlyFee: 5500,
    aiRunCost: 0.50,
    suggestedVolume: 80,
    typicalVolumeRange: '40-150'
  },
  {
    id: 'nda-legal-review',
    category: 'Ops',
    name: 'NDA/Legal Review',
    humanTimeMinutes: 60, // 1 hour
    humanCostPerHour: 1500,
    zenithSetupFee: 55000,
    zenithMonthlyFee: 12500,
    aiRunCost: 4.50,
    suggestedVolume: 8,
    typicalVolumeRange: '5-15'
  },
  
  // HR
  {
    id: 'resume-screening',
    category: 'HR',
    name: 'Resume Screening',
    humanTimeMinutes: 20,
    humanCostPerHour: 350,
    zenithSetupFee: 20000,
    zenithMonthlyFee: 4000,
    aiRunCost: 0.25,
    suggestedVolume: 60,
    typicalVolumeRange: '30-120'
  }
];

export const getTaskById = (taskId: string): Task | undefined => {
  return TASKS.find(task => task.id === taskId);
};

export const getTasksByCategory = (category: Task['category']): Task[] => {
  return TASKS.filter(task => task.category === category);
};

export const TASK_CATEGORIES: Task['category'][] = ['Sales', 'Marketing', 'Support', 'Ops', 'HR'];
