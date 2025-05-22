import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Airline Info */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        
        {/* Flight Times */}
        <div className="flex items-center flex-grow justify-center">
          <div className="text-center">
            <div className="h-5 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
          
          <div className="mx-4 relative">
            <div className="border-t-2 border-gray-200 w-16 sm:w-24"></div>
          </div>
          
          <div className="text-center">
            <div className="h-5 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        
        {/* Price */}
        <div className="flex flex-col items-end">
          <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;