import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsByCountry } from '../services/newsApi';
import useNews from '../hooks/useNews';
import NewsList from '../components/NewsList';
import Pagination from '../components/Pagination';
import CountrySelector from '../components/CountrySelector';
import { DEFAULT_PAGE_SIZE, COUNTRY_CODES } from '../utils/constants';

const CountryNewsPage = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!COUNTRY_CODES.find(c => c.value === countryCode)) {
      navigate('/country/us', { replace: true });
    }
  }, [countryCode, navigate]);

  const {
    articles,
    loading,
    error,
    currentPage,
    totalPages,
    totalResults,
    handlePageChange,
    updateParams,
  } = useNews(fetchNewsByCountry, { 
    code: countryCode, 
    page: 1, 
    pageSize: DEFAULT_PAGE_SIZE 
  });

  
  useEffect(() => {
    
    updateParams({ code: countryCode, page: 1 });
  }, [countryCode, updateParams]);

  const handlePageChangeWithScroll = (newPage) => {
    handlePageChange(newPage);
    window.scrollTo(0, 0);
  };

  const country = COUNTRY_CODES.find(c => c.value === countryCode);
  const countryName = country ? country.label : 'Selected Country';

  useEffect(() => {
    document.title = `News from ${countryName} - Page ${currentPage}`;
  }, [countryName, currentPage]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4 text-neutral-dark dark:text-white">
        Top Headlines from {countryName}
      </h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-6">
        Browse news by selecting a country below.
      </p>
      <div className="flex justify-center">
        <CountrySelector selectedCountry={countryCode} />
      </div>

      <NewsList
        articles={articles}
        loading={loading}
        error={error}
        title={loading ? "Fetching news..." : `Latest from ${countryName}`}
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

export default CountryNewsPage;