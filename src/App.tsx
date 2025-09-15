import React, { useState } from 'react';
import { Menu, Home, FileText, User, LogOut, Loader2, AlertCircle, Scale, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlides } from './hooks/useSlides';
import { useNews } from './hooks/useNews';
import { ImageWithFallback } from './components/ImageWithFallback';
import { ResolutionsPage } from './components/ResolutionsPage';
import { PaginationControls } from './components/PaginationControls';

// Helper function to count highlight tags
const countHighlightTags = (text: string) => {
  if (!text) return 0;
  const matches = text.match(/<mark>/g);
  return matches ? matches.length : 0;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'news' | 'resolutions'>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsSearchTerm, setNewsSearchTerm] = useState('');
  const [debouncedNewsSearchTerm, setDebouncedNewsSearchTerm] = useState('');
  
  // Debounce news search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNewsSearchTerm(newsSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [newsSearchTerm]);

  // Fetch data from Supabase
  const { slides, loading: slidesLoading, error: slidesError } = useSlides();
  const { 
    newsItems, 
    loading: newsLoading, 
    error: newsError,
    currentPage: newsCurrentPage,
    totalPages: newsTotalPages,
    totalNewsItems,
    itemsPerPage: newsItemsPerPage,
    setCurrentPage: setNewsCurrentPage
  } = useNews(debouncedNewsSearchTerm, 5);

  const clearNewsSearch = () => {
    setNewsSearchTerm('');
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading...</span>
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-600 rounded-lg transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold">The Sangguniang Bayan ng Capalonga</h1>
        </div>
        <div className="flex flex flex-col lg:flex-row  items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full">
            <User size={16} />
            <span className="text-sm">SB Capalonga</span>
          </div>
          <button className="flex items-center gap-2 px-3 py-1 hover:bg-blue-600 rounded-lg transition-colors">
            <LogOut size={16} />
            <span className="text-sm">Log out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 text-white transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0 lg:w-64`}>
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                currentPage === 'home' ? 'bg-blue-700 text-white' : 'hover:bg-slate-700'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setCurrentPage('news')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                currentPage === 'news' ? 'bg-blue-700 text-white' : 'hover:bg-slate-700'
              }`}
            >
              <FileText size={18} />
              <span>News</span>
            </button>
            <button 
              onClick={() => setCurrentPage('resolutions')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                currentPage === 'resolutions' ? 'bg-blue-700 text-white' : 'hover:bg-slate-700'
              }`}
            >
              <Scale size={18} />
              <span>Resolutions</span>
            </button>
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 w-full">
          {currentPage === 'home' && (
            <div className="max-w-7xl mx-auto w-full">
          {/* Vision, Mission and Trusts Section */}
          <section className="mb-6 lg:mb-12 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vision, Mission and Trusts ...</h2>
            
            {slidesLoading ? (
              <LoadingSpinner />
            ) : slidesError ? (
              <ErrorMessage message={slidesError} />
            ) : slides.length === 0 ? (
              <div className="text-center p-8 text-gray-500">No slides available</div>
            ) : (
            <>
            {/* Carousel */}
            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-none">
              <div className="flex transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div key={slide.id} className="w-full flex-shrink-0 relative">
                    <div className="flex flex-col pb-5 lg:pb-0 lg:flex-row items-center min-h-80 lg:min-h-96 max-w-full">
                      <div className="flex-1 p-6 lg:p-12 text-white">
                        <p className="text-yellow-400 text-lg mb-4 font-medium">{slide.thrust}</p>
                        <blockquote className="text-lg lg:text-xl leading-relaxed mb-6 font-light">
                          "{slide.quote}"
                        </blockquote>
                        <div className="text-right">
                          <p className="text-yellow-400 font-semibold">{slide.author}</p>
                          <p className="text-gray-300 text-sm">{slide.position}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-full lg:w-96 lg:max-w-md flex items-center justify-center bg-gray-800">
                        <ImageWithFallback 
                          src={slide.image_url}
                          alt={slide.author}
                          className="max-w-full pt-3 max-h-64 lg:max-h-96 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Pagination dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-blue-500' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
            </>
            )}
          </section>

          {/* News Section */}
          <section className="relative w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">News</h2>
            
            {/* Search Bar for Home Page News */}
            <div className="mb-4">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search news..."
                  value={newsSearchTerm}
                  onChange={(e) => setNewsSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {newsSearchTerm && (
                  <button
                    onClick={clearNewsSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              {/* Search status message */}
              {newsLoading && debouncedNewsSearchTerm && (
                <p className="mt-2 text-sm text-gray-600">
                  Searching news...
                </p>
              )}
              {!newsLoading && debouncedNewsSearchTerm && (
                <p className="mt-2 text-sm text-gray-600">
                  {`Found ${totalNewsItems} result${totalNewsItems !== 1 ? 's' : ''} for "${debouncedNewsSearchTerm}"`}
                </p>
              )}
            </div>
            
            {newsLoading ? (
              <LoadingSpinner />
            ) : newsError ? (
              <ErrorMessage message={newsError} />
            ) : newsItems.length === 0 ? (
              <div className="text-center p-8 text-gray-500">No news available</div>
            ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full max-w-full overflow-hidden">
              {newsItems.map((news) => {
                const titleMatches = countHighlightTags(news.highlighted_title || '');
                const contentMatches = countHighlightTags(news.highlighted_content || '');
                const totalMatches = titleMatches + contentMatches;
                
                return (
                <div key={news.id} className="bg-slate-800 text-white rounded-xl p-4 lg:p-6 hover:bg-slate-700 transition-colors overflow-hidden max-w-full">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-base lg:text-lg font-semibold leading-tight line-clamp-2 flex-1">
                      {debouncedNewsSearchTerm && news.highlighted_title ? (
                        <span dangerouslySetInnerHTML={{ __html: news.highlighted_title }} />
                      ) : (
                        news.title
                      )}
                    </h3>
                    {debouncedNewsSearchTerm && totalMatches > 0 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex-shrink-0">
                        {totalMatches} match{totalMatches !== 1 ? 'es' : ''}
                      </span>
                    )}
                  </div>
                  <p className="text-blue-300 text-sm mb-4">{formatDate(news.date)}</p>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                    {debouncedNewsSearchTerm && news.highlighted_content ? (
                      <span dangerouslySetInnerHTML={{ __html: news.highlighted_content }} />
                    ) : (
                      news.content
                    )}
                  </p>
                </div>
                );
              })}
            </div>
            
            {/* Pagination for home page news */}
            <PaginationControls
              currentPage={newsCurrentPage}
              totalPages={newsTotalPages}
              totalItems={totalNewsItems}
              itemsPerPage={newsItemsPerPage}
              onPageChange={setNewsCurrentPage}
              loading={newsLoading}
            />
            </>
            )}
          </section>
          </div>
          )}
          
          {currentPage === 'news' && (
            <div className="max-w-7xl mx-auto w-full">
              <section className="relative w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">News</h1>
                
                {/* Search Bar for News Page */}
                <div className="mb-6">
                  <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={newsSearchTerm}
                      onChange={(e) => setNewsSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    {newsSearchTerm && (
                      <button
                        onClick={clearNewsSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>
                  {/* Search status message */}
                  {newsLoading && debouncedNewsSearchTerm && (
                    <p className="mt-2 text-sm text-gray-600">
                      Searching news...
                    </p>
                  )}
                  {!newsLoading && debouncedNewsSearchTerm && (
                    <p className="mt-2 text-sm text-gray-600">
                      {`Found ${totalNewsItems} result${totalNewsItems !== 1 ? 's' : ''} for "${debouncedNewsSearchTerm}"`}
                    </p>
                  )}
                </div>
                
                {newsLoading ? (
                  <LoadingSpinner />
                ) : newsError ? (
                  <ErrorMessage message={newsError} />
                ) : newsItems.length === 0 ? (
                  <div className="text-center p-12 bg-gray-50 rounded-lg">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {debouncedNewsSearchTerm ? 'No matching news found' : 'No news available'}
                    </h3>
                    <p className="text-gray-500">
                      {debouncedNewsSearchTerm ? 'Try adjusting your search terms.' : 'Check back later for new articles.'}
                    </p>
                  </div>
                ) : (
                  <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full max-w-full overflow-hidden">
                    {newsItems.map((news) => {
                      const titleMatches = countHighlightTags(news.highlighted_title || '');
                      const contentMatches = countHighlightTags(news.highlighted_content || '');
                      const totalMatches = titleMatches + contentMatches;
                      
                      return (
                      <div key={news.id} className="bg-slate-800 text-white rounded-xl p-4 lg:p-6 hover:bg-slate-700 transition-colors overflow-hidden max-w-full">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="text-base lg:text-lg font-semibold leading-tight line-clamp-2 flex-1">
                            {debouncedNewsSearchTerm && news.highlighted_title ? (
                              <span dangerouslySetInnerHTML={{ __html: news.highlighted_title }} />
                            ) : (
                              news.title
                            )}
                          </h3>
                          {debouncedNewsSearchTerm && totalMatches > 0 && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex-shrink-0">
                              {totalMatches} match{totalMatches !== 1 ? 'es' : ''}
                            </span>
                          )}
                        </div>
                        <p className="text-blue-300 text-sm mb-4">{formatDate(news.date)}</p>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                          {debouncedNewsSearchTerm && news.highlighted_content ? (
                            <span dangerouslySetInnerHTML={{ __html: news.highlighted_content }} />
                          ) : (
                            news.content
                          )}
                        </p>
                      </div>
                      );
                    })}
                  </div>
                  
                  {/* Pagination for news page */}
                  <PaginationControls
                    currentPage={newsCurrentPage}
                    totalPages={newsTotalPages}
                    totalItems={totalNewsItems}
                    itemsPerPage={newsItemsPerPage}
                    onPageChange={setNewsCurrentPage}
                    loading={newsLoading}
                  />
                  </>
                )}
              </section>
            </div>
          )}
          
          {currentPage === 'resolutions' && (
            <ResolutionsPage />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-4 mt-auto">
        <p className="text-sm">www.sbcapalonga.com © 2022. All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;