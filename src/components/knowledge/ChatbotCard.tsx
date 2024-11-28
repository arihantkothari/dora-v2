import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import type { ChatSession } from '../../types/knowledge';

interface ChatbotCardProps {
  session: ChatSession;
}

export function ChatbotCard({ session }: ChatbotCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-accent-700" />
          <div>
            <h3 className="text-lg font-medium">{session.clientName}</h3>
            <p className="text-sm text-gray-500 truncate max-w-[200px]">
              {session.lastMessage}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          session.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {session.status}
        </span>
      </div>
      <div className="flex justify-between text-sm items-center">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span className="text-gray-500">
            {session.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <span className="text-accent-700">
          {session.messageCount} messages
        </span>
      </div>
    </div>
  );
}