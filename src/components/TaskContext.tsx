import React, { useState } from 'react';
import { Mail, Paperclip, Calendar, AlertCircle, Download } from 'lucide-react';

interface TaskContextProps {
  taskId: string;
}

// Sample email trigger data
const emailTrigger = {
  from: 'john.smith@techcorp.com',
  to: 'sales@doraai.com',
  subject: 'New RFP for Cloud Infrastructure Project',
  date: '2024-03-10T10:30:00',
  content: `Dear Team,

Please find attached our RFP for the upcoming cloud infrastructure project. We're looking for a comprehensive solution that meets our scaling needs.

Best regards,
John Smith
CTO, TechCorp Inc.`,
  attachments: [
    {
      name: 'TechCorp_Cloud_RFP.csv',
      size: '256KB',
      type: 'text/csv',
      content: `Requirement,Category,Priority,Confidence,Status
Cloud infrastructure deployment automation,Technical,High,95%,Matched
Multi-region data replication,Infrastructure,Medium,87%,Partial Match
99.99% uptime SLA,SLA,High,92%,Matched
Real-time monitoring and alerting,Operations,High,89%,Matched
Automated backup and recovery,Infrastructure,High,94%,Matched
Container orchestration platform,Technical,High,96%,Matched
Identity and access management,Security,High,91%,Matched
Cost optimization features,Operations,Medium,88%,Partial Match
API-driven infrastructure,Technical,High,93%,Matched
Compliance certifications (SOC2, ISO27001),Security,High,90%,Matched`
    }
  ]
};

export function TaskContext({ taskId }: TaskContextProps) {
  const handleDownload = (attachment: typeof emailTrigger.attachments[0]) => {
    const blob = new Blob([attachment.content], { type: attachment.type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = attachment.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Task Context</h3>
        <span className="px-3 py-1 text-sm bg-accent-100 text-accent-800 rounded-full">
          Email Trigger
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
            <Mail className="w-5 h-5 text-accent-700" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{emailTrigger.from}</h4>
                <p className="text-sm text-gray-500">To: {emailTrigger.to}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(emailTrigger.date).toLocaleString()}
              </span>
            </div>
            <h5 className="font-medium mb-2">{emailTrigger.subject}</h5>
            <div className="bg-accent-50 p-4 rounded-lg mb-4 whitespace-pre-wrap">
              {emailTrigger.content}
            </div>
            <div className="flex items-center space-x-2">
              <Paperclip className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Attachments:</span>
            </div>
            <div className="mt-2">
              {emailTrigger.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-accent-100"
                >
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-accent-700" />
                    <div>
                      <p className="font-medium">{attachment.name}</p>
                      <p className="text-sm text-gray-500">{attachment.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(attachment)}
                    className="flex items-center space-x-2 px-3 py-1 text-sm text-accent-700 hover:text-accent-800 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}