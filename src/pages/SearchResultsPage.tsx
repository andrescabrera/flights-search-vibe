import React, { useEffect } from 'react';
import { useFlightSearch } from '../context/FlightSearchContext';
import SearchForm from '../components/SearchForm';
import FlightResults from '../components/FlightResults';

const SearchResultsPage: React.FC = () => {
  const { isLoading, flightResults } = useFlightSearch();
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <SearchForm isCompact={true} />
        </div>
        
        <FlightResults />
      </div>
    </div>
  );
};

export default SearchResultsPage;