// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopHeadlines, fetchAllNews } from '../services/newsApi';
import useNews from '../hooks/useNews';
import NewsList from '../components/NewsList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  // Fetch a few top headlines for the hero section
  const {
    articles: topHeadlines,
    loading: loadingHeadlines,
    error: errorHeadlines,
  } = useNews(fetchTopHeadlines, { category: 'general', page: 1, pageSize: 4 });

  // Fetch some recent general news
  const {
    articles: recentNews,
    loading: loadingRecent,
    error: errorRecent,
  } = useNews(fetchAllNews, { query: 'world', page: 1, pageSize: 6 });

  useEffect(() => {
    document.title = 'NewsDeck - Your Daily News Aggregator';
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section - Could be more elaborate */}
      <section className="text-center py-10 bg-gradient-to-r from-primary to-secondary dark:from-primary/80 dark:to-secondary/80 rounded-lg shadow-xl text-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Welcome to NewsDeck</h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4">
          Stay informed with the latest news from around the globe. Explore top headlines, search specific topics, and more.
        </p>
        <div className="space-x-4">
          <Link 
            to="/all-news" 
            className="bg-accent hover:bg-amber-400 text-neutral-dark font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
          >
            Explore All News <ArrowRight size={20} className="ml-2" />
          </Link>
          <Link 
            to="/top-headlines" 
            className="bg-transparent border-2 border-white hover:bg-yellow hover:text-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
          >
            View Top Headlines <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Top Headlines Preview */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-neutral-dark dark:text-white">Top Headlines</h2>
          <Link to="/top-headlines" className="text-primary dark:text-accent hover:underline font-medium">
            View All
          </Link>
        </div>
        {loadingHeadlines && <LoadingSpinner message="Loading top headlines..." />}
        {errorHeadlines && <ErrorMessage message={errorHeadlines} />}
        {!loadingHeadlines && !errorHeadlines && (
          <NewsList articles={topHeadlines} loading={false} error={null} title="" />
        )}
      </section>

      {/* Recent News Preview */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-neutral-dark dark:text-white">Recent News</h2>
          <Link to="/all-news?q=world" className="text-primary dark:text-accent hover:underline font-medium">
            View More
          </Link>
        </div>
        {loadingRecent && <LoadingSpinner message="Loading recent news..." />}
        {errorRecent && <ErrorMessage message={errorRecent} />}
        {!loadingRecent && !errorRecent && (
          <NewsList articles={recentNews} loading={false} error={null} title="" />
        )}
      </section>

       {/* Call to Action for Country News */}
      <section className="py-10 bg-gray-500 dark:bg-neutral-dark/70 rounded-lg shadow-lg">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-neutral-dark dark:text-white mb-4">Explore News by Country</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Discover top headlines from specific regions around the world.
          </p>
          <Link
            to="/country/us" // Default to US or make it a selection page
            className="bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
          >
            Browse Country News <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;