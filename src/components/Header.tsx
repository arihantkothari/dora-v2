import React from 'react';
import { Dog } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center justify-between p-8 border-b border-accent-100 bg-surface shadow-elegant">
      <div className="flex items-center space-x-3">
        <Dog className="w-8 h-8 text-accent-700" />
        <div>
          <h1 className="text-3xl font-medium">Dora AI</h1>
          <p className="text-sm text-accent-700 uppercase tracking-wider">
            Redefining Solutions Engineering
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-sm text-accent-700 hover:text-accent-900 transition-colors duration-200">
          Documentation
        </button>
        <button className="px-4 py-2 text-sm bg-accent-700 text-white rounded-md hover:bg-accent-800 transition-colors duration-200 shadow-elegant">
          Create Agent
        </button>
      </div>
    </div>
  );
}