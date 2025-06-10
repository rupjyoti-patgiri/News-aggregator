// src/components/NewsList.jsx
import React from 'react';
import NewsCard from './NewsCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const NewsList = ({ articles, loading, error, title = "News Articles" }) => {
  if (loading) {
    return <LoadingSpinner message={`Fetching ${title}...`} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2 text-neutral-dark dark:text-neutral-light">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">No articles found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-neutral-dark dark:text-white">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={article.url || index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;