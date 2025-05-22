import React from 'react';
import { ChevronDown } from 'lucide-react';

interface CabinClassSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CabinClassSelect: React.FC<CabinClassSelectProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field appearance-none pr-10"
      >
        <option value="economy">Economy</option>
        <option value="premium_economy">Premium Economy</option>
        <option value="business">Business</option>
        <option value="first">First Class</option>
      </select>
      <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default CabinClassSelect;