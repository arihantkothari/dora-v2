import React from 'react';
import { Building2, Clock, Activity } from 'lucide-react';
import type { Client } from '../../types/client';

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const engagementColors = {
    high: 'text-green-500',
    medium: 'text-yellow-500',
    low: 'text-red-500',
  };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-accent-700" />
          <div>
            <h3 className="text-lg font-medium">{client.name}</h3>
            <p className="text-sm text-gray-500">{client.industry}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          client.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {client.status}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Company Size</span>
          <span>{client.size}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-500">Engagement</span>
          <div className="flex items-center space-x-1">
            <Activity className={`w-4 h-4 ${engagementColors[client.engagementLevel]}`} />
            <span className="capitalize">{client.engagementLevel}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-500">Last Interaction</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{client.lastInteraction.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Active Projects</h4>
        <div className="space-y-2">
          {client.projects.map(project => (
            <div 
              key={project.id}
              className="text-sm p-2 bg-accent-50 rounded-md flex justify-between"
            >
              <span>{project.name}</span>
              <span className="capitalize text-accent-700">{project.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}