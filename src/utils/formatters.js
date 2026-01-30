// Format currency to KSH
export const formatCurrency = (amount) => {
  return `KSH ${amount.toLocaleString('en-KE')}`;
};

// Format date and time
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-KE', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (dateString) => {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

// Format percentage
export const formatPercentage = (value) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value}%`;
};

// Get greeting based on time
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};
