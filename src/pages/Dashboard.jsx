import React, { useState, useEffect } from 'react';
import Header from '../components/shared/Header';
import SummaryCard from '../components/dashboard/SummaryCard';
import BranchPerformance from '../components/dashboard/BranchPerformance';
import TopItems from '../components/dashboard/TopItems';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { 
  branches, 
  generateInitialSales, 
  generateRandomSale, 
  calculateBranchStats,
  getTopSellingItems 
} from '../utils/mockData';
import { loadSales, saveSales, addSale } from '../utils/localStorage';
import { formatCurrency, formatDate } from '../utils/formatters';
import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize or load sales
  useEffect(() => {
    let existingSales = loadSales();
    if (!existingSales || existingSales.length === 0) {
      existingSales = generateInitialSales();
      saveSales(existingSales);
    }
    setSales(existingSales);
    setIsLoading(false);
  }, []);
  
  // Simulate real-time sales updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newSale = generateRandomSale();
      const updatedSales = addSale(newSale);
      setSales(updatedSales);
    }, 10000); // Add a sale every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate statistics
  const today = new Date().toDateString();
  const todaySales = sales.filter(s => new Date(s.timestamp).toDateString() === today);
  const totalRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
  const totalOrders = todaySales.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const branchStats = {};
  branches.forEach(branch => {
    branchStats[branch.id] = calculateBranchStats(todaySales, branch.id);
  });
  
  const topItems = getTopSellingItems(todaySales);
  
  return (
    <div className="min-h-screen bg-cream">
      <Header userName="Dr. Amakove Wala" userRole="Owner" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-accent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">{formatDate(new Date().toISOString())}</p>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Today's Revenue"
            value={formatCurrency(totalRevenue)}
            change={12}
            icon={<DollarSign />}
            isLoading={isLoading}
          />
          <SummaryCard
            title="Total Orders"
            value={totalOrders}
            change={8}
            icon={<ShoppingBag />}
            isLoading={isLoading}
          />
          <SummaryCard
            title="Avg Order Value"
            value={formatCurrency(avgOrderValue)}
            change={-3}
            icon={<TrendingUp />}
            isLoading={isLoading}
          />
        </div>
        
        {/* Branch Performance */}
        <div className="mb-8">
          <BranchPerformance branches={branches} branchStats={branchStats} />
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TopItems items={topItems} />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-accent mb-4">Quick Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-success/10 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Best Performing Branch</p>
                <p className="text-xl font-bold text-success">
                  {branches[0].name} - {formatCurrency(branchStats[1]?.revenue || 0)}
                </p>
              </div>
              <div className="p-4 bg-warning/10 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Peak Hours</p>
                <p className="text-xl font-bold text-warning">12:00 PM - 2:00 PM</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Most Popular Payment</p>
                <p className="text-xl font-bold text-primary">M-Pesa (45%)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <RecentTransactions transactions={todaySales} />
      </div>
    </div>
  );
};

export default Dashboard;
