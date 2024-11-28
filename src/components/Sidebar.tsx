import React from 'react';
import { FolderKanban, Users, Brain, Building2, Home, MessageSquare } from 'lucide-react';

interface SidebarProps {
  onViewChange: (view: 'tasks' | 'knowledge' | 'clients') => void;
  currentView: string;
  onChatToggle: () => void;
  isChatOpen: boolean;
}

const menuItems = [
  { label: 'Home View', icon: Home, view: 'tasks' },
  {
    label: 'Tasks',
    items: ['Active Tasks', 'Completed Tasks'],
    icon: FolderKanban,
    view: 'tasks',
  },
  {
    label: 'Agents',
    items: ['Deployed Agents', 'Idle Agents', 'Create Agents'],
    icon: Users,
    view: 'agents',
  },
  {
    label: 'Knowledge',
    items: ['Dataset', 'Knowledge Assistant'],
    icon: Brain,
    view: 'knowledge',
    onItemClick: {
      'Knowledge Assistant': 'chat'
    }
  },
  {
    label: 'Clients',
    items: ['Client Profile'],
    icon: Building2,
    view: 'clients',
  },
];

export function Sidebar({ onViewChange, currentView, onChatToggle, isChatOpen }: SidebarProps) {
  return (
    <div className="w-64 bg-surface min-h-screen border-r border-accent-100 shadow-elegant">
      <div className="p-6">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-6">
            <button
              className={`flex items-center space-x-3 w-full text-left transition-colors duration-200 ${
                currentView === item.view
                  ? 'text-accent-900 font-medium'
                  : 'text-accent-600 hover:text-accent-800'
              }`}
              onClick={() => item.view && onViewChange(item.view as any)}
            >
              {React.createElement(item.icon, { size: 18 })}
              <span className="tracking-wide">{item.label}</span>
            </button>
            {item.items && (
              <div className="space-y-2 ml-7 mt-2">
                {item.items.map((subItem) => (
                  <button
                    key={subItem}
                    className={`text-sm w-full text-left transition-colors duration-200 ${
                      (item.onItemClick?.[subItem] === 'chat' && isChatOpen) ||
                      (currentView === item.view && !isChatOpen)
                        ? 'text-accent-900 font-medium'
                        : 'text-accent-600 hover:text-accent-800'
                    }`}
                    onClick={() => {
                      if (item.onItemClick?.[subItem]) {
                        if (item.onItemClick[subItem] === 'chat') {
                          onChatToggle();
                        }
                      }
                    }}
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}