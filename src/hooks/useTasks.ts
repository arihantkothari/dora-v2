import { useState } from 'react';
import { Task, TaskFilters, WorkflowType } from '../types';
import { workflowSteps } from '../data/workflows';

const generateTasks = (): Task[] => {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Enterprise RFP Analysis',
      agent: 'Dora-PreSale',
      status: 'in-progress',
      clientDetails: 'TechCorp Inc.',
      workflowType: 'pre-sales',
      steps: workflowSteps['pre-sales']['rfp-analysis'],
      confidence: 85,
      lastUpdated: new Date('2024-03-10T15:30:00'),
      currentStepIndex: 1,
    },
    {
      id: '2',
      title: 'Solution Proposal',
      agent: 'Dora-PreSale',
      status: 'pending',
      clientDetails: 'InnovateNow Ltd',
      workflowType: 'pre-sales',
      steps: workflowSteps['pre-sales']['response-generation'],
      confidence: 92,
      lastUpdated: new Date('2024-03-10T14:15:00'),
      currentStepIndex: 0,
    },
    {
      id: '3',
      title: 'Cloud Migration POC',
      agent: 'Dora-Implementation',
      status: 'in-progress',
      clientDetails: 'DataFlow Systems',
      workflowType: 'post-sales',
      steps: workflowSteps['post-sales']['poc-management'],
      confidence: 78,
      lastUpdated: new Date('2024-03-10T16:45:00'),
      currentStepIndex: 1,
    },
    {
      id: '4',
      title: 'API Integration Support',
      agent: 'Dora-Support',
      status: 'in-progress',
      clientDetails: 'GlobalTech Solutions',
      workflowType: 'post-sales',
      steps: workflowSteps['post-sales']['technical-support'],
      confidence: 88,
      lastUpdated: new Date('2024-03-10T17:20:00'),
      currentStepIndex: 2,
    },
  ];

  return tasks;
};

export function useTasks() {
  const [tasks] = useState<Task[]>(generateTasks());

  const filterTasks = (filters: TaskFilters) => {
    return tasks.filter(task => {
      if (filters.workflowType && task.workflowType !== filters.workflowType) {
        return false;
      }
      if (filters.status && task.status !== filters.status) {
        return false;
      }
      return true;
    });
  };

  return { tasks, filterTasks };
}