import React from 'react';
import Card from '../shared/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCard = ({ title, value, change, icon, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }
  
  const isPositive = change >= 0;
  
  return (
    <Card className="transition-all hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-display font-bold text-accent mb-2 animate-count-up">
            {value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-error'}`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="font-semibold">{Math.abs(change)}%</span>
              <span className="text-gray-600">vs yesterday</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-primary text-4xl opacity-20">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SummaryCard;
