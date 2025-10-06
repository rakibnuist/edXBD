'use client';

import { motion } from 'framer-motion';
import { loadingSpinner, loadingPulse } from '@/lib/animations';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'pulse' | 'dots';
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'spinner', 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const borderSizes = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4',
  };

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-blue-600 rounded-full ${className}`}
        variants={loadingPulse}
        animate="animate"
      />
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${sizeClasses[size]} bg-blue-600 rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${borderSizes[size]} border-blue-600 border-t-transparent rounded-full ${className}`}
      variants={loadingSpinner}
      animate="animate"
    />
  );
};

export default LoadingSpinner;
