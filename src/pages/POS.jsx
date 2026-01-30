import { useState } from 'react';
import POSSidebar from '../components/pos/POSSidebar';
import MenuGrid from '../components/pos/MenuGrid';
import OrderPanel from '../components/pos/OrderPanel';
import ReceiptModal from '../components/pos/ReceiptModal';
import { menuItems, branches } from '../utils/mockData';
import { addSale } from '../utils/localStorage';

const POS = () => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);
  const [orderItems, setOrderItems] = useState([]);
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

  const handleCompleteSale = () => {
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
      paymentMethod: 'Cash',
      timestamp: new Date().toISOString(),
      cashier: 'Jane Doe'
    };

    addSale(sale);
    setLastSale(sale);
    setShowReceipt(true);
  };

  const handleNewOrder = () => {
    setOrderItems([]);
  };

  return (
    <div className="flex h-screen bg-cream overflow-hidden">
      {/* Left Sidebar */}
      <POSSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* Branch Selector */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-accent">Branch</h1>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(parseInt(e.target.value))}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-lg font-semibold text-accent focus:border-primary focus:outline-none"
              >
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name} - {branch.location}
                  </option>
                ))}
              </select>
              <span className="px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-bold">
                Open
              </span>
            </div>

            {/* Date and Time */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm font-medium hidden md:block">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })} at {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <MenuGrid menuItems={menuItems} onAddItem={handleAddItem} />
      </main>

      {/* Right Order Panel */}
      <OrderPanel
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCompleteSale={handleCompleteSale}
      />

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
