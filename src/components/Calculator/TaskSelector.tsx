'use client';

import { useState } from 'react';
import { TaskSelection } from '@/types/calculator.types';
import { TASKS, TASK_CATEGORIES } from '@/lib/taskData';

// Helper to get task unit name
function getTaskUnit(taskId: string): string {
  const units: Record<string, string> = {
    'lead-prospecting': 'lead',
    'appointment-setting': 'lead',
    'rfp-tender-draft': 'document',
    'social-content-gen': 'post',
    'email-campaigns': 'email',
    'seo-articles': 'article',
    'level-1-support': 'ticket',
    'client-onboarding': 'client',
    'invoice-processing': 'invoice',
    'nda-legal-review': 'document',
    'resume-screening': 'CV'
  };
  return units[taskId] || 'item';
}

// Helper to get plural task unit name
function getTaskUnitPlural(taskId: string): string {
  const plurals: Record<string, string> = {
    'lead-prospecting': 'leads',
    'appointment-setting': 'appointments',
    'rfp-tender-draft': 'RFPs/tenders',
    'social-content-gen': 'social posts',
    'email-campaigns': 'email campaigns',
    'seo-articles': 'SEO articles',
    'level-1-support': 'support tickets',
    'client-onboarding': 'clients',
    'invoice-processing': 'invoices',
    'nda-legal-review': 'legal documents',
    'resume-screening': 'CVs'
  };
  return plurals[taskId] || 'items';
}

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
        s.taskId === taskId ? { ...s, volume: volume } : s
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
                            ? `${task.humanTimeMinutes} mins` 
                            : `${task.humanTimeMinutes / 60} hours`
                          } per {getTaskUnit(task.id)}. Avg employee costs R{task.humanCostPerHour}/hour
                        </p>
                        
                        {/* Volume Input - Only show when selected */}
                        {selected && (
                          <div className="mt-3 space-y-2">
                            <label className="text-[#f5f5f5] text-sm font-inter-tight block">
                              How many {getTaskUnitPlural(task.id)} per month?
                            </label>
                            <div className="flex items-center gap-3">
                            <input
  type="text"
  inputMode="numeric"
  value={volume || ''}
  onChange={(e) => {
    const val = e.target.value;
    
    // Allow completely empty
    if (val === '') {
      updateVolume(task.id, 0);
      return;
    }
    
    // Parse and update
    const numVal = parseInt(val.replace(/\D/g, ''), 10);
    if (!isNaN(numVal)) {
      updateVolume(task.id, numVal);
    }
  }}
  onBlur={() => {
    // When leaving field, set to suggested if empty/zero
    if (!volume || volume === 0) {
      updateVolume(task.id, task.suggestedVolume);
    }
  }}
  placeholder={task.suggestedVolume.toString()}
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
