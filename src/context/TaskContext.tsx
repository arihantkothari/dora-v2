import React, { createContext, useContext, useState } from 'react';
import type { TaskContextType } from '../types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  return (
    <TaskContext.Provider 
      value={{ 
        selectedTaskId, 
        setSelectedTaskId,
        selectedStepId,
        setSelectedStepId
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}