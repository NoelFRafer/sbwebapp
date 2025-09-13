import React from 'react';
import { FileText, ExternalLink, Calendar, Loader2, AlertCircle, Search, X } from 'lucide-react';
import { useResolutions } from '../hooks/useResolutions';

// Helper function to highlight search terms
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;
  
  // Split search terms and create regex pattern for OR logic
  const terms = searchTerm
    .trim()
    .split(/\s+/)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape regex special characters
    .filter(term => term.length > 0);
  
  if (terms.length === 0) return text;
  
  const pattern = new RegExp(`(${terms.join('|')})`, 'gi');
  return text.replace(pattern, '<mark>$1</mark>');
};

// Helper function to count matches in text
const countMatches = (text: string, searchTerm: string) => {
  if (!searchTerm.trim() || !text) return 0;
  
  const terms = searchTerm
    .trim()
    .split(/\s+/)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .filter(term => term.length > 0);
  
  if (terms.length === 0) return 0;
  
  let totalMatches = 0;
  const lowerText = text.toLowerCase();
  
  terms.forEach(term => {
    const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) {
      totalMatches += matches.length;
    }
  });
  
  return totalMatches;
};

// Helper function to calculate total matches for a resolution
const calculateTotalMatches = (resolution: Resolution, searchTerm: string) => {
  const titleMatches = countMatches(resolution.title, searchTerm);
  const descriptionMatches = countMatches(resolution.description, searchTerm);
  const numberMatches = countMatches(resolution.resolution_number, searchTerm);
  
  return titleMatches + descriptionMatches + numberMatches;
};

// Helper function to sort resolutions by match count
const sortByMatches = (resolutions: Resolution[], searchTerm: string) => {
  if (!searchTerm.trim()) return resolutions;
  
  return [...resolutions].sort((a, b) => {
    const matchesA = calculateTotalMatches(a, searchTerm);
    const matchesB = calculateTotalMatches(b, searchTerm);
    
    // Primary sort: by match count (descending)
    if (matchesA !== matchesB) {
      return matchesB - matchesA;
    }
    
    // Secondary sort: by date (descending) for ties
    return new Date(b.date_approved).getTime() - new Date(a.date_approved).getTime();
  });
};
export function ResolutionsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState('');

  // Debounce search term to avoid too many API calls
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { resolutions, loading, error } = useResolutions(debouncedSearchTerm);

  // Sort resolutions by match count when there's a search term
  const sortedResolutions = React.useMemo(() => {
    return sortByMatches(resolutions, debouncedSearchTerm);
  }, [resolutions, debouncedSearchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading resolutions...</span>
    </div>
  );

  // Error component
  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center p-8 text-red-600">
      <AlertCircle className="w-6 h-6 mr-2" />
      <span>{message}</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header - Always visible */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Resolutions</h1>
        <p className="text-gray-600">
          Official resolutions passed by the Sangguniang Bayan ng Capalonga
        </p>
      </div>

      {/* Search Bar - Always visible */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search resolutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        {/* Search status message */}
        {loading && debouncedSearchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Searching...
          </p>
        )}
        {!loading && debouncedSearchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            {`Found ${sortedResolutions.length} result${sortedResolutions.length !== 1 ? 's' : ''} for "${debouncedSearchTerm}"`}
          </p>
        )}
      </div>

      {/* Results Area - Conditional based on state */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : sortedResolutions.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {debouncedSearchTerm ? 'No matching resolutions found' : 'No resolutions available'}
          </h3>
          <p className="text-gray-500">
            {debouncedSearchTerm ? 'Try adjusting your search terms.' : 'Check back later for new resolutions.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedResolutions.map((resolution) => {
            const totalMatches = debouncedSearchTerm ? calculateTotalMatches(resolution, debouncedSearchTerm) : 0;
            
            return (
            <div
              key={resolution.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {resolution.resolution_number}
                    </span>
                    {debouncedSearchTerm && totalMatches > 0 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {totalMatches} match{totalMatches !== 1 ? 'es' : ''}
                      </span>
                    )}
                    {resolution.with_ordinance && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        With Ordinance
                      </span>
                    )}
                    {resolution.is_featured && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: highlightText(resolution.resolution_number, debouncedSearchTerm) 
                      }} 
                    />
                  </h2>  
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: highlightText(resolution.title, debouncedSearchTerm) 
                      }} 
                    />
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(resolution.date_approved)}
                  </div>
                  
                  <div className="text-gray-600 leading-relaxed">
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: highlightText(resolution.description, debouncedSearchTerm) 
                      }} 
                    />
                  </div>
                </div>
                
                {resolution.file_url && (
                  <div className="flex-shrink-0">
                    <a
                      href={resolution.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Document
                    </a>
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}