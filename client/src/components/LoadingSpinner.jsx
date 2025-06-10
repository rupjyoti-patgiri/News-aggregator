// src/components/LoadingSpinner.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 48, message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <Loader2 className="animate-spin text-primary" style={{ width: size, height: size }} />
      {message && <p className="text-lg text-neutral-dark dark:text-neutral-light">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;