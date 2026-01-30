import { Trash2, Edit2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const OrderPanel = ({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onCompleteSale
}) => {
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = 0; // 0% tax
  const discount = subtotal > 5000 ? 500 : 0; // 10% discount if over KSH 5000
  const total = subtotal + tax - discount;

  return (
    <div className="w-96 bg-white flex flex-col h-screen border-l border-gray-200 hidden xl:flex">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-accent">Order Summary</h2>
          <span className="text-sm font-semibold text-gray-600">#B12309</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {orderItems.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg font-semibold mb-2">No items in order</p>
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
        <>
          <div className="border-t border-gray-200 p-6 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Taxes</span>
              <span className="font-semibold">{formatCurrency(tax)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span className="font-semibold">-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-bold text-accent pt-3 border-t border-gray-200">
              <span>Total Payment</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Order Options */}
          <div className="px-6 pb-4 space-y-3">
            <div>
              <label className="block text-sm font-bold text-accent mb-2">
                Order Type
              </label>
              <select className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none font-semibold text-accent">
                <option>Dine-in</option>
                <option>Takeaway</option>
                <option>Delivery</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-accent mb-2">
                Select Table
              </label>
              <select className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none font-semibold text-accent">
                <option>A-12B</option>
                <option>A-10</option>
                <option>B-5</option>
                <option>C-3</option>
              </select>
            </div>

            {/* Discount Badge */}
            {subtotal >= 5000 && (
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-xl border border-success/20">
                <div>
                  <p className="font-bold text-success text-sm">10% Discount Applied!</p>
                  <p className="text-xs text-gray-600">Minimum buy KSH 5,000</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <div className="p-6 pt-0">
            <button
              onClick={onCompleteSale}
              className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Confirm Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const OrderItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex gap-3 bg-cream/30 p-3 rounded-xl">
      {/* Icon */}
      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cream to-secondary/20 flex items-center justify-center text-3xl flex-shrink-0">
        {item.icon}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-accent truncate">
              {item.name} ({item.quantity})
            </h4>
            <p className="text-sm text-gray-600">
              Notes: None • Size: Large
            </p>
          </div>
          <div className="flex gap-1 ml-2 flex-shrink-0">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit2 size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1.5 hover:bg-error/10 rounded-lg transition-colors"
            >
              <Trash2 size={16} className="text-error" />
            </button>
          </div>
        </div>
        <p className="font-display font-bold text-accent text-xl">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export default OrderPanel;
