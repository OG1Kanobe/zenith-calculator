'use client';

import { useState } from 'react';
import { generateResultsPDFBase64 } from '@/lib/pdfGenerator';
import { TotalResults, TaskSelection, Industry } from '@/types/calculator.types';
import SendReportModal from './SendReportModal';

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
      // 1. Generate PDF as base64
      const pdfBase64 = await generateResultsPDFBase64(targetElementId);
      
      if (!pdfBase64) {
        throw new Error('Failed to generate PDF');
      }

      // 2. Prepare payload for n8n
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
          tasks: selectedTasks,
        },
        pdfBase64,
        timestamp: new Date().toISOString(),
      };

      // 3. Send to n8n webhook
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

      // 4. Show success message
      setIsModalOpen(false);
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (error) {
      console.error('Error sending report:', error);
      throw error; // Re-throw to let modal handle it
    }
  };

  return (
    <>
      <div className="mt-8 mb-12">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <p className="font-inter-tight text-[#f5f5f5] text-center mb-6">
            Ready to transform your business with AI automation?
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
              onClick={onCustomAudit}
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
            * Zenith pricing includes setup, monthly optimization, and estimated AI usage costs based on 
            current API rates and your specified volume. Actual AI costs may vary slightly based on usage complexity. 
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
              <p className="font-mono font-bold">Report Sent!</p>
              <p className="font-inter-tight text-sm">Check your email inbox.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}