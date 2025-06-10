// src/pages/TopHeadlinesPage.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchTopHeadlines } from '../services/newsApi';
import useNews from '../hooks/useNews';
import NewsList from '../components/NewsList';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import { DEFAULT_PAGE_SIZE, NEWS_CATEGORIES } from '../utils/constants';

const TopHeadlinesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial params from URL or set defaults
  const initialCategory = searchParams.get('category') || 'general';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const {
    articles,
    loading,
    error,
    currentPage,
    totalPages,
    totalResults,
    handlePageChange,
    updateParams,
  } = useNews(fetchTopHeadlines, { 
    category: initialCategory, 
    page: initialPage, 
    pageSize: DEFAULT_PAGE_SIZE 
  });

  // This effect will run whenever currentPage or the category in the search params changes
  useEffect(() => {
    const category = searchParams.get('category') || 'general';
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    // Update the hook's internal state to trigger a refetch
    updateParams({ category, page, pageSize: DEFAULT_PAGE_SIZE });

    // Update the document title
    const categoryLabel = NEWS_CATEGORIES.find(c => c.value === category)?.label || 'General';
    document.title = `Top Headlines - ${categoryLabel} - Page ${page}`;

  }, [searchParams, updateParams]);


  const handleCategoryChange = (newCategory) => {
    // When category changes, update URL params and go to page 1
    setSearchParams({ category: newCategory, page: '1' });
  };

  const handlePageChangeWithScroll = (newPage) => {
    // When page changes, update URL params
    const currentCategory = searchParams.get('category') || 'general';
    setSearchParams({ category: currentCategory, page: newPage.toString() });
    window.scrollTo(0, 0);
  };
  
  const currentCategory = searchParams.get('category') || 'general';
  const categoryLabel = NEWS_CATEGORIES.find(c => c.value === currentCategory)?.label || currentCategory;

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4 text-neutral-dark dark:text-white">Top Headlines</h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-6">
        Discover the latest breaking news and top stories from various categories.
      </p>
      <div className="flex justify-center">
        <CategoryFilter selectedCategory={currentCategory} onCategoryChange={handleCategoryChange} />
      </div>
      
      <NewsList
        articles={articles}
        loading={loading}
        error={error}
        title={loading ? "Fetching headlines..." : `Top ${categoryLabel} Headlines`}
      />

      {!loading && !error && articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChangeWithScroll}
          totalResults={totalResults}
        />
      )}
    </div>
  );
};

export default TopHeadlinesPage;