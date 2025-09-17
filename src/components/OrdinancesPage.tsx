import React from 'react';
import { Scale, ExternalLink, Calendar, Clock, Loader2, AlertCircle, Search, X, Filter, Tag } from 'lucide-react';
import { useOrdinances } from '../hooks/useOrdinances';
import { PaginationControls } from './PaginationControls';

interface OrdinancesPageProps {
  onOrdinanceClick: (ordinanceId: string) => void;
}

// Helper function to count highlight tags
const countHighlightTags = (text: string) => {
  if (!text) return 0;
  const matches = text.match(/<mark>/g);
  return matches ? matches.length : 0;
};

export function OrdinancesPage({ onOrdinanceClick }: OrdinancesPageProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [categoryFilter, setCategoryFilter] = React.useState<string>('');
  const [effectiveDateStart, setEffectiveDateStart] = React.useState<string>('');
  const [effectiveDateEnd, setEffectiveDateEnd] = React.useState<string>('');
  const [isActiveFilter, setIsActiveFilter] = React.useState<boolean | undefined>(undefined);

  // Debounce search term to avoid too many API calls
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { 
    ordinances, 
    loading, 
    error,
    currentPage,
    totalPages,
    totalOrdinances,
    itemsPerPage,
    setCurrentPage
  } = useOrdinances(
    debouncedSearchTerm, 
    6, 
    categoryFilter || undefined,
    effectiveDateStart || undefined,
    effectiveDateEnd || undefined,
    isActiveFilter
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setCategoryFilter('');
    setEffectiveDateStart('');
    setEffectiveDateEnd('');
    setIsActiveFilter(undefined);
  };

  const hasActiveFilters = categoryFilter || effectiveDateStart || effectiveDateEnd || isActiveFilter !== undefined;

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status display
  const getStatusDisplay = (isActive: boolean) => {
    return isActive ? 'Active' : 'Inactive';
  };

  // Get status color
  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading ordinances...</span>
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Municipal Ordinances</h1>
        <p className="text-gray-600">
          Official ordinances enacted by the Sangguniang Bayan ng Capalonga
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search ordinances..."
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
        
        {/* Filter Toggle and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            aria-expanded={showFilters}
            aria-controls="filter-controls"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear filters
            </button>
          )}
        </div>
        
        {/* Filter Controls */}
        {showFilters && (
          <div id="filter-controls" className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g., Zoning, Budget"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Date From
                </label>
                <input
                  type="date"
                  value={effectiveDateStart}
                  onChange={(e) => setEffectiveDateStart(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Date To
                </label>
                <input
                  type="date"
                  value={effectiveDateEnd}
                  onChange={(e) => setEffectiveDateEnd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              if (isAuthEnabled && !isAuthenticated) {<div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={isActiveFilter === undefined ? '' : isActiveFilter.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    setIsActiveFilter(value === '' ? undefined : value === 'true');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>}
            </div>
          </div>
        )}
        
        {/* Search status message */}
        {loading && debouncedSearchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Searching...
          </p>
        )}
        {!loading && debouncedSearchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            {`Found ${totalOrdinances} result${totalOrdinances !== 1 ? 's' : ''} for "${debouncedSearchTerm}"`}
            {hasActiveFilters && ' with current filters'}
          </p>
        )}
      </div>

      {/* Results Area */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : ordinances.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <Scale className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {debouncedSearchTerm ? 'No matching ordinances found' : 'No ordinances available'}
          </h3>
          <p className="text-gray-500">
            {debouncedSearchTerm ? 'Try adjusting your search terms or filters.' : 'Check back later for new ordinances.'}
          </p>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 gap-6">
          {ordinances.map((ordinance) => {
            const numberMatches = countHighlightTags(ordinance.highlighted_resolution_number || '');
            const titleMatches = countHighlightTags(ordinance.highlighted_title || '');
            const descriptionMatches = countHighlightTags(ordinance.highlighted_description || '');
            const totalMatches = numberMatches + titleMatches + descriptionMatches;
            
            return (
            <div
              key={ordinance.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden"
              onClick={() => onOrdinanceClick(ordinance.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOrdinanceClick(ordinance.id);
                }
              }}
              aria-label={`View details for ${ordinance.ordinance_number}: ${ordinance.title}`}
            >
              {/* Header */}
              <div className="bg-slate-800 text-white p-4">
                <div className="flex items-start justify-between gap-2 mb-0">
                  <h3 className="text-lg font-bold text-yellow-300">
                    Ordinance: {' '}
                    {debouncedSearchTerm && ordinance.highlighted_resolution_number ? (
                      <span dangerouslySetInnerHTML={{ __html: ordinance.highlighted_resolution_number }} />
                    ) : (
                      ordinance.ordinance_number || ordinance.resolution_number
                    )}
                  </h3>

                  {debouncedSearchTerm && totalMatches > 0 && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-600 text-green-100 rounded-full flex-shrink-0">
                      {totalMatches} match{totalMatches !== 1 ? 'es' : ''}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500  mb-2">
                  {ordinance.resolution_number}
                </p>                
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ordinance.is_active)}`}>
                    {getStatusDisplay(ordinance.is_active)}
                  </span>
                  {ordinance.category && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      <Tag className="w-3 h-3 mr-1" />
                      {ordinance.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">

                <h4 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                  {debouncedSearchTerm && ordinance.highlighted_title ? (
                    <span dangerouslySetInnerHTML={{ __html: ordinance.highlighted_title }} />
                  ) : (
                    ordinance.title
                  )}
                </h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">Adopted:</span>
                    <span className="ml-1">{formatDate(ordinance.date_approved)}</span>
                  </div>

                  {ordinance.effective_date && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-green-500" />
                      <span className="font-medium">Effective:</span>
                      <span className="ml-1">{formatDate(ordinance.effective_date)}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {debouncedSearchTerm && ordinance.highlighted_description ? (
                    <span dangerouslySetInnerHTML={{ __html: ordinance.highlighted_description }} />
                  ) : (
                    ordinance.description
                  )}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                    View Details →
                  </span>
                  
                  {ordinance.file_url && (
                    <a
                      href={ordinance.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Document
                    </a>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
        
        {/* Pagination controls */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalOrdinances}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          loading={loading}
        />
        </>
      )}
    </div>
  );
}