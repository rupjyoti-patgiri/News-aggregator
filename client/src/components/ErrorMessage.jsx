// src/components/ErrorMessage.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded-md shadow-md" role="alert">
      <div className="flex items-center">
        <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
        <div>
          <p className="font-bold">Error</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;