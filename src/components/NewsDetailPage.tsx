import React from 'react';
import { ArrowLeft, Calendar, User, Loader2, AlertCircle } from 'lucide-react';
import { useNewsItem } from '../hooks/useNewsItem';

interface NewsDetailPageProps {
  newsId: string;
  onBack: () => void;
}

export function NewsDetailPage({ newsId, onBack }: NewsDetailPageProps) {
  const { newsItem, loading, error } = useNewsItem(newsId);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading article...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center p-12 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Error Loading Article
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!newsItem) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Article Not Found
          </h3>
          <p className="text-gray-500 mb-4">
            The requested news article could not be found.
          </p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Back to news list"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </button>
      </div>

      {/* Article content */}
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Article header */}
        <div className="bg-slate-800 text-white p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {newsItem.is_featured && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-yellow-600 text-yellow-100 rounded-full">
                Featured
              </span>
            )}
            {newsItem.is_priority && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-600 text-blue-100 rounded-full">
                Priority
              </span>
            )}
          </div>
          
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
            {newsItem.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-blue-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={newsItem.date}>
                {formatDate(newsItem.date)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Sangguniang Bayan ng Capalonga</span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="p-6 lg:p-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {newsItem.content}
            </div>
          </div>
        </div>

        {/* Article footer */}
        <div className="bg-gray-50 px-6 lg:px-8 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-500">
              Published on {formatDate(newsItem.date)}
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}