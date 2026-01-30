export const branches = [
  { id: 1, name: "Bomas", location: "Bomas of Kenya", status: "active" },
  { id: 2, name: "Kahawa", location: "Kahawa Wendani", status: "active" },
  { id: 3, name: "Syokimau", location: "Syokimau", status: "active" }
];

export const menuItems = [
  { id: 1, name: "Grilled Tilapia Fish", price: 900, category: "Fish Dishes", icon: "🐟" },
  { id: 2, name: "Fried Fish", price: 850, category: "Fish Dishes", icon: "🐟" },
  { id: 3, name: "Spinach + Kid Fry", price: 400, category: "Sides", icon: "🥬" },
  { id: 4, name: "Kachumbari", price: 150, category: "Sides", icon: "🥗" },
  { id: 5, name: "Ugali", price: 100, category: "Sides", icon: "🍚" },
  { id: 6, name: "Chips", price: 200, category: "Sides", icon: "🍟" },
  { id: 7, name: "Plantains", price: 150, category: "Sides", icon: "🍌" },
  { id: 8, name: "Salad", price: 200, category: "Sides", icon: "🥗" },
  { id: 9, name: "Soda", price: 80, category: "Drinks", icon: "🥤" },
  { id: 10, name: "Water", price: 50, category: "Drinks", icon: "💧" },
  { id: 11, name: "Juice", price: 150, category: "Drinks", icon: "🧃" }
];

export const paymentMethods = ["Cash", "M-Pesa", "Card"];

// Generate initial mock sales data
export const generateInitialSales = () => {
  const sales = [];
  const today = new Date();
  
  // Generate sales for today
  for (let i = 0; i < 50; i++) {
    const hour = Math.floor(Math.random() * 12) + 8; // 8am to 8pm
    const minute = Math.floor(Math.random() * 60);
    const saleTime = new Date(today);
    saleTime.setHours(hour, minute, 0, 0);
    
    const branchId = Math.floor(Math.random() * 3) + 1;
    const numItems = Math.floor(Math.random() * 4) + 1;
    const items = [];
    let total = 0;
    
    for (let j = 0; j < numItems; j++) {
      const item = menuItems[Math.floor(Math.random() * menuItems.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({ ...item, quantity });
      total += item.price * quantity;
    }
    
    sales.push({
      id: `sale-${i}`,
      branchId,
      branchName: branches.find(b => b.id === branchId).name,
      items,
      total,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      timestamp: saleTime.toISOString(),
      cashier: `Cashier ${Math.floor(Math.random() * 3) + 1}`
    });
  }
  
  return sales.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Generate a random sale
export const generateRandomSale = () => {
  const branchId = Math.floor(Math.random() * 3) + 1;
  const numItems = Math.floor(Math.random() * 4) + 1;
  const items = [];
  let total = 0;
  
  for (let j = 0; j < numItems; j++) {
    const item = menuItems[Math.floor(Math.random() * menuItems.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    items.push({ ...item, quantity });
    total += item.price * quantity;
  }
  
  return {
    id: `sale-${Date.now()}`,
    branchId,
    branchName: branches.find(b => b.id === branchId).name,
    items,
    total,
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    timestamp: new Date().toISOString(),
    cashier: `Cashier ${Math.floor(Math.random() * 3) + 1}`
  };
};

// Calculate branch statistics
export const calculateBranchStats = (sales, branchId) => {
  const branchSales = sales.filter(s => s.branchId === branchId);
  const today = new Date().toDateString();
  const todaySales = branchSales.filter(s => new Date(s.timestamp).toDateString() === today);
  
  const revenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
  const orders = todaySales.length;
  
  // Mock percentage change (would be calculated from yesterday's data in real app)
  const change = Math.floor(Math.random() * 30) - 10;
  
  return { revenue, orders, change };
};

// Get top selling items
export const getTopSellingItems = (sales) => {
  const itemCounts = {};
  
  sales.forEach(sale => {
    sale.items.forEach(item => {
      if (!itemCounts[item.id]) {
        itemCounts[item.id] = {
          ...item,
          quantity: 0,
          revenue: 0
        };
      }
      itemCounts[item.id].quantity += item.quantity;
      itemCounts[item.id].revenue += item.price * item.quantity;
    });
  });
  
  return Object.values(itemCounts)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
};
