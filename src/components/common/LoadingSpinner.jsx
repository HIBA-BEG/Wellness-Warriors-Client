import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-light-green"></div>
      <span className="ml-2 text-light-green">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;