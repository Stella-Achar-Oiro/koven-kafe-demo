import React from 'react';
import { Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const MenuItem = ({ item, onAdd }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
      {/* Availability Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-success text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          ● Available
        </span>
      </div>

      {/* Item Image/Icon Container */}
      <div className="relative bg-gradient-to-br from-cream to-secondary/20 p-8 flex items-center justify-center h-48">
        <div className="text-6xl group-hover:scale-110 transition-transform">{item.icon}</div>
      </div>

      {/* Item Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-accent text-base leading-tight">{item.name}</h3>
          <span className="font-display font-bold text-accent text-xl ml-2 whitespace-nowrap">
            {formatCurrency(item.price)}
          </span>
        </div>

        {/* Add to Cart Button - Using dark accent color for high contrast */}
        <button
          onClick={() => onAdd(item)}
          className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
        >
          <Plus size={20} strokeWidth={2.5} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
