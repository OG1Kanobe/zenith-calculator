'use client';

import { useState } from 'react';
import { Task, TaskSelection } from '@/types/calculator.types';
import { TASKS, TASK_CATEGORIES } from '@/lib/taskData';

interface TaskSelectorProps {
  selections: TaskSelection[];
  onChange: (selections: TaskSelection[]) => void;
}

export default function TaskSelector({ selections, onChange }: TaskSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Sales', 'Marketing']);
  
  // NEW: Track input values as strings (allows empty state)
  const [volumeInputs, setVolumeInputs] = useState<Record<string, string>>({});
  const [rateInputs, setRateInputs] = useState<Record<string, string>>({});

  const handleTaskToggle = (taskId: string) => {
    const isSelected = selections.some(s => s.taskId === taskId);
    
    if (isSelected) {
      onChange(selections.filter(s => s.taskId !== taskId));
      // Clean up input state
      const newVolumeInputs = { ...volumeInputs };
      const newRateInputs = { ...rateInputs };
      delete newVolumeInputs[taskId];
      delete newRateInputs[taskId];
      setVolumeInputs(newVolumeInputs);
      setRateInputs(newRateInputs);
    } else {
      const task = TASKS.find(t => t.id === taskId);
      const suggestedVolume = task?.suggestedVolume || 10;
      onChange([...selections, { 
        taskId, 
        volume: suggestedVolume
      }]);
      // Initialize with suggested value
      setVolumeInputs({ ...volumeInputs, [taskId]: suggestedVolume.toString() });
    }
  };

  const handleVolumeChange = (taskId: string, value: string) => {
    setVolumeInputs({ ...volumeInputs, [taskId]: value });
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      onChange(selections.map(s => 
        s.taskId === taskId ? { ...s, volume: numValue } : s
      ));
    }
  };

  const handleVolumeBlur = (taskId: string) => {
    const value = volumeInputs[taskId];
    const task = TASKS.find(t => t.id === taskId);
    const suggestedVolume = task?.suggestedVolume || 10;
    
    if (!value || parseInt(value) <= 0) {
      // Reset to suggested volume if empty/invalid
      setVolumeInputs({ ...volumeInputs, [taskId]: suggestedVolume.toString() });
      onChange(selections.map(s => 
        s.taskId === taskId ? { ...s, volume: suggestedVolume } : s
      ));
    }
  };

  const handleCustomRateChange = (taskId: string, rate: number | undefined) => {
    onChange(selections.map(s => 
      s.taskId === taskId ? { ...s, customHourlyRate: rate } : s
    ));
    
    if (rate === undefined) {
      // Remove from rate inputs when unchecked
      const newRateInputs = { ...rateInputs };
      delete newRateInputs[taskId];
      setRateInputs(newRateInputs);
    }
  };

  const handleRateInputChange = (taskId: string, value: string) => {
    setRateInputs({ ...rateInputs, [taskId]: value });
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 50) {
      onChange(selections.map(s => 
        s.taskId === taskId ? { ...s, customHourlyRate: numValue } : s
      ));
    }
  };

  const handleRateBlur = (taskId: string) => {
    const value = rateInputs[taskId];
    const task = TASKS.find(t => t.id === taskId);
    const defaultRate = task?.humanCostPerHour || 150;
    
    if (!value || parseInt(value) < 50) {
      // Reset to default rate if empty/invalid
      setRateInputs({ ...rateInputs, [taskId]: defaultRate.toString() });
      onChange(selections.map(s => 
        s.taskId === taskId ? { ...s, customHourlyRate: defaultRate } : s
      ));
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-4">
      {TASK_CATEGORIES.map(category => {
        const tasks = TASKS.filter(t => t.category === category);
        const isExpanded = expandedCategories.includes(category);

        return (
          <div key={category} className="border border-gray-700 rounded-lg bg-gray-900/50">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
            >
              <span className="font-inter-tight text-[#f5f5f5] font-semibold">{category}</span>
              <span className="text-[#a0a0a0]">{isExpanded ? '▼' : '▶'}</span>
            </button>

            {/* Tasks List */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-3">
                {tasks.map(task => {
                  const selection = selections.find(s => s.taskId === task.id);
                  const isSelected = !!selection;
                  const hasCustomRate = selection?.customHourlyRate !== undefined;

                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-[#5ccfa2] bg-[#5ccfa2]/10'
                          : 'border-gray-700 bg-gray-800/30'
                      }`}
                    >
                      {/* Task Header */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleTaskToggle(task.id)}
                          className="mt-1 w-5 h-5 rounded border-gray-600 text-[#5ccfa2] focus:ring-[#5ccfa2]"
                        />
                        <div className="flex-1">
                          <p className="font-inter-tight text-[#f5f5f5] font-semibold mb-1">
                            {task.name}
                          </p>
                          <p className="font-inter-tight text-[#a0a0a0] text-xs">
                            Avg time: {task.humanTimeMinutes} min per task. Default rate: R{task.humanCostPerHour}/hour. Typical volume: {task.typicalVolumeRange}/month
                          </p>
                        </div>
                      </div>

                      {/* Volume Input */}
                      {isSelected && (
                        <div className="mt-4 space-y-3">
                          <div>
                            <label className="block font-inter-tight text-[#f5f5f5] text-sm mb-2">
                              Monthly Volume
                            </label>
                            <input
                              type="text"
                              value={volumeInputs[task.id] ?? selection.volume.toString()}
                              onChange={(e) => handleVolumeChange(task.id, e.target.value)}
                              onBlur={() => handleVolumeBlur(task.id)}
                              placeholder={task.suggestedVolume.toString()}
                              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                                       text-[#f5f5f5] placeholder:text-gray-500 focus:border-[#5ccfa2] focus:outline-none"
                            />
                          </div>

                          {/* Custom Hourly Rate Toggle */}
                          <div>
                            <label className="flex items-center gap-2 mb-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={hasCustomRate}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    const defaultRate = task.humanCostPerHour;
                                    handleCustomRateChange(task.id, defaultRate);
                                    setRateInputs({ ...rateInputs, [task.id]: defaultRate.toString() });
                                  } else {
                                    handleCustomRateChange(task.id, undefined);
                                  }
                                }}
                                className="w-4 h-4 rounded border-gray-600 text-[#5ccfa2] focus:ring-[#5ccfa2]"
                              />
                              <span className="font-inter-tight text-[#f5f5f5] text-sm">
                                Use custom hourly rate
                              </span>
                            </label>

                            {hasCustomRate && (
                              <div className="mt-2">
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a0a0a0]">
                                    R
                                  </span>
                                  <input
                                    type="text"
                                    value={rateInputs[task.id] ?? selection.customHourlyRate?.toString() ?? task.humanCostPerHour.toString()}
                                    onChange={(e) => handleRateInputChange(task.id, e.target.value)}
                                    onBlur={() => handleRateBlur(task.id)}
                                    placeholder={task.humanCostPerHour.toString()}
                                    className="w-full pl-8 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                                             text-[#f5f5f5] placeholder:text-gray-500 focus:border-[#5ccfa2] focus:outline-none"
                                  />
                                </div>
                                <p className="mt-1 font-inter-tight text-[#a0a0a0] text-xs">
                                  Default: R{task.humanCostPerHour}/hour
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}