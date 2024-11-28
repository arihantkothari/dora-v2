import React from 'react';
import { Database, Clock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import type { Dataset } from '../../types/knowledge';

interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  const statusIcon = {
    active: <CheckCircle className="w-4 h-4 text-green-500" />,
    processing: <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />,
    error: <AlertCircle className="w-4 h-4 text-red-500" />,
  };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-accent-700" />
          <div>
            <h3 className="text-lg font-medium">{dataset.name}</h3>
            <p className="text-sm text-gray-500">{dataset.description}</p>
          </div>
        </div>
        {statusIcon[dataset.status]}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Size</span>
          <span>{dataset.size}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Type</span>
          <span className="capitalize">{dataset.type}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-500">Last Updated</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{dataset.lastUpdated.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}