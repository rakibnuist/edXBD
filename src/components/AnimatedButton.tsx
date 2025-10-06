'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { buttonHover, iconBounce } from '@/lib/animations';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
}

const AnimatedButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  type = 'button',
  href,
  target,
  rel,
}: AnimatedButtonProps) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white focus:ring-blue-500 shadow-2xl hover:shadow-3xl',
    secondary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white focus:ring-blue-500 shadow-2xl hover:shadow-3xl',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-blue-600 hover:text-white focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const ButtonContent = () => (
    <>
      {loading && (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      
      {icon && iconPosition === 'left' && (
        <motion.span
          className="mr-2"
          variants={iconBounce}
          whileHover="hover"
          whileTap="tap"
        >
          {icon}
        </motion.span>
      )}
      
      <span>{children}</span>
      
      {icon && iconPosition === 'right' && (
        <motion.span
          className="ml-2"
          variants={iconBounce}
          whileHover="hover"
          whileTap="tap"
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        variants={buttonHover}
        whileHover="hover"
        whileTap="tap"
        initial="initial"
      >
        <ButtonContent />
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      variants={buttonHover}
      whileHover="hover"
      whileTap="tap"
      initial="initial"
    >
      <ButtonContent />
    </motion.button>
  );
};

export default AnimatedButton;
