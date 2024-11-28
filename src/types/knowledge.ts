export interface Dataset {
  id: string;
  name: string;
  description: string;
  size: string;
  lastUpdated: Date;
  status: 'active' | 'processing' | 'error';
  type: 'training' | 'validation' | 'testing';
}

export interface ChatSession {
  id: string;
  clientName: string;
  lastMessage: string;
  timestamp: Date;
  status: 'active' | 'closed';
  messageCount: number;
}

export interface CSVData {
  headers: string[];
  rows: Record<string, any>[];
}