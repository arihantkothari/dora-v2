import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Video, 
  Send,
  Download,
  Tag,
  Calendar,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { SlackIcon } from '../icons/SlackIcon';
import type { Communication } from '../../types/client';

interface CommunicationHistoryProps {
  communications?: Communication[];
}

export function CommunicationHistory({ communications = [] }: CommunicationHistoryProps) {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  
  const channelIcons = {
    email: Mail,
    slack: SlackIcon,
    telegram: Send,
    phone: Phone,
    meeting: Video,
  };

  const channelColors = {
    email: 'bg-blue-100 text-blue-800',
    slack: 'bg-[#4A154B] text-white',
    telegram: 'bg-sky-100 text-sky-800',
    phone: 'bg-green-100 text-green-800',
    meeting: 'bg-orange-100 text-orange-800',
  };

  const filteredCommunications = selectedChannel
    ? communications.filter(comm => comm.channel === selectedChannel)
    : communications;

  const sortedCommunications = [...filteredCommunications].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (communications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <MessageCircle className="w-12 h-12 text-accent-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Communications Yet</h3>
        <p className="text-gray-500">There are no recorded communications for this client.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Communication History</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedChannel(null)}
            className={`filter-button ${
              !selectedChannel ? 'filter-button-active' : 'filter-button-inactive'
            }`}
          >
            All
          </button>
          {Object.keys(channelIcons).map(channel => (
            <button
              key={channel}
              onClick={() => setSelectedChannel(channel)}
              className={`filter-button flex items-center space-x-1 ${
                selectedChannel === channel
                  ? 'filter-button-active'
                  : 'filter-button-inactive'
              }`}
            >
              {React.createElement(channelIcons[channel as keyof typeof channelIcons], {
                className: 'w-4 h-4',
              })}
              <span className="capitalize">{channel}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {sortedCommunications.map(comm => (
          <div key={comm.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${channelColors[comm.channel]}`}>
                  {React.createElement(channelIcons[comm.channel], { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h4 className="font-medium mb-1">{comm.subject}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(comm.timestamp)}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                comm.status === 'sent'
                  ? 'bg-green-100 text-green-800'
                  : comm.status === 'received'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {comm.status}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{comm.content}</p>

            <div className="space-y-4">
              {comm.participants.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {comm.participants.map((participant, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 text-sm bg-gray-50 px-2 py-1 rounded"
                    >
                      <span className="font-medium">{participant.name}</span>
                      <span className="text-gray-500">({participant.role})</span>
                    </div>
                  ))}
                </div>
              )}

              {comm.attachments && comm.attachments.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Attachments</h5>
                  <div className="flex flex-wrap gap-2">
                    {comm.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        className="flex items-center space-x-2 text-sm bg-gray-50 px-3 py-2 rounded hover:bg-gray-100"
                      >
                        <Download className="w-4 h-4" />
                        <span>{attachment.name}</span>
                        <span className="text-gray-500">({attachment.size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {comm.tags && comm.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <div className="flex flex-wrap gap-1">
                    {comm.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {comm.followUpNeeded && (
                <div className="flex items-center space-x-2 text-amber-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Follow-up needed</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}