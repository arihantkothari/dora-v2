import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Download, Filter, Search } from 'lucide-react';
import type { CSVData } from '../../types/knowledge';

interface CSVViewerProps {
  data: CSVData;
  title: string;
}

function parseCSVContent(content: string): CSVData {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const rows = lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {} as Record<string, string>);
  });
  return { headers, rows };
}

function TableHeader({ 
  header, 
  sortConfig, 
  onSort, 
  filters, 
  onFilter 
}: { 
  header: string;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
  filters: Record<string, string>;
  onFilter: (column: string, value: string) => void;
}) {
  return (
    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-accent-200">
      <div className="space-y-2">
        <div 
          className="flex items-center space-x-1 cursor-pointer hover:text-accent-700"
          onClick={() => onSort(header)}
        >
          <span>{header}</span>
          {sortConfig?.key === header && (
            sortConfig.direction === 'asc' ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
          )}
        </div>
        <input
          type="text"
          placeholder="Filter"
          value={filters[header] || ''}
          onChange={(e) => onFilter(header, e.target.value)}
          className="w-full px-2 py-1 text-xs rounded border border-accent-200 focus:outline-none focus:ring-1 focus:ring-accent-700"
        />
      </div>
    </th>
  );
}

export function CSVViewer({ data, title }: CSVViewerProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (column: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [column]: value,
    }));
  };

  const filteredData = data.rows.filter(row => {
    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchLower)
      );
    }
    
    // Apply column filters
    return Object.entries(filters).every(([column, filterValue]) => {
      if (!filterValue) return true;
      const cellValue = String(row[column]).toLowerCase();
      return cellValue.includes(filterValue.toLowerCase());
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleExport = () => {
    const csvContent = [
      data.headers.join(','),
      ...sortedData.map(row => 
        data.headers.map(header => JSON.stringify(row[header])).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">{title}</h3>
        <div
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 text-accent-700 hover:text-accent-800 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-accent-200 focus:outline-none focus:ring-2 focus:ring-accent-700"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            {filteredData.length} of {data.rows.length} rows
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-accent-50">
              {data.headers.map((header) => (
                <TableHeader
                  key={header}
                  header={header}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  filters={filters}
                  onFilter={handleFilter}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-accent-50 transition-colors"
              >
                {data.headers.map((header, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="px-4 py-3 text-sm border-b border-accent-100"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No matching data found
        </div>
      )}
    </div>
  );
}