import React from 'react';
import { FileText, ExternalLink, Calendar, Loader2, AlertCircle, Search, X } from 'lucide-react';
import { useResolutions } from '../hooks/useResolutions';
import { PaginationControls } from './PaginationControls';

// Helper function to count highlight tags
const countHighlightTags = (text: string) => {
  if (!text) return 0;
  const matches = text.match(/<mark>/g);
  return matches ? matches.length : 0;
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

  const { 
    resolutions, 
    loading, 
    error,
    currentPage,
    totalPages,
    totalResolutions,
    itemsPerPage,
    setCurrentPage
  } = useResolutions(debouncedSearchTerm);

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
            className="block w-full pl-10 pr-10 py-2 border border-black-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
            {`Found ${totalResolutions} result${totalResolutions !== 1 ? 's' : ''} for "${debouncedSearchTerm}"`}
          </p>
        )}
      </div>

      {/* Results Area - Conditional based on state */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : resolutions.length === 0 ? (
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
        <>
        <div className="space-y-6">
          {resolutions.map((resolution) => {
            const numberMatches = countHighlightTags(resolution.highlighted_resolution_number || '');
            const titleMatches = countHighlightTags(resolution.highlighted_title || '');
            const descriptionMatches = countHighlightTags(resolution.highlighted_description || '');
            const totalMatches = numberMatches + titleMatches + descriptionMatches;
            
            return (
            <div
              key={resolution.id}
              className="bg-slate-800 text-white rounded-xl p-4 lg:p-6 hover:bg-slate-700 transition-colors overflow-hidden max-w-full"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white mb-2 px-3 py-1 bg-slate-700 rounded-md border-l-4 border-blue-400">
                    {debouncedSearchTerm && resolution.highlighted_resolution_number ? (
                      <span dangerouslySetInnerHTML={{ __html: resolution.highlighted_resolution_number }} />
                    ) : (
                      resolution.resolution_number
                    )}
                  </h2>  
                  
                  <div className="flex items-center gap-3 mb-2">
                    {debouncedSearchTerm && totalMatches > 0 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-emerald-700 text-emerald-100 rounded-full border border-emerald-600">
                        {totalMatches} match{totalMatches !== 1 ? 'es' : ''}
                      </span>
                    )}
                    {resolution.with_ordinance && (
                      <span className="inline-flex items-center px-4 py-0 text-xs font-medium bg-gray-700 text-gray-300 rounded-full border border-gray-500">
                        With Ordinance
                      </span>
                    )}
                    {resolution.is_featured && (
                      <span className="inline-flex items-center px-4 py-0 text-xs font-medium bg-gray-700 text-gray-300 rounded-full border border-gray-500">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
                    {debouncedSearchTerm && resolution.highlighted_title ? (
                      <span dangerouslySetInnerHTML={{ __html: resolution.highlighted_title }} />
                    ) : (
                      resolution.title
                    )}
                  </h3>
                  
                  <div className="flex items-center text-sm text-blue-300 mb-4">
                    <Calendar className="w-4 h-4 mr-2 text-blue-300" />
                    {formatDate(resolution.date_approved)}
                  </div>
                  
                  <div className="text-gray-300 leading-relaxed text-sm">
                    {debouncedSearchTerm && resolution.highlighted_description ? (
                      <span dangerouslySetInnerHTML={{ __html: resolution.highlighted_description }} />
                    ) : (
                      resolution.description
                    )}
                  </div>
                </div>
                
                {resolution.file_url && (
                  <div className="flex-shrink-0">
                    <a
                      href={resolution.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-200 font-medium"
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
        
        {/* Pagination controls */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalResolutions}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          loading={loading}
        />
        </>
      )}
    </div>
  );
}