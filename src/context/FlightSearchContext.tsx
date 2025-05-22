import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { addDays, format } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';

// Types
export interface SearchParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: number;
  cabinClass: string;
}

export interface FlightResult {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
}

interface FlightSearchContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  flightResults: FlightResult[];
  isLoading: boolean;
  error: string | null;
  performSearch: (params: SearchParams) => void;
  recentSearches: SearchParams[];
  clearRecentSearches: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
}

const defaultSearchParams: SearchParams = {
  origin: '',
  destination: '',
  departDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
  returnDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
  passengers: 1,
  cabinClass: 'economy',
};

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(undefined);

export const useFlightSearch = () => {
  const context = useContext(FlightSearchContext);
  if (!context) {
    throw new Error('useFlightSearch must be used within a FlightSearchProvider');
  }
  return context;
};

interface FlightSearchProviderProps {
  children: ReactNode;
}

export const FlightSearchProvider: React.FC<FlightSearchProviderProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams);
  const [flightResults, setFlightResults] = useState<FlightResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<SearchParams[]>([]);
  const [currency, setCurrency] = useState<string>('USD');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Parse URL parameters if on search page
  useEffect(() => {
    if (location.pathname === '/search' && location.search) {
      const params = new URLSearchParams(location.search);
      const originParam = params.get('origin');
      const destinationParam = params.get('destination');
      
      if (originParam && destinationParam) {
        const urlParams: SearchParams = {
          origin: originParam,
          destination: destinationParam,
          departDate: params.get('departDate') || defaultSearchParams.departDate,
          returnDate: params.get('returnDate') || defaultSearchParams.returnDate,
          passengers: Number(params.get('passengers')) || defaultSearchParams.passengers,
          cabinClass: params.get('cabinClass') || defaultSearchParams.cabinClass,
        };
        
        setSearchParams(urlParams);
        performSearch(urlParams);
      }
    }
  }, [location.pathname, location.search]);

  // Mock function to fetch flights
  // In a real app, this would call the SERP API
  const performSearch = (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    
    // Save to recent searches
    const updatedSearches = [
      params,
      ...recentSearches.filter(
        s => !(s.origin === params.origin && s.destination === params.destination)
      )
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    
    // Build query parameters for URL
    const queryParams = new URLSearchParams({
      origin: params.origin,
      destination: params.destination,
      departDate: params.departDate,
      returnDate: params.returnDate,
      passengers: params.passengers.toString(),
      cabinClass: params.cabinClass,
    });
    
    // Navigate to search results page with query parameters
    if (location.pathname !== '/search') {
      navigate(`/search?${queryParams.toString()}`);
    }
    
    // Mock API call with setTimeout
    setTimeout(() => {
      // This would be the actual API call in a real application
      // const results = await api.searchFlights(params);
      
      // Generate mock results
      const mockResults = generateMockResults(params);
      setFlightResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };
  
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Function to generate mock flight results
  const generateMockResults = (params: SearchParams): FlightResult[] => {
    const airlines = [
      { name: 'Delta Air Lines', logo: 'https://logo.clearbit.com/delta.com' },
      { name: 'American Airlines', logo: 'https://logo.clearbit.com/aa.com' },
      { name: 'United Airlines', logo: 'https://logo.clearbit.com/united.com' },
      { name: 'Southwest Airlines', logo: 'https://logo.clearbit.com/southwest.com' },
      { name: 'JetBlue Airways', logo: 'https://logo.clearbit.com/jetblue.com' },
      { name: 'British Airways', logo: 'https://logo.clearbit.com/britishairways.com' },
      { name: 'Lufthansa', logo: 'https://logo.clearbit.com/lufthansa.com' },
      { name: 'Air France', logo: 'https://logo.clearbit.com/airfrance.com' },
    ];
    
    return Array.from({ length: 10 }, (_, i) => {
      const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
      const randomStops = Math.floor(Math.random() * 3);
      const basePrice = 200 + Math.floor(Math.random() * 800);
      const adjustedPrice = params.cabinClass === 'economy' 
        ? basePrice 
        : params.cabinClass === 'business' 
          ? basePrice * 3 
          : basePrice * 5;
      
      return {
        id: `flight-${i + 1}`,
        airline: randomAirline.name,
        airlineLogo: randomAirline.logo,
        flightNumber: `${randomAirline.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 1000) + 100}`,
        origin: params.origin,
        destination: params.destination,
        departTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        arrivalTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        duration: `${2 + Math.floor(Math.random() * 10)}h ${Math.floor(Math.random() * 60)}m`,
        stops: randomStops,
        price: adjustedPrice,
        currency: currency,
      };
    }).sort((a, b) => a.price - b.price);
  };

  return (
    <FlightSearchContext.Provider 
      value={{
        searchParams,
        setSearchParams,
        flightResults,
        isLoading,
        error,
        performSearch,
        recentSearches,
        clearRecentSearches,
        currency,
        setCurrency,
      }}
    >
      {children}
    </FlightSearchContext.Provider>
  );
};