import React, { useState } from 'react';
import { FlightResult } from '../../context/FlightSearchContext';
import { ArrowRight, Clock, Luggage, Info, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';

interface FlightCardProps {
  flight: FlightResult;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };
  
  const getCurrencySymbol = (currency: string) => {
    switch(currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'JPY': return '¥';
      default: return '$';
    }
  };
  
  const getStopsLabel = (stops: number) => {
    if (stops === 0) return 'Nonstop';
    if (stops === 1) return '1 Stop';
    return `${stops} Stops`;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-md' : ''}`}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Airline Info */}
          <div className="flex items-center">
            <img 
              src={flight.airlineLogo} 
              alt={flight.airline} 
              className="w-8 h-8 object-contain mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32?text=✈️';
              }}
            />
            <div>
              <p className="font-medium">{flight.airline}</p>
              <p className="text-sm text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>
          
          {/* Flight Times */}
          <div className="flex items-center flex-grow justify-center">
            <div className="text-center">
              <p className="font-semibold text-lg">{formatTime(flight.departTime)}</p>
              <p className="text-sm text-gray-500">{flight.origin}</p>
            </div>
            
            <div className="mx-4 relative">
              <div className="border-t-2 border-gray-300 w-16 sm:w-24"></div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs text-gray-500">
                {flight.duration}
              </div>
            </div>
            
            <div className="text-center">
              <p className="font-semibold text-lg">{formatTime(flight.arrivalTime)}</p>
              <p className="text-sm text-gray-500">{flight.destination}</p>
            </div>
          </div>
          
          {/* Price */}
          <div className="flex flex-col items-end">
            <p className="font-bold text-xl text-primary-600">
              {getCurrencySymbol(flight.currency)}{flight.price}
            </p>
            <p className="text-sm text-gray-500">{getStopsLabel(flight.stops)}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-1" />
            <span>{flight.duration}</span>
          </div>
          
          <button 
            onClick={toggleExpand}
            className="flex items-center text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Less details</span>
                <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                <span>More details</span>
                <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>
        
        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-2">Flight Details</h4>
                  <p className="text-sm text-gray-600">Flight Number: {flight.flightNumber}</p>
                  <p className="text-sm text-gray-600">Aircraft: Boeing 737-800</p>
                  <p className="text-sm text-gray-600">Duration: {flight.duration}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-2">Baggage Allowance</h4>
                  <div className="flex items-center mb-1">
                    <Luggage size={16} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-600">1 Personal Item</p>
                  </div>
                  <div className="flex items-center mb-1">
                    <Luggage size={16} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-600">1 Carry-on Bag</p>
                  </div>
                  <div className="flex items-center">
                    <Luggage size={16} className="mr-2 text-gray-500" />
                    <p className="text-sm text-gray-600">Checked Bag: 23kg</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium mb-2">Fare Conditions</h4>
                  <div className="flex items-start mb-1">
                    <Info size={16} className="mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Refundable with fee</p>
                  </div>
                  <div className="flex items-start mb-1">
                    <Info size={16} className="mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Changes allowed with fee</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <button className="btn btn-primary">
                  Select Flight
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightCard;