// src/components/NewsCard.jsx
import React from 'react';
import placeholderImage from '../assets/images/placeholder.png'; 
import { ExternalLink, CalendarDays, UserCircle } from 'lucide-react';

const NewsCard = ({ article }) => {
  const { title, description, url, urlToImage, publishedAt, source, author } = article;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <div className="bg-white dark:bg-neutral-dark/60 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <img
        className="w-full h-48 object-cover news-card-image"
        src={urlToImage || placeholderImage}
        alt={title || 'News article image'}
        onError={handleImageError}
      />
      <div className="p-5 bg-violet-500 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2 text-neutral-dark dark:text-white line-clamp-2" title={title}>
          {title || "Untitled Article"}
        </h3>
        <p className="text-gray-900 dark:text-gray-300 text-base mb-3 line-clamp-3 flex-grow">
          {description || "No description available."}
        </p>
        <div className="mt-auto">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <CalendarDays size={16} className="mr-2 text-primary" />
            <span>{formatDate(publishedAt)}</span>
          </div>
          {author && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">
              <UserCircle size={16} className="mr-2 text-primary" />
              <span className="truncate" title={author}>{author}</span>
            </div>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="inline-block bg-primary/10 dark:bg-primary/20 rounded-full px-3 py-1 text-sm font-semibold text-primary dark:text-accent mr-2 mb-2">
              {source?.name || 'Unknown Source'}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary dark:text-accent hover:underline font-semibold text-sm group"
            >
              Read More
              <ExternalLink size={16} className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;