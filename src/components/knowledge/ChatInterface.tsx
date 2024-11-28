import React, { useState, useEffect, useRef } from 'react';
import { Send, Dog, User, AlertCircle, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { initializeOpenAI, generateResponse } from '../../services/openai';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  error?: boolean;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

export function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      try {
        initializeOpenAI(apiKey);
        setIsConfigured(true);
        setMessages([{
          id: Date.now().toString(),
          content: "Hello! I'm your knowledge assistant. How can I help you today?\n\nI can help you with:\n- Analyzing RFP documents\n- Technical documentation\n- Best practices\n- Previous solutions",
          sender: 'bot',
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Error initializing OpenAI:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="p-6 border-b border-accent-100 flex justify-between items-center bg-white shadow-elegant">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="text-accent-700 hover:text-accent-800 flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Knowledge Base</span>
          </button>
          <div className="h-6 w-px bg-accent-200" />
          <h2 className="text-xl font-medium">Knowledge Assistant</h2>
        </div>
      </div>

      {!isConfigured ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full card p-8">
            <h2 className="text-2xl font-medium mb-4">Configure Assistant</h2>
            <p className="text-gray-600 mb-6">
              Please provide your OpenAI API key to start using the knowledge assistant.
            </p>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-accent-200 focus:outline-none focus:ring-2 focus:ring-accent-700"
                  placeholder="sk-..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent-700 text-white rounded-md hover:bg-accent-800 transition-colors"
              >
                Configure Assistant
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-accent-700' : 'bg-accent-100'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-6 h-6 text-white" />
                  ) : (
                    <Dog className="w-6 h-6 text-accent-700" />
                  )}
                </div>
                <div className={`max-w-3xl rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-accent-700 text-white'
                    : message.error
                    ? 'bg-red-50 border border-red-100'
                    : 'bg-white border border-accent-100 shadow-elegant'
                }`}>
                  {message.error && (
                    <div className="flex items-center space-x-2 mb-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Error</span>
                    </div>
                  )}
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          const language = match ? match[1] : undefined;
                          
                          if (!inline && language) {
                            return (
                              <CodeBlock
                                value={String(children).replace(/\n$/, '')}
                                language={language}
                                {...props}
                              />
                            );
                          }
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  <span className="text-xs mt-2 block opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-accent-100 bg-white">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-3 rounded-md border border-accent-200 focus:outline-none focus:ring-2 focus:ring-accent-700"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent-700 text-white rounded-md hover:bg-accent-800 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}