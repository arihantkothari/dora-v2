import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { ProcessSteps } from './ProcessSteps';
import { useTasks } from '../hooks/useTasks';

export function ProcessStepsContainer() {
  const { selectedTaskId } = useTaskContext();
  const { tasks } = useTasks();
  
  const selectedTask = tasks.find(task => task.id === selectedTaskId);
  
  if (!selectedTask) {
    return (
      <div className="card p-6 text-center">
        <h2 className="text-2xl font-medium mb-4">Process Steps</h2>
        <p className="text-gray-500">Select a task to view its progress</p>
      </div>
    );
  }
  
  return <ProcessSteps steps={selectedTask.steps} />;
}