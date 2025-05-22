import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  value, 
  onChange, 
  minDate, 
  maxDate,
  disabled = false
}) => {
  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        max={maxDate}
        disabled={disabled}
        className={`input-field pl-10 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default DatePicker;