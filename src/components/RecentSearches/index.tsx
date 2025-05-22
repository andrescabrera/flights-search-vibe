import React from 'react';
import { useFlightSearch } from '../../context/FlightSearchContext';
import { History, X } from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';

const RecentSearches: React.FC = () => {
  const { recentSearches, performSearch, clearRecentSearches } = useFlightSearch();
  
  if (recentSearches.length === 0) {
    return null;
  }
  
  const formatDate = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      if (isValid(date)) {
        return format(date, 'MMM d, yyyy');
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };
  
  const handleSearchClick = (index: number) => {
    performSearch(recentSearches[index]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <History size={18} className="mr-2 text-gray-500" />
          Recent Searches
        </h3>
        <button 
          onClick={clearRecentSearches}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {recentSearches.map((search, index) => (
          <div 
            key={index} 
            className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => handleSearchClick(index)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">{search.origin} → {search.destination}</div>
            </div>
            <div className="text-sm text-gray-600">
              {formatDate(search.departDate)}
              {search.returnDate && ` - ${formatDate(search.returnDate)}`}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {search.passengers} {search.passengers === 1 ? 'passenger' : 'passengers'}, {search.cabinClass.replace('_', ' ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;