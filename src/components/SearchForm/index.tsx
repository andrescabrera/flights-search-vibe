import React, { useState } from 'react';
import { useFlightSearch } from '../../context/FlightSearchContext';
import { Plane, Calendar, Users, RefreshCw, MapPin } from 'lucide-react';
import CityInput from './CityInput';
import DatePicker from './DatePicker';
import PassengerSelect from './PassengerSelect';
import CabinClassSelect from './CabinClassSelect';

interface SearchFormProps {
  isCompact?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ isCompact = false }) => {
  const { searchParams, setSearchParams, performSearch } = useFlightSearch();
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchParams);
  };
  
  const handleSwitchLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const handleTripTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isRound = e.target.value === 'round';
    setIsRoundTrip(isRound);
    
    if (!isRound) {
      setSearchParams(prev => ({
        ...prev,
        returnDate: '',
      }));
    } else {
      setSearchParams(prev => ({
        ...prev,
        returnDate: prev.returnDate || searchParams.returnDate,
      }));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`card ${isCompact ? 'p-4' : 'p-6 md:p-8'} animate-fade-in`}
    >
      <div className={`grid gap-4 ${isCompact ? 'md:grid-cols-5' : 'md:grid-cols-1'}`}>
        {!isCompact && (
          <div className="flex space-x-4 mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="round"
                checked={isRoundTrip}
                onChange={handleTripTypeChange}
                className="mr-2"
              />
              Round Trip
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="oneway"
                checked={!isRoundTrip}
                onChange={handleTripTypeChange}
                className="mr-2"
              />
              One Way
            </label>
          </div>
        )}
        
        <div className={`grid gap-4 ${isCompact ? 'md:grid-cols-5 md:col-span-5' : 'md:grid-cols-2'}`}>
          <div className="relative">
            <div className="flex items-center mb-2">
              <MapPin size={16} className="text-gray-500 mr-2" />
              <label className="text-sm font-medium text-gray-700">From</label>
            </div>
            <CityInput
              value={searchParams.origin}
              onChange={(value) => setSearchParams(prev => ({ ...prev, origin: value }))}
              placeholder="City or airport"
            />
          </div>
          
          {!isCompact && (
            <button 
              type="button" 
              onClick={handleSwitchLocations}
              className="absolute left-1/2 top-16 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 md:block hidden z-10"
              aria-label="Switch locations"
            >
              <RefreshCw size={16} className="text-primary-600" />
            </button>
          )}
          
          <div className="relative">
            <div className="flex items-center mb-2">
              <MapPin size={16} className="text-gray-500 mr-2" />
              <label className="text-sm font-medium text-gray-700">To</label>
            </div>
            <CityInput
              value={searchParams.destination}
              onChange={(value) => setSearchParams(prev => ({ ...prev, destination: value }))}
              placeholder="City or airport"
            />
          </div>
        </div>
        
        <div className={`grid gap-4 ${isCompact ? 'md:grid-cols-5 md:col-span-5' : 'md:grid-cols-2'}`}>
          <div>
            <div className="flex items-center mb-2">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <label className="text-sm font-medium text-gray-700">Departure</label>
            </div>
            <DatePicker
              value={searchParams.departDate}
              onChange={(value) => setSearchParams(prev => ({ ...prev, departDate: value }))}
              minDate={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          {(isRoundTrip || (!isCompact && searchParams.returnDate)) && (
            <div>
              <div className="flex items-center mb-2">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <label className="text-sm font-medium text-gray-700">Return</label>
              </div>
              <DatePicker
                value={searchParams.returnDate}
                onChange={(value) => setSearchParams(prev => ({ ...prev, returnDate: value }))}
                minDate={searchParams.departDate}
                disabled={!isRoundTrip}
              />
            </div>
          )}
        </div>
        
        <div className={`grid gap-4 ${isCompact ? 'md:grid-cols-5 md:col-span-5' : 'md:grid-cols-2'}`}>
          <div>
            <div className="flex items-center mb-2">
              <Users size={16} className="text-gray-500 mr-2" />
              <label className="text-sm font-medium text-gray-700">Passengers</label>
            </div>
            <PassengerSelect
              value={searchParams.passengers}
              onChange={(value) => setSearchParams(prev => ({ ...prev, passengers: value }))}
            />
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Plane size={16} className="text-gray-500 mr-2" />
              <label className="text-sm font-medium text-gray-700">Cabin Class</label>
            </div>
            <CabinClassSelect
              value={searchParams.cabinClass}
              onChange={(value) => setSearchParams(prev => ({ ...prev, cabinClass: value }))}
            />
          </div>
        </div>
        
        <div className={isCompact ? 'md:col-span-5' : ''}>
          <button 
            type="submit" 
            className={`btn btn-primary w-full flex items-center justify-center ${
              isCompact ? 'py-2' : 'py-3 text-lg'
            }`}
          >
            <Plane className="mr-2" size={isCompact ? 18 : 24} />
            Search Flights
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;