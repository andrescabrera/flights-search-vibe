import React, { useState } from 'react';
import { useFlightSearch, FlightResult } from '../../context/FlightSearchContext';
import FlightCard from './FlightCard';
import FilterSection from './FilterSection';
import SortOptions from './SortOptions';
import { ArrowUpDown, Clock, DollarSign, Filter } from 'lucide-react';
import LoadingSkeleton from './LoadingSkeleton';
import CurrencySelector from './CurrencySelector';

const FlightResults: React.FC = () => {
  const { flightResults, isLoading, searchParams, currency } = useFlightSearch();
  const [sortCriteria, setSortCriteria] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState<FlightResult[]>([]);
  
  // Initial state for filters
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    maxStops: 2,
    airlines: [] as string[],
  });
  
  React.useEffect(() => {
    if (flightResults.length > 0) {
      applyFilters();
    } else {
      setFilteredResults([]);
    }
  }, [flightResults, filters, sortCriteria]);
  
  const toggleFilters = () => {
    setFilterVisible(!filterVisible);
  };
  
  const applyFilters = () => {
    let results = [...flightResults];
    
    // Apply price filter
    results = results.filter(flight => flight.price <= filters.maxPrice);
    
    // Apply stops filter
    results = results.filter(flight => flight.stops <= filters.maxStops);
    
    // Apply airline filter
    if (filters.airlines.length > 0) {
      results = results.filter(flight => filters.airlines.includes(flight.airline));
    }
    
    // Apply sorting
    results = sortFlights(results, sortCriteria);
    
    setFilteredResults(results);
  };
  
  const sortFlights = (flights: FlightResult[], criteria: 'price' | 'duration' | 'departure') => {
    return [...flights].sort((a, b) => {
      if (criteria === 'price') {
        return a.price - b.price;
      } else if (criteria === 'duration') {
        // Convert duration strings to minutes for comparison
        const getDurationMinutes = (duration: string) => {
          const match = duration.match(/(\d+)h\s*(\d+)m/);
          if (match) {
            return parseInt(match[1]) * 60 + parseInt(match[2]);
          }
          return 0;
        };
        return getDurationMinutes(a.duration) - getDurationMinutes(b.duration);
      } else if (criteria === 'departure') {
        // Convert departure times to minutes for comparison
        const getTimeMinutes = (time: string) => {
          const [hours, minutes] = time.split(':').map(Number);
          return hours * 60 + minutes;
        };
        return getTimeMinutes(a.departTime) - getTimeMinutes(b.departTime);
      }
      return 0;
    });
  };
  
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (criteria: 'price' | 'duration' | 'departure') => {
    setSortCriteria(criteria);
  };
  
  const getUniqueAirlines = () => {
    return Array.from(new Set(flightResults.map(flight => flight.airline)));
  };
  
  const getMaxPrice = () => {
    if (flightResults.length === 0) return 2000;
    return Math.ceil(Math.max(...flightResults.map(flight => flight.price)) / 100) * 100;
  };
  
  const displayedResults = filteredResults.length > 0 ? filteredResults : flightResults;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">
          {isLoading ? 'Searching flights...' : (
            displayedResults.length > 0 
              ? `${searchParams.origin} to ${searchParams.destination}`
              : 'No flights found'
          )}
        </h2>
        
        <div className="flex items-center gap-4">
          <CurrencySelector />
          
          <button 
            onClick={toggleFilters}
            className="flex items-center btn btn-secondary"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Section (visible on larger screens or when toggled) */}
        <div className={`md:block ${filterVisible ? 'block' : 'hidden'}`}>
          <FilterSection 
            filters={filters} 
            onChange={handleFilterChange}
            maxPrice={getMaxPrice()}
            airlines={getUniqueAirlines()}
          />
        </div>
        
        {/* Flight Results */}
        <div className="md:col-span-3">
          {isLoading ? (
            // Loading skeletons
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {displayedResults.length > 0 ? (
                <>
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <SortOptions 
                      currentSort={sortCriteria}
                      onChange={handleSortChange}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    {displayedResults.map((flight) => (
                      <FlightCard key={flight.id} flight={flight} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <img 
                    src="https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="No flights found" 
                    className="w-full max-w-md mx-auto h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">No flights match your criteria</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search for different dates.</p>
                  <button 
                    onClick={() => setFilters({
                      maxPrice: getMaxPrice(),
                      maxStops: 2,
                      airlines: [],
                    })}
                    className="btn btn-primary"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightResults;