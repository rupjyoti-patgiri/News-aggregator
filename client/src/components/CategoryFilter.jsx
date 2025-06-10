// src/components/CategoryFilter.jsx
import React from 'react';
import { NEWS_CATEGORIES } from '../utils/constants';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="my-6">
      <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Filter by Category:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full sm:w-auto pl-3 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary rounded-md shadow-sm bg-white dark:bg-neutral-dark/50 text-neutral-dark dark:text-neutral-light transition-colors"
      >
        {NEWS_CATEGORIES.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;