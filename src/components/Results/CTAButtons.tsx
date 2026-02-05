'use client';

import { useState } from 'react';
import { generateResultsPDFBase64 } from '@/lib/pdfGenerator';
import { TotalResults, TaskSelection, Industry } from '@/types/calculator.types';
import SendReportModal from './SendReportModal';
import { uploadPDFToCloudinary } from '@/lib/cloudinaryUpload';

interface CTAButtonsProps {
  targetElementId: string;
  results: TotalResults;
  selectedTasks: TaskSelection[];
  industry: Industry;
  webhookUrl: string;
  onCustomAudit: () => void;
}

export default function CTAButtons({ 
  targetElementId,
  results,
  selectedTasks,
  industry,
  webhookUrl,
  onCustomAudit 
}: CTAButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (name: string, email: string) => {
    try {
      // Just send data - no PDF generation!
      const payload = {
        name,
        email,
        industry,
        calculatorData: {
          totalSavingsYear1: results.totalSavingsYear1,
          totalSavingsYear2Plus: results.totalSavingsYear2Plus,
          totalAnnualHours: results.totalAnnualHours,
          totalWorkingDays: results.totalWorkingDays,
          overallROI: results.overallROI,
          costReductionPercentage: results.costReductionPercentage,
          threeYearTotal: results.totalSavingsYear1 + (results.totalSavingsYear2Plus * 2),
          tasks: results.taskResults.map(task => ({
            taskName: task.taskName,
            volume: task.volume,
            savingsYear1: task.savingsYear1,
            annualHoursSaved: task.annualHoursSaved,
            annualManualCost: task.annualManualCost,
            zenithYear1Cost: task.zenithYear1Cost,
          })),
        },
        timestamp: new Date().toISOString(),
      };
  
      // Send to n8n
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Webhook request failed');
      }
  
      // Show success
      setIsModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
  
    } catch (error) {
      console.error('Error sending report:', error);
      throw error;
    }
  };

  return (
    <>
      <div className="mt-8 mb-12">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <p className="font-inter-tight text-[#f5f5f5] text-center mb-6">
          Get your personalized PDF report with detailed calculation breakdowns, 
  step-by-step math, and optimization recommendations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Send Report Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-4 bg-transparent border-2 border-[#5ccfa2] text-[#5ccfa2] 
                       rounded-lg font-mono font-semibold
                       hover:bg-[#5ccfa2] hover:text-[#010112] 
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                       flex items-center justify-center gap-2"
            >
              <span>📧</span>
              <span>Send Me This Report</span>
            </button>
            
            {/* Custom Audit Button */}
            <button
              onClick={() => window.open('https://cal.com/taahir/ai', '_blank', 'noopener,noreferrer')}
              className="px-6 py-4 bg-[#5ccfa2] text-[#010112] 
                      rounded-lg font-mono font-semibold
                      hover:bg-[#6ee0b3] 
                      transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                      flex items-center justify-center gap-2"
            >
              <span>📊</span>
              <span>Get Custom Audit</span>
            </button>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-6 space-y-2">
          <p className="text-[#a0a0a0] text-xs font-inter-tight text-center">
            * Zenith Digital's pricing includes setup, monthly optimization, and estimated AI usage costs based on 
            current API rates and your specified volume. Actual costs may vary slightly based on usage complexity. 
            No hidden fees.
          </p>
          <p className="text-[#a0a0a0] text-xs font-inter-tight text-center">
            ** All time savings, cost reductions, and ROI projections are estimates based on your inputs and 
            industry-standard benchmarks. Actual results may vary depending on implementation, workflow complexity, 
            and usage patterns.
          </p>
        </div>
      </div>

      {/* Modal */}
      <SendReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#5ccfa2] text-[#010112] 
                       px-6 py-4 rounded-lg shadow-2xl
                       animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <div>
              <p className="font-mono font-bold">Your Report is On the Way!</p>
              <p className="font-inter-tight text-sm">Check your email inbox in a few.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}