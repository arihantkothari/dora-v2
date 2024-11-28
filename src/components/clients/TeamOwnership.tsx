import React from 'react';
import { Mail } from 'lucide-react';
import type { TeamMember } from '../../types/client';

interface TeamOwnershipProps {
  team: TeamMember[];
}

export function TeamOwnership({ team }: TeamOwnershipProps) {
  const roleOrder = [
    'Account Executive',
    'Customer Success Manager',
    'Business Development Rep',
    'Solutions Engineer',
    'Technical Support'
  ];

  const sortedTeam = [...team].sort((a, b) => 
    roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Team Ownership</h3>
      <div className="grid gap-4">
        {sortedTeam.map((member) => (
          <div key={member.id} className="card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-accent-700 font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-accent-700 hover:text-accent-800"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}