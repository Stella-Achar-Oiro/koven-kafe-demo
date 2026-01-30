import React from 'react';

const Card = ({ children, className = '', padding = 'normal', hover = false }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    normal: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };
  
  const hoverClass = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
  
  return (
    <div className={`bg-white rounded-lg shadow-md ${paddingClasses[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
