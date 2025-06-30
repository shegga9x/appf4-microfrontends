import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'large', 
  color = '#1877f2',
  className = ''
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6', 
    large: 'w-8 h-8'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <span
        className="block animate-spin rounded-full border-2 border-gray-200 border-t-2"
        style={{
          borderTopColor: color,
          width: '100%',
          height: '100%',
        }}
      ></span>
    </div>
  );
}

export default LoadingSpinner;
