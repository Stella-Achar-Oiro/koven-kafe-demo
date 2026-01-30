import React, { useState } from 'react';
import Header from '../components/shared/Header';
import MenuGrid from '../components/pos/MenuGrid';
import OrderPanel from '../components/pos/OrderPanel';
import ReceiptModal from '../components/pos/ReceiptModal';
import { menuItems, branches } from '../utils/mockData';
import { addSale } from '../utils/localStorage';

const POS = () => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);
  const [orderItems, setOrderItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState(null);
  
  const handleAddItem = (item) => {
    const existingItem = orderItems.find(oi => oi.id === item.id);
    
    if (existingItem) {
      setOrderItems(orderItems.map(oi =>
        oi.id === item.id
          ? { ...oi, quantity: oi.quantity + 1 }
          : oi
      ));
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };
  
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setOrderItems(orderItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };
  
  const handleRemoveItem = (itemId) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };
  
  const handleClearOrder = () => {
    if (confirm('Are you sure you want to clear this order?')) {
      setOrderItems([]);
      setPaymentMethod('');
    }
  };
  
  const handleCompleteSale = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    if (orderItems.length === 0) {
      alert('Please add items to the order');
      return;
    }
    
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const branch = branches.find(b => b.id === selectedBranch);
    
    const sale = {
      id: `sale-${Date.now()}`,
      branchId: selectedBranch,
      branchName: branch.name,
      items: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        icon: item.icon
      })),
      total,
      paymentMethod,
      timestamp: new Date().toISOString(),
      cashier: 'Jane Doe'
    };
    
    addSale(sale);
    setLastSale(sale);
    setShowReceipt(true);
  };
  
  const handleNewOrder = () => {
    setOrderItems([]);
    setPaymentMethod('');
  };
  
  return (
    <div className="min-h-screen bg-cream">
      <Header userName="Jane Doe" userRole="Cashier" />
      
      <div className="container mx-auto px-4 py-6">
        {/* Branch Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-accent mb-2">Branch</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(parseInt(e.target.value))}
            className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none font-semibold text-accent"
          >
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>
                {branch.name} - {branch.location}
              </option>
            ))}
          </select>
        </div>
        
        {/* POS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu - 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-lg h-[calc(100vh-250px)]">
              <MenuGrid menuItems={menuItems} onAddItem={handleAddItem} />
            </div>
          </div>
          
          {/* Order Panel - 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className="h-[calc(100vh-250px)]">
              <OrderPanel
                orderItems={orderItems}
                paymentMethod={paymentMethod}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearOrder={handleClearOrder}
                onSelectPayment={setPaymentMethod}
                onCompleteSale={handleCompleteSale}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        sale={lastSale}
        onNewOrder={handleNewOrder}
      />
    </div>
  );
};

export default POS;
