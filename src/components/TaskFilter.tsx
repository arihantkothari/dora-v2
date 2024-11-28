import React from 'react';
import { Filter } from 'lucide-react';
import type { WorkflowType, TaskStatus } from '../types';

interface TaskFilterProps {
  onFilterChange: (type: WorkflowType | undefined) => void;
  activeFilter?: WorkflowType;
}

const filterOptions: { label: string; value: WorkflowType }[] = [
  { label: 'Pre-Sales', value: 'pre-sales' },
  { label: 'Post-Sales', value: 'post-sales' },
];

export function TaskFilter({ onFilterChange, activeFilter }: TaskFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Filter className="w-4 h-4 text-gray-500" />
      <div className="flex space-x-1">
        <button
          onClick={() => onFilterChange(undefined)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            !activeFilter
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeFilter === option.value
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}