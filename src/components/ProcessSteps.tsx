import React, { useState } from 'react';
import { 
  Clock, 
  FileText, 
  LineChart, 
  PenTool,
  CheckCircle,
  Circle,
  AlertCircle,
  ChevronRight,
  Maximize2,
  X,
  Table
} from 'lucide-react';
import type { ProcessStep } from '../types';
import { useTaskContext } from '../context/TaskContext';
import { CSVViewer } from './knowledge/CSVViewer';
import { TaskContext } from './TaskContext';

const iconMap = {
  FileText,
  LineChart,
  PenTool,
  Clock,
  Table,
};

const statusIcon = {
  completed: CheckCircle,
  'in-progress': AlertCircle,
  pending: Circle,
};

interface ProcessStepsProps {
  steps: ProcessStep[];
}

function StepContent({ 
  step, 
  isSelected,
  taskId,
  isFullscreen
}: { 
  step: ProcessStep; 
  isSelected: boolean;
  taskId: string | null;
  isFullscreen: boolean;
}) {
  const isExpanded = isSelected && step.subSteps && step.subSteps.length > 0;
  const showDetails = isSelected && step.id === 'task-context';
  const showParsedData = isSelected && step.id === 'rfp-parsing';

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium mb-1">{step.title}</h3>
        <ChevronRight className={`w-4 h-4 transform transition-transform ${
          isSelected ? 'rotate-90' : ''
        }`} />
      </div>
      <p className="text-sm text-gray-500 mb-3">{step.description}</p>
      
      {isExpanded && (
        <div className="mb-4 space-y-2 pl-4 border-l-2 border-gray-100">
          {step.subSteps.map((subStep) => (
            <div 
              key={subStep.id}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50"
            >
              {React.createElement(statusIcon[subStep.status], {
                className: `w-4 h-4 ${
                  subStep.status === 'completed' 
                    ? 'text-green-500' 
                    : subStep.status === 'in-progress'
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                }`,
              })}
              <span className="text-sm text-gray-600">{subStep.title}</span>
            </div>
          ))}
        </div>
      )}
      
      {showDetails && taskId && (
        <div className="mt-4">
          <TaskContext taskId={taskId} />
        </div>
      )}

      {showParsedData && (
        <div className="mt-4">
          <CSVViewer 
            data={{
              headers: ['Requirement', 'Category', 'Priority', 'Confidence', 'Status'],
              rows: [
                {
                  Requirement: 'Cloud infrastructure deployment automation',
                  Category: 'Technical',
                  Priority: 'High',
                  Confidence: '95%',
                  Status: 'Matched',
                },
                {
                  Requirement: 'Multi-region data replication',
                  Category: 'Infrastructure',
                  Priority: 'Medium',
                  Confidence: '87%',
                  Status: 'Partial Match',
                },
                {
                  Requirement: '99.99% uptime SLA',
                  Category: 'SLA',
                  Priority: 'High',
                  Confidence: '92%',
                  Status: 'Matched',
                },
                {
                  Requirement: 'Real-time monitoring and alerting',
                  Category: 'Operations',
                  Priority: 'High',
                  Confidence: '89%',
                  Status: 'Matched',
                },
              ]
            }}
            title="Parsed RFP Requirements"
          />
        </div>
      )}
      
      <div className="progress-bar mt-4">
        <div
          className="progress-bar-fill"
          style={{ width: `${step.progress}%` }}
        />
      </div>
    </>
  );
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  const { selectedStepId, setSelectedStepId, selectedTaskId } = useTaskContext();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStepClick = (stepId: string) => {
    setSelectedStepId(selectedStepId === stepId ? null : stepId);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const StepsList = () => (
    <div className="space-y-8">
      {steps.map((step, index) => {
        const isSelected = selectedStepId === step.id;

        return (
          <div 
            key={step.id} 
            className={`relative transition-all duration-200 ${
              isSelected ? 'scale-102' : ''
            }`}
          >
            <div
              className={`w-full text-left ${
                isSelected ? 'transform scale-102' : ''
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`relative z-10 p-2 rounded-full transition-colors duration-200 ${
                  isSelected ? 'bg-gray-100' : 'bg-white'
                }`}>
                  {React.createElement(iconMap[step.icon as keyof typeof iconMap], {
                    className: `w-5 h-5 ${
                      isSelected ? 'text-gray-900' : 'text-gray-600'
                    }`,
                  })}
                </div>
                <div className="flex-1 pt-1">
                  <StepContent 
                    step={step}
                    isSelected={isSelected}
                    taskId={selectedTaskId}
                    isFullscreen={isFullscreen}
                  />
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`absolute top-8 left-5 w-px bg-gray-200 h-full -z-10 ${
                  isSelected ? 'h-[calc(100%_+_2rem)]' : ''
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">Process Steps</h2>
            <div
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </div>
          </div>
          <StepsList />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium">Process Steps</h2>
        <div
          onClick={toggleFullscreen}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="View fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </div>
      </div>
      <StepsList />
    </div>
  );
}