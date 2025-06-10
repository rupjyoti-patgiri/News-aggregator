// src/components/CountrySelector.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COUNTRY_CODES } from '../utils/constants';

const CountrySelector = ({ selectedCountry, baseRoute = "/country" }) => {
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    if (countryCode) {
      navigate(`${baseRoute}/${countryCode}`);
    }
  };

  return (
    <div className="my-6">
      <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Country for Top Headlines:
      </label>
      <select
        id="country-select"
        value={selectedCountry || ''}
        onChange={handleCountryChange}
        className="w-full sm:w-auto pl-3 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary rounded-md shadow-sm bg-white dark:bg-neutral-dark/50 text-neutral-dark dark:text-neutral-light transition-colors"
      >
        <option value="" disabled>-- Select a Country --</option>
        {COUNTRY_CODES.map(country => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;