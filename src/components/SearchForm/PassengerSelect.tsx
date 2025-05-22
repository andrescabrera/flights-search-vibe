import React from 'react';
import { ChevronDown } from 'lucide-react';

interface PassengerSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const PassengerSelect: React.FC<PassengerSelectProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="input-field appearance-none pr-10"
      >
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num} {num === 1 ? 'Passenger' : 'Passengers'}
          </option>
        ))}
      </select>
      <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default PassengerSelect;