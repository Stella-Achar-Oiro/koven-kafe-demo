import React from 'react';
import { Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const MenuItem = ({ item, onAdd }) => {
  return (
    <button
      onClick={() => onAdd(item)}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 text-left w-full"
    >
      <div className="text-5xl mb-3 text-center">{item.icon}</div>
      <h3 className="font-semibold text-accent mb-1 text-sm md:text-base">{item.name}</h3>
      <div className="flex items-center justify-between">
        <span className="font-display font-bold text-primary text-lg">
          {formatCurrency(item.price)}
        </span>
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
          <Plus size={16} />
        </div>
      </div>
    </button>
  );
};

export default MenuItem;
