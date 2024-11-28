import React from 'react';
import { Mail, Phone, Star } from 'lucide-react';
import type { ContactPerson } from '../../types/client';

interface ContactsListProps {
  contacts: ContactPerson[];
}

export function ContactsList({ contacts }: ContactsListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{contact.name}</span>
                  {contact.isPrimary && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-sm text-gray-500">{contact.role}</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center space-x-2 text-sm text-accent-700 hover:text-accent-800"
              >
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </a>
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-2 text-sm text-accent-700 hover:text-accent-800"
                >
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}