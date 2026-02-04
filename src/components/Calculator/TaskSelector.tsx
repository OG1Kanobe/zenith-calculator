'use client';

import { useState } from 'react';
import { TaskSelection } from '@/types/calculator.types';
import { TASKS, TASK_CATEGORIES } from '@/lib/taskData';

interface TaskSelectorProps {
  selectedTasks: TaskSelection[];
  onChange: (selections: TaskSelection[]) => void;
}

export default function TaskSelector({ selectedTasks, onChange }: TaskSelectorProps) {
  const isSelected = (taskId: string) => {
    return selectedTasks.some(s => s.taskId === taskId);
  };

  const getVolume = (taskId: string) => {
    return selectedTasks.find(s => s.taskId === taskId)?.volume ?? 0;
  };

  const toggleTask = (taskId: string, suggestedVolume: number) => {
    if (isSelected(taskId)) {
      // Remove task
      onChange(selectedTasks.filter(s => s.taskId !== taskId));
    } else {
      // Add task with suggested volume
      onChange([...selectedTasks, { taskId, volume: suggestedVolume }]);
    }
  };

  const updateVolume = (taskId: string, volume: number) => {
    onChange(
      selectedTasks.map(s => 
        s.taskId === taskId ? { ...s, volume: Math.max(1, volume) } : s
      )
    );
  };

  return (
    <div className="space-y-8">
      {TASK_CATEGORIES.map(category => {
        const categoryTasks = TASKS.filter(t => t.category === category);
        
        return (
          <div key={category}>
            <h3 className="font-mono text-[#5ccfa2] text-lg mb-4 border-b border-gray-800 pb-2">
              {category.toUpperCase()}
            </h3>
            
            <div className="space-y-3">
              {categoryTasks.map(task => {
                const selected = isSelected(task.id);
                const volume = getVolume(task.id);
                
                return (
                  <div
                    key={task.id}
                    className={`
                      border rounded-lg p-4 transition-all duration-200
                      ${selected 
                        ? 'border-[#5ccfa2] bg-[#5ccfa2]/5' 
                        : 'border-gray-800 hover:border-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleTask(task.id, task.suggestedVolume)}
                          className="w-5 h-5 rounded border-gray-700 bg-[#010112] 
                                   checked:bg-[#5ccfa2] checked:border-[#5ccfa2] 
                                   focus:ring-2 focus:ring-[#5ccfa2] focus:ring-offset-0
                                   cursor-pointer"
                        />
                      </div>
                      
                      {/* Task Details */}
                      <div className="flex-1 min-w-0">
                        <label className="font-inter-tight text-[#f5f5f5] font-medium cursor-pointer block mb-1">
                          {task.name}
                        </label>
                        <p className="text-[#a0a0a0] text-sm font-inter-tight">
                          Avg: {task.humanTimeMinutes < 60 
                            ? `${task.humanTimeMinutes} min` 
                            : `${task.humanTimeMinutes / 60} hrs`
                          } @ R{task.humanCostPerHour}/hr
                        </p>
                        
                        {/* Volume Input - Only show when selected */}
                        {selected && (
                          <div className="mt-3 space-y-2">
                            <label className="text-[#f5f5f5] text-sm font-inter-tight block">
                              How many per month?
                            </label>
                            <div className="flex items-center gap-3">
                              <input
                                type="number"
                                value={volume}
                                onChange={(e) => updateVolume(task.id, parseInt(e.target.value) || 1)}
                                min="1"
                                className="w-32 px-3 py-2 bg-[#010112] border border-[#5ccfa2] rounded 
                                         text-[#f5f5f5] font-inter-tight
                                         focus:outline-none focus:ring-2 focus:ring-[#5ccfa2]"
                              />
                              <span className="text-[#a0a0a0] text-sm font-inter-tight">
                                Typical: {task.typicalVolumeRange}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
