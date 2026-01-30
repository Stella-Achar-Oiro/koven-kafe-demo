import React from 'react';
import OrderItem from './OrderItem';
import Button from '../shared/Button';
import { formatCurrency } from '../../utils/formatters';
import { Trash, CreditCard, Wallet, Smartphone } from 'lucide-react';

const OrderPanel = ({ 
  orderItems, 
  paymentMethod, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearOrder, 
  onSelectPayment, 
  onCompleteSale 
}) => {
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = 0; // VAT is 0% for now
  const total = subtotal + tax;
  
  const paymentMethods = [
    { id: 'Cash', icon: <Wallet size={20} />, label: 'Cash' },
    { id: 'M-Pesa', icon: <Smartphone size={20} />, label: 'M-Pesa' },
    { id: 'Card', icon: <CreditCard size={20} />, label: 'Card' }
  ];
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-accent">Current Order</h2>
        <p className="text-sm text-gray-600">{orderItems.length} item{orderItems.length !== 1 ? 's' : ''}</p>
      </div>
      
      {/* Order Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {orderItems.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No items in order</p>
            <p className="text-sm">Add items from the menu</p>
          </div>
        ) : (
          orderItems.map(item => (
            <OrderItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>
      
      {/* Order Summary */}
      {orderItems.length > 0 && (
        <div className="p-4 border-t space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (0%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-xl font-display font-bold text-accent pt-2 border-t">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          
          {/* Payment Method Selection */}
          <div>
            <p className="text-sm font-semibold text-accent mb-2">Payment Method</p>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => onSelectPayment(method.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {method.icon}
                  <span className="text-xs font-semibold">{method.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              fullWidth
              size="lg"
              onClick={onCompleteSale}
              disabled={!paymentMethod}
            >
              Complete Sale - {formatCurrency(total)}
            </Button>
            <Button
              fullWidth
              variant="outline"
              onClick={onClearOrder}
            >
              <Trash size={18} />
              Clear Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPanel;
