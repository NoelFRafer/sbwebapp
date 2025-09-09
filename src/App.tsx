import React, { useState } from 'react';
import { Menu, Home, FileText, ChevronLeft, ChevronRight, User, LogOut } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&w=800",
      thrust: "our thrust:",
      quote: "to formulate a robust legislative framework for disaster preparedness, response, mitigation, and rehabilitation, ensuring the safety and resilience of the community in the face of natural calamities and emergencies",
      author: "Hon. Juan P. Enero",
      position: "Chairman, Committee on Disaster Risk Reduction Management"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&w=800",
      thrust: "our mission:",
      quote: "to serve the people of Capalonga with integrity, transparency, and dedication through effective governance and community-focused legislation",
      author: "Hon. Maria Santos",
      position: "Committee on Good Governance"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&w=800",
      thrust: "our vision:",
      quote: "a progressive and resilient Capalonga where every citizen enjoys sustainable development, quality services, and enhanced quality of life",
      author: "Hon. Roberto Cruz",
      position: "Committee on Development Planning"
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: "MOA to Boost Livelihoods of 8 Farmers' Associations",
      date: "2025-August-18",
      content: "Good news for our local farmers! The Sangguniang Bayan has given the green light for Mayor Luz E. Ricasio to sign a Memorandum of Agreement (MOA) with eight (8) farmers' associations, paving the way for the implementation of their approved livelihood projects for 2025."
    },
    {
      id: 2,
      title: "Landmark Insurance Deal for Farmers and Fisherfolk",
      date: "2025-August-16",
      content: "A Memorandum of Agreement (MOA) will provide subsidized insurance to 1,000 of Capalonga's farmers, fisherfolk, and other agricultural stakeholders."
    },
    {
      id: 3,
      title: "Outstanding Capalonqueños Recognition",
      date: "2025-August-12",
      content: "A resolution to formally honor and recognize the 'Illustrious Natives of Capalonga' who have achieved remarkable distinctions in sports, science, and culture, both locally and around the world."
    },
    {
      id: 4,
      title: "New Infrastructure Development Program",
      date: "2025-August-10",
      content: "The Sangguniang Bayan approves a comprehensive infrastructure development program aimed at improving road networks and public facilities across all barangays."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextNews = () => {
    if (currentNewsIndex < newsItems.length - 3) {
      setCurrentNewsIndex(currentNewsIndex + 1);
    }
  };

  const prevNews = () => {
    if (currentNewsIndex > 0) {
      setCurrentNewsIndex(currentNewsIndex - 1);
    }
  };

  const visibleNews = newsItems.slice(currentNewsIndex, currentNewsIndex + 3);

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
        <div className="flex items-center gap-4">
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
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-700 rounded-lg text-white">
              <Home size={18} />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 rounded-lg transition-colors">
              <FileText size={18} />
              <span>News</span>
            </a>
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
          <div className="max-w-7xl mx-auto w-full">
          {/* Vision, Mission and Trusts Section */}
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vision, Mission and Trusts ...</h2>
            
            {/* Carousel */}
            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-none">
              <div className="flex transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div key={slide.id} className="w-full flex-shrink-0 relative">
                    <div className="flex flex-col lg:flex-row items-center min-h-80 lg:min-h-96 max-w-full">
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
                      <div className="flex-shrink-0 w-full lg:w-96 lg:max-w-md">
                        <img 
                          src={slide.image} 
                          alt={slide.author}
                          className="w-full h-64 lg:h-96 object-cover max-w-full"
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
          </section>

          {/* News Section */}
          <section className="relative w-full">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevNews}
                disabled={currentNewsIndex === 0}
                className={`p-2 rounded-full transition-colors ${
                  currentNewsIndex === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextNews}
                disabled={currentNewsIndex >= newsItems.length - 3}
                className={`p-2 rounded-full transition-colors ${
                  currentNewsIndex >= newsItems.length - 3
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full max-w-full overflow-hidden">
              {visibleNews.map((news) => (
                <div key={news.id} className="bg-slate-800 text-white rounded-xl p-4 lg:p-6 hover:bg-slate-700 transition-colors overflow-hidden max-w-full">
                  <h3 className="text-base lg:text-lg font-semibold mb-3 leading-tight line-clamp-2">{news.title}</h3>
                  <p className="text-blue-300 text-sm mb-4">{news.date}</p>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">{news.content}</p>
                </div>
              ))}
            </div>
          </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-4 mt-auto">
        <p className="text-sm">© 2022. All rights reserved. SBCapalonga.com</p>
      </footer>
    </div>
  );
}

export default App;