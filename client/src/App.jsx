// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AllNewsPage from './pages/AllNewsPage';
import TopHeadlinesPage from './pages/TopHeadlinesPage';
import CountryNewsPage from './pages/CountryNewsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="all-news" element={<AllNewsPage />} />
          <Route path="top-headlines" element={<TopHeadlinesPage />} />
          <Route path="country/:countryCode" element={<CountryNewsPage />} />
    
          <Route path="country" element={<CountryNewsPage />} /> 

        </Route>
      </Routes>
    </Router>
  );
}

export default App;