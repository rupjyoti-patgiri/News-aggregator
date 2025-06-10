// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light dark:bg-neutral-dark transition-colors duration-300">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;