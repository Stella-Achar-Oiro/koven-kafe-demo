import React from 'react';

const Card = ({ children, className = '', padding = 'normal', hover = false, glass = false }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    normal: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  const hoverClass = hover ? 'hover:shadow-2xl hover:scale-[1.02] transition-all duration-300' : '';

  const baseClass = glass
    ? 'bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl'
    : 'bg-white shadow-md';

  return (
    <div className={`${baseClass} rounded-2xl ${paddingClasses[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
