import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { TaskFilter } from './TaskFilter';
import type { Task, WorkflowType } from '../types';

interface TaskListProps {
  title: string;
  tasks: Task[];
}

export function TaskList({ title, tasks }: TaskListProps) {
  const [activeFilter, setActiveFilter] = useState<WorkflowType | undefined>();
  
  const filteredTasks = activeFilter
    ? tasks.filter((task) => task.workflowType === activeFilter)
    : tasks;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}