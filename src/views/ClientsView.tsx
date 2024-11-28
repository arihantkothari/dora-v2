import React, { useState } from 'react';
import { ClientCard } from '../components/clients/ClientCard';
import { ClientDetailView } from '../components/clients/ClientDetailView';
import type { Client } from '../types/client';

const sampleClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    industry: 'Software & Technology',
    size: 'Enterprise (1000+ employees)',
    status: 'active',
    engagementLevel: 'high',
    lastInteraction: new Date('2024-03-10'),
    contacts: [
      {
        id: '1',
        name: 'John Smith',
        role: 'CTO',
        email: 'john.smith@techcorp.com',
        phone: '+1 (555) 123-4567',
        isPrimary: true,
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'IT Director',
        email: 'sarah.j@techcorp.com',
        isPrimary: false,
      },
    ],
    teamOwnership: [
      {
        id: '1',
        name: 'Michael Brown',
        role: 'Account Executive',
        email: 'michael.b@doraai.com',
      },
      {
        id: '2',
        name: 'Emily Chen',
        role: 'Solutions Engineer',
        email: 'emily.c@doraai.com',
      },
      {
        id: '3',
        name: 'David Wilson',
        role: 'Customer Success Manager',
        email: 'david.w@doraai.com',
      },
    ],
    projects: [
      { id: '1', name: 'Cloud Migration', status: 'active' },
      { id: '2', name: 'API Integration', status: 'pending' },
    ],
    taskHistory: [
      {
        id: '1',
        title: 'Enterprise RFP Analysis',
        type: 'rfp-analysis',
        status: 'completed',
        startDate: new Date('2024-02-15'),
        completionDate: new Date('2024-02-28'),
        confidence: 95,
        agent: 'Dora-PreSale',
        summary: 'Completed analysis of cloud infrastructure RFP with detailed technical requirements mapping.',
      },
      {
        id: '2',
        title: 'Solution Architecture Proposal',
        type: 'solution-proposal',
        status: 'in-progress',
        startDate: new Date('2024-03-01'),
        confidence: 85,
        agent: 'Dora-PreSale',
        summary: 'Developing comprehensive solution architecture for hybrid cloud deployment.',
      },
    ],
    communications: [
      {
        id: '1',
        channel: 'email',
        timestamp: new Date('2024-03-10T10:30:00'),
        subject: 'RFP Response Review',
        content: 'Attached is the draft RFP response for your review. Please provide feedback by EOD.',
        participants: [
          { name: 'John Smith', role: 'CTO', email: 'john.smith@techcorp.com' },
          { name: 'Emily Chen', role: 'Solutions Engineer', email: 'emily.c@doraai.com' }
        ],
        attachments: [
          { name: 'RFP_Response_Draft.pdf', type: 'application/pdf', size: '2.4MB', url: '#' }
        ],
        status: 'sent',
        tags: ['RFP', 'High Priority'],
        followUpNeeded: true
      },
      {
        id: '2',
        channel: 'slack',
        timestamp: new Date('2024-03-10T14:15:00'),
        subject: 'Technical Requirements Discussion',
        content: 'Updated the technical specifications based on our morning call.',
        participants: [
          { name: 'Sarah Johnson', role: 'IT Director' },
          { name: 'David Wilson', role: 'Customer Success Manager' }
        ],
        status: 'received',
        tags: ['Technical', 'Requirements']
      }
    ]
  },
  {
    id: '2',
    name: 'InnovateNow Ltd',
    industry: 'Financial Services',
    size: 'Mid-Market (100-999 employees)',
    status: 'active',
    engagementLevel: 'medium',
    lastInteraction: new Date('2024-03-08'),
    contacts: [
      {
        id: '3',
        name: 'Robert Lee',
        role: 'Head of Innovation',
        email: 'robert.lee@innovatenow.com',
        phone: '+1 (555) 987-6543',
        isPrimary: true,
      },
    ],
    teamOwnership: [
      {
        id: '4',
        name: 'Jessica Taylor',
        role: 'Business Development Rep',
        email: 'jessica.t@doraai.com',
      },
      {
        id: '5',
        name: 'Alex Kumar',
        role: 'Technical Support',
        email: 'alex.k@doraai.com',
      },
    ],
    projects: [
      { id: '3', name: 'Data Analytics Platform', status: 'active' },
      { id: '4', name: 'Security Assessment', status: 'completed' },
    ],
    taskHistory: [
      {
        id: '3',
        title: 'Security Implementation POC',
        type: 'poc',
        status: 'completed',
        startDate: new Date('2024-02-01'),
        completionDate: new Date('2024-02-20'),
        confidence: 92,
        agent: 'Dora-Implementation',
        summary: 'Successfully demonstrated security features and compliance capabilities.',
      },
      {
        id: '4',
        title: 'API Integration Support',
        type: 'support',
        status: 'in-progress',
        startDate: new Date('2024-03-05'),
        confidence: 88,
        agent: 'Dora-Support',
        summary: 'Providing ongoing support for REST API integration and documentation.',
      },
    ],
    communications: [
      {
        id: '3',
        channel: 'meeting',
        timestamp: new Date('2024-03-08T15:00:00'),
        subject: 'Weekly Progress Review',
        content: 'Discussed implementation timeline and upcoming milestones.',
        participants: [
          { name: 'Robert Lee', role: 'Head of Innovation' },
          { name: 'Jessica Taylor', role: 'Business Development Rep' },
          { name: 'Alex Kumar', role: 'Technical Support' }
        ],
        status: 'completed',
        tags: ['Weekly Meeting', 'Progress Review']
      }
    ]
  },
];

export function ClientsView() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  
  const selectedClient = sampleClients.find(client => client.id === selectedClientId);

  if (selectedClient) {
    return (
      <div className="p-8">
        <ClientDetailView
          client={selectedClient}
          onBack={() => setSelectedClientId(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Client Profiles</h2>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-accent-700 hover:text-accent-800 transition-colors duration-200">
            Import Clients
          </button>
          <button className="px-4 py-2 bg-accent-700 text-white rounded-md hover:bg-accent-800 transition-colors duration-200">
            Add Client
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {sampleClients.map(client => (
          <div key={client.id} onClick={() => setSelectedClientId(client.id)} className="cursor-pointer">
            <ClientCard client={client} />
          </div>
        ))}
      </div>
    </div>
  );
}