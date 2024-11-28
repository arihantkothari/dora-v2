import React, { useState } from 'react';
import { Upload, Link, X } from 'lucide-react';

interface DatasetUploaderProps {
  onUpload: (files: FileList) => void;
}

export function DatasetUploader({ onUpload }: DatasetUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [docLink, setDocLink] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle doc link submission
    console.log('Document link submitted:', docLink);
    setDocLink('');
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-accent-700 bg-accent-50' 
            : 'border-accent-200 hover:border-accent-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <Upload className="w-8 h-8 text-accent-700" />
          <div>
            <p className="text-lg font-medium">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500">Support for PDF, DOCX, TXT files</p>
          </div>
          <label className="px-4 py-2 bg-accent-700 text-white rounded-md hover:bg-accent-800 transition-colors cursor-pointer">
            Select Files
            <input
              type="file"
              multiple
              onChange={handleChange}
              className="hidden"
              accept=".pdf,.docx,.txt"
            />
          </label>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-medium mb-4">Add Documentation Link</h3>
        <form onSubmit={handleLinkSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="url"
              value={docLink}
              onChange={(e) => setDocLink(e.target.value)}
              placeholder="Enter documentation URL"
              className="w-full px-4 py-2 rounded-md border border-accent-200 focus:outline-none focus:ring-2 focus:ring-accent-700"
            />
            {docLink && (
              <button
                type="button"
                onClick={() => setDocLink('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-accent-700 text-white rounded-md hover:bg-accent-800 transition-colors flex items-center space-x-2"
          >
            <Link className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </form>
      </div>
    </div>
  );
}