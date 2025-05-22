import React from 'react';
import { ArrowUpDown, DollarSign, Clock, Plane } from 'lucide-react';

interface SortOptionsProps {
  currentSort: 'price' | 'duration' | 'departure';
  onChange: (criteria: 'price' | 'duration' | 'departure') => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onChange }) => {
  return (
    <div>
      <h4 className="font-medium mb-3 flex items-center">
        <ArrowUpDown size={16} className="mr-2 text-gray-500" />
        Sort by
      </h4>
      <div className="flex flex-wrap gap-2">
        <SortButton
          label="Price"
          icon={<DollarSign size={16} />}
          isActive={currentSort === 'price'}
          onClick={() => onChange('price')}
        />
        <SortButton
          label="Duration"
          icon={<Clock size={16} />}
          isActive={currentSort === 'duration'}
          onClick={() => onChange('duration')}
        />
        <SortButton
          label="Departure Time"
          icon={<Plane size={16} />}
          isActive={currentSort === 'departure'}
          onClick={() => onChange('departure')}
        />
      </div>
    </div>
  );
};

interface SortButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md text-sm ${
        isActive 
          ? 'bg-primary-50 text-primary-700 font-medium' 
          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
      } transition-colors`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default SortOptions;