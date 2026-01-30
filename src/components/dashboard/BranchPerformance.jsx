import React from 'react';
import Card from '../shared/Card';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Circle } from 'lucide-react';

const BranchPerformance = ({ branches, branchStats }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-accent mb-4">Branch Performance</h3>
      <div className="space-y-4">
        {branches.map(branch => {
          const stats = branchStats[branch.id] || { revenue: 0, orders: 0, change: 0 };
          const isPositive = stats.change >= 0;
          
          return (
            <div key={branch.id} className="flex items-center justify-between p-4 bg-cream rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 flex-1">
                <Circle 
                  className={`${branch.status === 'active' ? 'text-success fill-success' : 'text-gray-400'}`} 
                  size={12} 
                />
                <div className="flex-1">
                  <p className="font-bold text-accent">{branch.name}</p>
                  <p className="text-sm text-gray-600">{branch.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-lg text-accent">
                  {formatCurrency(stats.revenue)}
                </p>
                <div className="flex items-center gap-1 text-sm justify-end">
                  <span className="text-gray-600">{stats.orders} orders</span>
                  <span className={`flex items-center gap-1 ml-2 ${isPositive ? 'text-success' : 'text-error'}`}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(stats.change)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default BranchPerformance;
