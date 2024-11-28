import React from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle, Gauge } from 'lucide-react';
import type { ClientTask } from '../../types/client';

interface ClientTaskHistoryProps {
  tasks: ClientTask[];
}

export function ClientTaskHistory({ tasks }: ClientTaskHistoryProps) {
  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    pending: 'bg-gray-100 text-gray-800',
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium mb-1">{task.title}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(task.startDate)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{task.agent}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
                {task.status}
              </span>
              <div className="flex items-center space-x-1">
                <Gauge className="w-4 h-4 text-accent-700" />
                <span className="text-sm font-medium">{task.confidence}%</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{task.summary}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Type: {task.type.replace('-', ' ').toUpperCase()}</span>
            {task.completionDate && (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Completed {formatDate(task.completionDate)}</span>
              </div>
            )}
            {task.status === 'in-progress' && (
              <div className="flex items-center space-x-1 text-blue-600">
                <AlertCircle className="w-4 h-4" />
                <span>In Progress</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}