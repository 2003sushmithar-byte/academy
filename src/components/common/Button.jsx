import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 focus:ring-slate-700 shadow-sm',
    outline: 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:ring-blue-500',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-400',
    light: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
