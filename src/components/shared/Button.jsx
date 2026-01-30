import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95';

  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-2xl hover:scale-105',
    secondary: 'bg-secondary hover:bg-secondary/90 text-accent shadow-lg hover:shadow-2xl hover:scale-105',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-xl',
    ghost: 'text-primary hover:bg-primary/10',
    danger: 'bg-error hover:bg-error/90 text-white shadow-lg hover:shadow-2xl hover:scale-105'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
