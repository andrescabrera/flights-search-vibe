import React, { useState } from 'react';
import { useFlightSearch } from '../../context/FlightSearchContext';
import { DollarSign, ChevronDown } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useFlightSearch();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelect = (currencyCode: string) => {
    setCurrency(currencyCode);
    setIsOpen(false);
  };
  
  const getCurrentSymbol = () => {
    const curr = currencies.find(c => c.code === currency);
    return curr ? curr.symbol : '$';
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center btn btn-secondary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <DollarSign size={16} className="mr-1" />
        {currency}
        <ChevronDown size={16} className="ml-1" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleSelect(curr.code)}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  currency === curr.code 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{curr.symbol}</span>
                {curr.name} ({curr.code})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;