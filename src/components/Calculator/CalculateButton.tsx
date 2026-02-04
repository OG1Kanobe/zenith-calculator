'use client';

interface CalculateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function CalculateButton({ onClick, disabled = false }: CalculateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full px-8 py-4 rounded-lg font-mono text-lg font-bold
        transition-all duration-200
        ${disabled 
          ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
          : 'bg-[#5ccfa2] text-[#010112] hover:bg-[#6ee0b3] hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
        }
      `}
    >
      {disabled ? 'Select at least one task' : 'Calculate My Savings'}
    </button>
  );
}
