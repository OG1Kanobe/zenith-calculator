'use client';

import { useState } from 'react';

interface SendReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => Promise<void>;
}

export default function SendReportModal({ isOpen, onClose, onSubmit }: SendReportModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(name.trim(), email.trim());
      // Reset form
      setName('');
      setEmail('');
    } catch (err) {
      setError('Failed to send report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#010112] border-2 border-[#5ccfa2] rounded-xl p-6 md:p-8 max-w-md w-full">
        <h2 className="font-mono text-[#5ccfa2] text-2xl mb-4">
          Get Your Report
        </h2>
        
        <p className="text-[#f5f5f5] font-inter-tight text-sm mb-6">
          Enter your details and we'll email you a comprehensive PDF report of your potential savings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-[#f5f5f5] font-inter-tight text-sm mb-2">
              Name *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg 
                       text-[#f5f5f5] font-inter-tight
                       focus:outline-none focus:border-[#5ccfa2] transition-colors"
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[#f5f5f5] font-inter-tight text-sm mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg 
                       text-[#f5f5f5] font-inter-tight
                       focus:outline-none focus:border-[#5ccfa2] transition-colors"
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm font-inter-tight">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-transparent border-2 border-gray-700 text-[#f5f5f5] 
                       rounded-lg font-mono font-semibold text-sm
                       hover:border-gray-600 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#5ccfa2] text-[#010112] rounded-lg 
                       font-mono font-semibold text-sm
                       hover:bg-[#6ee0b3] transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Report'
              )}
            </button>
          </div>
        </form>

        <p className="text-[#a0a0a0] text-xs font-inter-tight mt-4 text-center">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );
}