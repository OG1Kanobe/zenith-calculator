import { Industry, IndustryMultiplier } from '@/types/calculator.types';

export const INDUSTRY_MULTIPLIERS: IndustryMultiplier[] = [
  {
    industry: 'Legal',
    multiplier: 2.0,
    description: 'Partners, attorneys, compliance'
  },
  {
    industry: 'Healthcare',
    multiplier: 1.8,
    description: 'Medical, dental, specialists'
  },
  {
    industry: 'Financial Services',
    multiplier: 1.7,
    description: 'Banking, accounting, insurance'
  },
  {
    industry: 'Professional Services',
    multiplier: 1.5,
    description: 'Consulting, engineering, architecture'
  },
  {
    industry: 'Technology',
    multiplier: 1.2,
    description: 'SaaS, IT services, development'
  },
  {
    industry: 'Real Estate',
    multiplier: 1.3,
    description: 'Commercial, residential, property management'
  },
  {
    industry: 'Other',
    multiplier: 1.0,
    description: 'General business'
  }
];

export const getIndustryMultiplier = (industry: Industry): number => {
  const found = INDUSTRY_MULTIPLIERS.find(im => im.industry === industry);
  return found?.multiplier ?? 1.0;
};

export const getIndustryDescription = (industry: Industry): string => {
  const found = INDUSTRY_MULTIPLIERS.find(im => im.industry === industry);
  return found?.description ?? '';
};
