import React from 'react';
import Card from '../shared/Card';
import { formatCurrency } from '../../utils/formatters';
import { Flame } from 'lucide-react';

const TopItems = ({ items }) => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-warning" size={24} />
        <h3 className="text-xl font-bold text-accent">Top Selling Items Today</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-cream rounded-lg hover:bg-secondary/20 transition-colors">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
              #{index + 1}
            </div>
            <div className="text-3xl">{item.icon}</div>
            <div className="flex-1">
              <p className="font-semibold text-accent">{item.name}</p>
              <p className="text-sm text-gray-600">{item.quantity} sold</p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-primary">
                {formatCurrency(item.revenue)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopItems;
