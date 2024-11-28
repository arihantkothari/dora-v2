export type WorkflowType = 'pre-sales' | 'post-sales';
export type TaskStatus = 'pending' | 'completed' | 'in-progress';
export type StepStatus = 'completed' | 'in-progress' | 'pending';

export interface Task {
  id: string;
  title: string;
  agent: string;
  status: TaskStatus;
  clientDetails: string;
  workflowType: WorkflowType;
  steps: ProcessStep[];
  confidence?: number;
  lastUpdated: Date;
  currentStepIndex: number;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  status: StepStatus;
  subSteps?: {
    id: string;
    title: string;
    status: StepStatus;
  }[];
}

export interface TaskContextType {
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  selectedStepId: string | null;
  setSelectedStepId: (id: string | null) => void;
}

export interface TaskFilters {
  workflowType?: WorkflowType;
  status?: TaskStatus;
}