import React from 'react';
import { FileText, ExternalLink, Calendar, Loader2, AlertCircle, Search, X } from 'lucide-react';
import { useResolutions } from '../hooks/useResolutions';

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Resolutions</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Resolutions</h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Resolutions</h1>
        <p className="text-gray-600">
          Official resolutions passed by the Sangguniang Bayan ng Capalonga
        </p>
      </div>

      {/* Search Bar */}
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
        {debouncedSearchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            {loading ? 'Searching...' : `Found ${resolutions.length} result${resolutions.length !== 1 ? 's' : ''} for "${debouncedSearchTerm}"`}
          </p>
        )}
      </div>
      {resolutions.length === 0 ? (
        !loading && (
          <div className="text-center p-12 bg-gray-50 rounded-lg">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {debouncedSearchTerm ? 'No matching resolutions found' : 'No resolutions available'}
            </h3>
            <p className="text-gray-500">
              {debouncedSearchTerm ? 'Try adjusting your search terms.' : 'Check back later for new resolutions.'}
            </p>
          </div>
        )
      ) : (
        <div className="space-y-6">
          {resolutions.map((resolution) => (
            <div
              key={resolution.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                        {resolution.resolution_number}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(resolution.date_approved)}
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-medium text-gray-800 mb-3 leading-tight">
                    {resolution.title}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {resolution.description}
                  </p>
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
          ))}
        </div>
      )}
    </div>
  );
}