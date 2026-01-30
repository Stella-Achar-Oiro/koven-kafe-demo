import React from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { Printer, CheckCircle } from 'lucide-react';

const ReceiptModal = ({ isOpen, onClose, sale, onNewOrder }) => {
  if (!sale) return null;
  
  const handleNewOrder = () => {
    onNewOrder();
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={handleNewOrder} title="Sale Completed" size="md">
      <div className="space-y-6">
        {/* Success Message */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4">
            <CheckCircle className="text-success" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-accent mb-2">Payment Successful!</h3>
          <p className="text-gray-600">Sale ID: {sale.id}</p>
        </div>
        
        {/* Receipt */}
        <div className="bg-cream p-6 rounded-lg space-y-4">
          <div className="text-center border-b pb-4">
            <h4 className="text-2xl font-display font-bold text-primary">Koven Kafe</h4>
            <p className="text-sm text-gray-600">A Fishy Affair</p>
            <p className="text-xs text-gray-500 mt-2">{sale.branchName} Branch</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date & Time:</span>
              <span className="text-accent">{formatDateTime(sale.timestamp)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cashier:</span>
              <span className="text-accent">{sale.cashier}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment:</span>
              <span className="font-semibold text-accent">{sale.paymentMethod}</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h5 className="font-semibold text-accent mb-3">Items</h5>
            <div className="space-y-2">
              {sale.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <span className="text-accent">{item.name}</span>
                    <span className="text-gray-600 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-semibold text-accent">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-display font-bold text-accent">
              <span>Total</span>
              <span>{formatCurrency(sale.total)}</span>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-500 pt-4 border-t">
            <p>Thank you for your business!</p>
            <p>Visit us again soon 🐟</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => window.print()}
          >
            <Printer size={18} />
            Print Receipt
          </Button>
          <Button
            fullWidth
            onClick={handleNewOrder}
          >
            New Order
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReceiptModal;
