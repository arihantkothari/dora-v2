import React from 'react';
import { DatasetCard } from '../components/knowledge/DatasetCard';
import { DatasetUploader } from '../components/knowledge/DatasetUploader';
import type { Dataset } from '../types/knowledge';

interface KnowledgeViewProps {
  onChatOpen: () => void;
}

const sampleDatasets: Dataset[] = [
  {
    id: '1',
    name: 'RFP Training Data',
    description: 'Historical RFP responses and outcomes',
    size: '2.5GB',
    lastUpdated: new Date('2024-03-01'),
    status: 'active',
    type: 'training',
  },
  {
    id: '2',
    name: 'Client Interactions',
    description: 'Customer support and engagement data',
    size: '1.8GB',
    lastUpdated: new Date('2024-03-05'),
    status: 'processing',
    type: 'validation',
  },
];

export function KnowledgeView({ onChatOpen }: KnowledgeViewProps) {
  const handleFileUpload = (files: FileList) => {
    // Handle file upload logic
    console.log('Files to upload:', files);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Knowledge Base</h2>
        <button
          onClick={onChatOpen}
          className="px-4 py-2 bg-accent-700 text-white rounded-md hover:bg-accent-800 transition-colors"
        >
          Open Knowledge Assistant
        </button>
      </div>

      <DatasetUploader onUpload={handleFileUpload} />
      
      <div>
        <h2 className="text-2xl font-medium mb-6">Available Datasets</h2>
        <div className="grid grid-cols-2 gap-6">
          {sampleDatasets.map(dataset => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      </div>
    </div>
  );
}