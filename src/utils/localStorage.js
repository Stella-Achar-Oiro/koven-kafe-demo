const STORAGE_KEY = 'koven_kafe_sales';

export const saveSales = (sales) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadSales = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const addSale = (sale) => {
  const sales = loadSales() || [];
  sales.unshift(sale);
  saveSales(sales);
  return sales;
};

export const clearSales = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
