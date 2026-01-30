import { useState } from 'react';
import { Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const MenuGrid = ({ menuItems, onAddItem }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryCount = (category) => {
    if (category === 'All') return menuItems.length;
    return menuItems.filter(item => item.category === category).length;
  };

  const categories = [
    { id: 'All', label: 'All', count: getCategoryCount('All') },
    { id: 'Fish Dishes', label: 'Main Course', count: getCategoryCount('Fish Dishes') },
    { id: 'Sides', label: 'Sides', count: getCategoryCount('Sides') },
    { id: 'Drinks', label: 'Beverages', count: getCategoryCount('Drinks') },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-cream overflow-hidden">
      {/* Category Tabs */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} {category.count}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} onAddItem={onAddItem} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-semibold mb-2">No items found</p>
            <p className="text-sm">Try a different search term or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MenuCard = ({ item, onAddItem }) => {
  const available = true; // All items available by default

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
      {/* Image/Icon Section */}
      <div className="relative h-52 bg-gradient-to-br from-cream to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-7xl">
          {item.icon}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${
            available
              ? 'bg-success text-white'
              : 'bg-error text-white'
          }`}>
            ● {available ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <h3 className="font-bold text-accent text-xl mb-2">{item.name}</h3>
          <p className="text-3xl font-display font-bold text-accent">
            {formatCurrency(item.price)}
          </p>
        </div>

        {/* Add Button */}
        {available ? (
          <button
            onClick={() => onAddItem(item)}
            className="w-full bg-accent hover:bg-accent/90 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Plus size={22} strokeWidth={2.5} />
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-400 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed"
          >
            Not Available
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuGrid;
