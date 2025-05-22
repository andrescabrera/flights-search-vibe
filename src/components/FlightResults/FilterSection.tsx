import React, { useState, useEffect } from 'react';
import { DollarSign, Plane } from 'lucide-react';

interface FilterSectionProps {
  filters: {
    maxPrice: number;
    maxStops: number;
    airlines: string[];
  };
  onChange: (filters: FilterSectionProps['filters']) => void;
  maxPrice: number;
  airlines: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  filters, 
  onChange, 
  maxPrice,
  airlines 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalFilters(prev => ({ ...prev, maxPrice: value }));
    onChange({ ...localFilters, maxPrice: value });
  };
  
  const handleStopsChange = (stops: number) => {
    setLocalFilters(prev => ({ ...prev, maxStops: stops }));
    onChange({ ...localFilters, maxStops: stops });
  };
  
  const handleAirlineChange = (airline: string) => {
    let updatedAirlines;
    if (localFilters.airlines.includes(airline)) {
      updatedAirlines = localFilters.airlines.filter(a => a !== airline);
    } else {
      updatedAirlines = [...localFilters.airlines, airline];
    }
    
    setLocalFilters(prev => ({ ...prev, airlines: updatedAirlines }));
    onChange({ ...localFilters, airlines: updatedAirlines });
  };
  
  const handleReset = () => {
    const resetFilters = {
      maxPrice: maxPrice,
      maxStops: 2,
      airlines: [],
    };
    setLocalFilters(resetFilters);
    onChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button 
          onClick={handleReset}
          className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          Reset All
        </button>
      </div>
      
      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 flex items-center">
          <DollarSign size={16} className="mr-1 text-gray-500" />
          Price
        </h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Max price:</span>
          <span className="font-medium">${localFilters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={100}
          max={maxPrice}
          step={50}
          value={localFilters.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$100</span>
          <span>${maxPrice}</span>
        </div>
      </div>
      
      {/* Stops Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 flex items-center">
          <Plane size={16} className="mr-1 text-gray-500" />
          Stops
        </h4>
        <div className="space-y-2">
          {[0, 1, 2].map((stops) => (
            <div 
              key={stops} 
              className="flex items-center"
            >
              <input
                type="radio"
                id={`stops-${stops}`}
                name="stops"
                checked={localFilters.maxStops === stops}
                onChange={() => handleStopsChange(stops)}
                className="mr-2"
              />
              <label htmlFor={`stops-${stops}`} className="cursor-pointer">
                {stops === 0 ? 'Nonstop only' : 
                 stops === 1 ? 'Up to 1 stop' : 
                 'Up to 2 stops'}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Airlines Filter */}
      {airlines.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Airlines</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {airlines.map((airline) => (
              <div 
                key={airline} 
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  id={`airline-${airline.replace(/\s+/g, '-').toLowerCase()}`}
                  checked={localFilters.airlines.includes(airline)}
                  onChange={() => handleAirlineChange(airline)}
                  className="mr-2"
                />
                <label 
                  htmlFor={`airline-${airline.replace(/\s+/g, '-').toLowerCase()}`}
                  className="cursor-pointer text-sm"
                >
                  {airline}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;