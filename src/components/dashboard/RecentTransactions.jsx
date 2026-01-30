import React from 'react';
import Card from '../shared/Card';
import { formatCurrency, formatTime } from '../../utils/formatters';
import { Clock } from 'lucide-react';

const RecentTransactions = ({ transactions }) => {
  const paymentMethodColors = {
    'Cash': 'bg-success/20 text-success',
    'M-Pesa': 'bg-warning/20 text-warning',
    'Card': 'bg-primary/20 text-primary'
  };
  
  return (
    <Card glass>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-primary" size={24} />
        <h3 className="text-xl font-bold text-accent">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-cream">
            <tr>
              <th className="text-left p-3 text-sm font-semibold text-accent">Time</th>
              <th className="text-left p-3 text-sm font-semibold text-accent">Branch</th>
              <th className="text-left p-3 text-sm font-semibold text-accent">Items</th>
              <th className="text-left p-3 text-sm font-semibold text-accent">Payment</th>
              <th className="text-right p-3 text-sm font-semibold text-accent">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 10).map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-cream/50 transition-colors">
                <td className="p-3 text-sm text-gray-600">{formatTime(transaction.timestamp)}</td>
                <td className="p-3">
                  <span className="text-sm font-semibold text-accent">{transaction.branchName}</span>
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {transaction.items.length} item{transaction.items.length > 1 ? 's' : ''}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${paymentMethodColors[transaction.paymentMethod]}`}>
                    {transaction.paymentMethod}
                  </span>
                </td>
                <td className="p-3 text-right font-display font-bold text-accent">
                  {formatCurrency(transaction.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentTransactions;
