import React, { useState } from 'react';
import { Building2, Activity, Clock, Users, ChevronLeft } from 'lucide-react';
import type { Client } from '../../types/client';
import { ClientTaskHistory } from './ClientTaskHistory';
import { ContactsList } from './ContactsList';
import { TeamOwnership } from './TeamOwnership';
import { CommunicationHistory } from './CommunicationHistory';

interface ClientDetailViewProps {
  client: Client;
  onBack: () => void;
}

export function ClientDetailView({ client, onBack }: ClientDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'communications'>('overview');

  const engagementColors = {
    high: 'text-green-500',
    medium: 'text-yellow-500',
    low: 'text-red-500',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-accent-700 hover:text-accent-800"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Clients</span>
        </button>
      </div>

      <div className="card p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent-50 rounded-lg">
              <Building2 className="w-8 h-8 text-accent-700" />
            </div>
            <div>
              <h2 className="text-2xl font-medium">{client.name}</h2>
              <p className="text-gray-500">{client.industry}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full ${
            client.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {client.status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-accent-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-accent-700" />
              <span className="text-sm text-gray-600">Company Size</span>
            </div>
            <p className="font-medium">{client.size}</p>
          </div>
          <div className="p-4 bg-accent-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className={`w-5 h-5 ${engagementColors[client.engagementLevel]}`} />
              <span className="text-sm text-gray-600">Engagement Level</span>
            </div>
            <p className="font-medium capitalize">{client.engagementLevel}</p>
          </div>
          <div className="p-4 bg-accent-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-accent-700" />
              <span className="text-sm text-gray-600">Last Interaction</span>
            </div>
            <p className="font-medium">
              {client.lastInteraction.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-accent-100">
        <div className="flex space-x-6">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-accent-700 text-accent-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'tasks'
                ? 'border-accent-700 text-accent-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            Task History
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'communications'
                ? 'border-accent-700 text-accent-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('communications')}
          >
            Communications
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <ContactsList contacts={client.contacts} />
            <TeamOwnership team={client.teamOwnership} />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Active Projects</h3>
            <div className="grid grid-cols-2 gap-4">
              {client.projects.map(project => (
                <div
                  key={project.id}
                  className="card p-4 flex justify-between items-center"
                >
                  <span className="font-medium">{project.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && <ClientTaskHistory tasks={client.taskHistory} />}
      
      {activeTab === 'communications' && <CommunicationHistory communications={client.communications} />}
    </div>
  );
}