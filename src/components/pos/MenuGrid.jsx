import React, { useState } from 'react';
import MenuItem from './MenuItem';

const MenuGrid = ({ menuItems, onAddItem }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['All', 'Fish Dishes', 'Sides', 'Drinks'];
  
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none"
        />
      </div>
      
      {/* Category Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeCategory === category
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-accent hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Menu Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <MenuItem key={item.id} item={item} onAdd={onAddItem} />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No items found</p>
            <p className="text-sm">Try a different search term or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuGrid;
