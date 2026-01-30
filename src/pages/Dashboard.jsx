import React, { useState, useEffect } from 'react';
import Sidebar from '../components/shared/Sidebar';
import Card from '../components/shared/Card';
import SummaryCard from '../components/dashboard/SummaryCard';
import { Menu } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
    <div className="min-h-screen bg-gradient-to-br from-cream via-secondary/10 to-cream">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-primary/10 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-primary/10 text-accent transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

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
          <Card glass>
            <h3 className="text-xl font-bold text-accent mb-4">Quick Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-success/10 backdrop-blur-sm rounded-xl border border-success/20">
                <p className="text-sm text-gray-600 mb-1">Best Performing Branch</p>
                <p className="text-xl font-bold text-success">
                  {branches[0].name} - {formatCurrency(branchStats[1]?.revenue || 0)}
                </p>
              </div>
              <div className="p-4 bg-warning/10 backdrop-blur-sm rounded-xl border border-warning/20">
                <p className="text-sm text-gray-600 mb-1">Peak Hours</p>
                <p className="text-xl font-bold text-warning">12:00 PM - 2:00 PM</p>
              </div>
              <div className="p-4 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20">
                <p className="text-sm text-gray-600 mb-1">Most Popular Payment</p>
                <p className="text-xl font-bold text-primary">M-Pesa (45%)</p>
              </div>
            </div>
          </Card>
        </div>
        
          {/* Recent Transactions */}
          <RecentTransactions transactions={todaySales} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
