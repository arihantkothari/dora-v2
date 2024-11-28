export interface Client {
  id: string;
  name: string;
  industry: string;
  size: string;
  status: 'active' | 'inactive';
  engagementLevel: 'high' | 'medium' | 'low';
  lastInteraction: Date;
  contacts: ContactPerson[];
  teamOwnership: TeamMember[];
  projects: {
    id: string;
    name: string;
    status: 'active' | 'completed' | 'pending';
  }[];
  taskHistory: ClientTask[];
  communications: Communication[];
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  isPrimary: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Account Executive' | 'Customer Success Manager' | 'Business Development Rep' | 'Solutions Engineer' | 'Technical Support';
  email: string;
  avatar?: string;
}

export interface ClientTask {
  id: string;
  title: string;
  type: 'rfp-analysis' | 'solution-proposal' | 'poc' | 'support';
  status: 'completed' | 'in-progress' | 'pending';
  startDate: Date;
  completionDate?: Date;
  confidence: number;
  agent: string;
  summary: string;
}

export interface Communication {
  id: string;
  channel: 'email' | 'slack' | 'telegram' | 'phone' | 'meeting';
  timestamp: Date;
  subject: string;
  content: string;
  participants: {
    name: string;
    role: string;
    email?: string;
  }[];
  attachments?: {
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
  status: 'sent' | 'received' | 'scheduled';
  followUpNeeded?: boolean;
  tags?: string[];
}