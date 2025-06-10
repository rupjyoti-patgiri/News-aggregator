// src/pages/AllNewsPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllNews } from '../services/newsApi';
import useNews from '../hooks/useNews';
import NewsList from '../components/NewsList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

const AllNewsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || 'latest';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [currentQuery, setCurrentQuery] = useState(initialQuery);

  const {
    articles,
    loading,
    error,
    currentPage,
    totalPages,
    totalResults,
    handlePageChange,
    updateParams,
    setCurrentPage,
  } = useNews(fetchAllNews, { query: initialQuery, page: initialPage, pageSize: DEFAULT_PAGE_SIZE });

  useEffect(() => {
    document.title = `All News - ${currentQuery} - Page ${currentPage}`;
    setSearchParams({ q: currentQuery, page: currentPage.toString() });
  }, [currentPage, currentQuery, setSearchParams]);

 
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
    const queryFromUrl = searchParams.get('q') || 'latest';
    if (queryFromUrl !== currentQuery) {
        setCurrentQuery(queryFromUrl);
        updateParams({ query: queryFromUrl, page: pageFromUrl, pageSize: DEFAULT_PAGE_SIZE });
    }
  }, [searchParams, currentPage, currentQuery, updateParams, setCurrentPage]);


  const handleSearch = (searchQuery) => {
    setCurrentQuery(searchQuery);
    updateParams({ query: searchQuery, page: 1, pageSize: DEFAULT_PAGE_SIZE });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4 text-neutral-dark dark:text-white">Explore All News</h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
        Find articles on any topic you're interested in.
      </p>
      <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />
      
      <NewsList
        articles={articles}
        loading={loading}
        error={error}
        title={loading ? "Searching..." : `Results for "${currentQuery}"`}
      />
      
      {!loading && !error && articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            handlePageChange(newPage);
            window.scrollTo(0, 0); 
          }}
          totalResults={totalResults}
        />
      )}
    </div>
  );
};

export default AllNewsPage;