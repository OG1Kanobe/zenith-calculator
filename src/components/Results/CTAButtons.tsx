'use client';

interface CTAButtonsProps {
  onSendReport: () => void;
  onCustomAudit: () => void;
}

export default function CTAButtons({ onSendReport, onCustomAudit }: CTAButtonsProps) {
  return (
    <div className="mt-8 mb-12">
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <p className="font-inter-tight text-[#f5f5f5] text-center mb-6">
          Ready to transform your business with AI automation?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Send Report Button */}
          <button
            onClick={onSendReport}
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
<div className="mt-6">
  <p className="text-[#a0a0a0] text-xs font-inter-tight text-center">
    * Zenith pricing includes setup, monthly optimization, and estimated AI usage costs based on 
    current API rates and your specified volume. Actual AI costs may vary slightly based on usage complexity. 
    No hidden fees.
    <br /><br />
    ** All time savings, cost reductions, and ROI projections are estimates based on your inputs and 
    industry-standard benchmarks. Actual results may vary depending on implementation, workflow complexity, 
    and usage patterns.
  </p>
</div>
    </div>
  );
}