import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const OrderItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-cream rounded-lg">
      <div className="text-2xl">{item.icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-accent text-sm">{item.name}</p>
        <p className="text-xs text-gray-600">{formatCurrency(item.price)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        >
          <Minus size={14} />
        </button>
        <span className="font-bold text-accent w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-display font-bold text-accent">
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="text-error hover:bg-error/10 p-2 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
