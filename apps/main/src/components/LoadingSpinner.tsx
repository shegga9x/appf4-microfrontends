interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export default function LoadingSpinner({ 
    size = 'large', 
  color = '#1877f2',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6', 
    large: 'w-8 h-8'
  };

  return (
    <div className={`loading-spinner ${sizeClasses[size]} ${className}`}>
      <div className="spinner"></div>
      
      <style jsx>{`
        .loading-spinner {
          display: inline-block;
        }
        
        .spinner {
          width: 100%;
          height: 100%;
          border: 2px solid #f3f3f3;
          border-top: 2px solid ${color};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
