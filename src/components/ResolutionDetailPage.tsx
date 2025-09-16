import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  ExternalLink, 
  Edit, 
  Trash2, 
  Share2, 
  Printer, 
  Loader2, 
  AlertCircle, 
  Star,
  Scale,
  Clock,
  User,
  Tag,
  CheckCircle
} from 'lucide-react';
import { useResolutionItem } from '../hooks/useResolutionItem';
import { useAuth } from '../hooks/useAuth';

// Check if authentication is enabled via environment variable
const isAuthEnabled = import.meta.env.VITE_ENABLE_AUTH !== 'false';

interface ResolutionDetailPageProps {
  resolutionId: string;
  onBack: () => void;
}

export function ResolutionDetailPage({ resolutionId, onBack }: ResolutionDetailPageProps) {
  const { resolution, loading, error } = useResolutionItem(resolutionId);
  const { isAdmin } = useAuth();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle action buttons
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit resolution:', resolutionId);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality with confirmation
    console.log('Delete resolution:', resolutionId);
  };

  const handleShare = () => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    // TODO: Show success toast
    console.log('Resolution URL copied to clipboard');
  };

  const handlePrint = () => {
    window.print();
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading resolution...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center p-12 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Error Loading Resolution
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Resolutions
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!resolution) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Resolution Not Found
          </h3>
          <p className="text-gray-500 mb-4">
            The requested resolution could not be found or may have been deactivated.
          </p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Resolutions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        <button
          onClick={onBack}
          className="hover:text-gray-800 transition-colors"
        >
          Resolutions
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">
          {resolution.resolution_number}
        </span>
      </nav>

      {/* Header with back button and actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors self-start"
          aria-label="Back to resolutions list"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resolutions
        </button>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Share resolution"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Print resolution"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {(!isAuthEnabled || isAdmin) && (
            <>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit resolution"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete resolution"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-800 text-white p-6 lg:p-8">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-600 text-green-100 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Active
            </div>
            
            {resolution.is_featured && (
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-600 text-yellow-100 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                Featured
              </div>
            )}
            
            {resolution.with_ordinance && (
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-purple-100 rounded-full text-sm font-medium">
                <Scale className="w-4 h-4" />
                With Ordinance
              </div>
            )}
          </div>

          {/* Resolution Number */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-blue-300 mb-1">Resolution Number</h2>
            <p className="text-2xl font-bold">{resolution.resolution_number}</p>
          </div>

          {/* Ordinance Number (if applicable) */}
          {resolution.with_ordinance && resolution.ordinance_number && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-blue-300 mb-1">Ordinance Number</h2>
              <p className="text-2xl font-bold">{resolution.ordinance_number}</p>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
            {resolution.title}
          </h1>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-blue-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <div>
                <p className="text-sm text-blue-200">Date Approved</p>
                <time dateTime={resolution.date_approved} className="font-medium">
                  {formatDate(resolution.date_approved)}
                </time>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <div>
                <p className="text-sm text-blue-200">Created</p>
                <time dateTime={resolution.created_at} className="font-medium">
                  {formatDateTime(resolution.created_at)}
                </time>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <div>
                <p className="text-sm text-blue-200">Author</p>
                <p className="font-medium">Sangguniang Bayan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resolution Content
            </h3>
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-6 rounded-lg border">
                {resolution.description}
              </div>
            </div>
          </div>

          {/* Document Link Section */}
          {resolution.file_url && (
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Associated Documents
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 mb-1">Official Resolution Document</p>
                  <p className="text-sm text-gray-500">Click to view the complete resolution document</p>
                </div>
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
            </div>
          )}

          {/* Categories/Tags Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Categories & Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                Municipal Resolution
              </span>
              {resolution.with_ordinance && (
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
                  Ordinance
                </span>
              )}
              {resolution.is_featured && (
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Featured
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {new Date(resolution.date_approved).getFullYear()}
              </span>
            </div>
          </div>

          {/* Revision History Section */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Revision History
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-800">Resolution Created</p>
                  <p className="text-sm text-gray-500">Initial version of the resolution</p>
                </div>
                <time className="text-sm text-gray-600" dateTime={resolution.created_at}>
                  {formatDateTime(resolution.created_at)}
                </time>
              </div>
              {resolution.updated_at !== resolution.created_at && (
                <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-800">Last Modified</p>
                    <p className="text-sm text-gray-500">Resolution details updated</p>
                  </div>
                  <time className="text-sm text-gray-600" dateTime={resolution.updated_at}>
                    {formatDateTime(resolution.updated_at)}
                  </time>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 lg:px-8 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-500">
              Resolution approved on {formatDate(resolution.date_approved)}
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resolutions
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-only {
            display: block !important;
          }
          
          body {
            background: white !important;
          }
          
          .bg-slate-800 {
            background: white !important;
            color: black !important;
          }
          
          .text-white {
            color: black !important;
          }
          
          .shadow-lg {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}