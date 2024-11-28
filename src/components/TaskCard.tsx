import React from 'react';
import { Clock, MoreVertical, Gauge } from 'lucide-react';
import type { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { selectedTaskId, setSelectedTaskId } = useTaskContext();
  const isSelected = selectedTaskId === task.id;

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div
      className={`card p-6 cursor-pointer ${
        isSelected ? 'ring-2 ring-gray-900' : ''
      }`}
      onClick={() => setSelectedTaskId(isSelected ? null : task.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-medium mb-1">{task.title}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Updated {formatDate(task.lastUpdated)}</span>
          </div>
        </div>
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Agent</span>
          <span className="font-medium">{task.agent}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="font-medium capitalize">{task.status}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Client</span>
          <span className="font-medium">{task.clientDetails}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-500">Confidence</span>
          <div className="flex items-center space-x-1">
            <Gauge className="w-4 h-4 text-gray-700" />
            <span className="font-medium">{task.confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}