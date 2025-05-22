import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface CityInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Mock popular airports data
const popularAirports = [
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai' },
  { code: 'HND', name: 'Haneda Airport', city: 'Tokyo' },
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam' },
  { code: 'FCO', name: 'Leonardo da Vinci International Airport', city: 'Rome' },
];

const CityInput: React.FC<CityInputProps> = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof popularAirports>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Filter suggestions based on input
    if (value.length > 0) {
      const filtered = popularAirports.filter(
        airport => 
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleSuggestionClick = (airport: typeof popularAirports[0]) => {
    setInputValue(`${airport.city} (${airport.code})`);
    onChange(`${airport.city} (${airport.code})`);
    setSuggestions([]);
    setIsFocused(false);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    if (inputValue.length > 0) {
      const filtered = popularAirports.filter(
        airport => 
          airport.city.toLowerCase().includes(inputValue.toLowerCase()) ||
          airport.code.toLowerCase().includes(inputValue.toLowerCase()) ||
          airport.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(popularAirports.slice(0, 5));
    }
  };
  
  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        onChange(inputValue);
      }
    }, 200);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder || "Enter city or airport"}
          className="input-field pl-10"
        />
        <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div 
          ref={suggestionRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((airport, index) => (
            <div
              key={airport.code}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleSuggestionClick(airport)}
            >
              <div className="flex items-center">
                <span className="font-medium">{airport.city}</span>
                <span className="ml-1 text-gray-500">({airport.code})</span>
              </div>
              <div className="text-sm text-gray-500 truncate">{airport.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityInput;