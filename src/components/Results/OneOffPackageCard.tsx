'use client';

interface OneOffPackageCardProps {
  onBookConsultation: () => void;
}

export default function OneOffPackageCard({ onBookConsultation }: OneOffPackageCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#5ccfa2]/20 to-[#5ccfa2]/5 border-2 border-[#5ccfa2] rounded-lg p-8 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">💡</span>
        <div>
          <h3 className="font-inter-tight text-[#5ccfa2] text-2xl font-bold mb-2">
            RECOMMENDED: One-Off Implementation
          </h3>
          <p className="font-inter-tight text-[#f5f5f5] text-lg">
            We build it. You own it. No ongoing fees.
          </p>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
        <h4 className="font-inter-tight text-[#f5f5f5] font-semibold mb-4">
          What You Get:
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 font-inter-tight text-[#f5f5f5] text-sm">
            <span className="text-[#5ccfa2] mt-0.5">✓</span>
            <span>Complete automation setup tailored to your workflow</span>
          </li>
          <li className="flex items-start gap-3 font-inter-tight text-[#f5f5f5] text-sm">
            <span className="text-[#5ccfa2] mt-0.5">✓</span>
            <span>Full documentation and technical handover</span>
          </li>
          <li className="flex items-start gap-3 font-inter-tight text-[#f5f5f5] text-sm">
            <span className="text-[#5ccfa2] mt-0.5">✓</span>
            <span>Training session for your team</span>
          </li>
          <li className="flex items-start gap-3 font-inter-tight text-[#f5f5f5] text-sm">
            <span className="text-[#5ccfa2] mt-0.5">✓</span>
            <span>30-day support window post-delivery</span>
          </li>
          <li className="flex items-start gap-3 font-inter-tight text-[#f5f5f5] text-sm">
            <span className="text-[#5ccfa2] mt-0.5">✓</span>
            <span>You manage ongoing costs (AI usage only - typically R50-500/month)</span>
          </li>
        </ul>
      </div>

      <div className="bg-gray-900/70 rounded-lg p-6 mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-inter-tight text-[#5ccfa2] text-4xl font-bold">R8,000 - R15,000+</span>
          <span className="font-inter-tight text-[#a0a0a0] text-sm">once-off</span>
        </div>
        <p className="font-inter-tight text-[#a0a0a0] text-xs">
          Final price depends on complexity and number of automations. Any additional optimization work will be billed separately unless otherwise agreed upon.
        </p>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-5 mb-6">
        <h4 className="font-inter-tight text-[#f5f5f5] font-semibold mb-3">
          This works best for:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-[#5ccfa2]">•</span>
            <span className="font-inter-tight text-[#a0a0a0] text-sm">Lower volume operations</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#5ccfa2]">•</span>
            <span className="font-inter-tight text-[#a0a0a0] text-sm">Teams with technical capability</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#5ccfa2]">•</span>
            <span className="font-inter-tight text-[#a0a0a0] text-sm">Businesses wanting full control</span>
          </div>
        </div>
      </div>

      <button
  onClick={() => window.open('https://cal.com/taahir/ai', '_blank', 'noopener,noreferrer')}
  className="w-full bg-[#5ccfa2] hover:bg-[#6ee0b3] text-[#010112] font-mono font-bold py-4 px-6 rounded-lg transition-colors text-lg"
>
  Book Free Consultation →
</button>
    </div>
  );
}