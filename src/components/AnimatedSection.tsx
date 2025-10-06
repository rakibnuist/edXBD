'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'stagger';
  delay?: number;
  duration?: number;
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.3
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px 0px',
    amount: 0.1
  });

  const getAnimationVariants = (): Variants => {
    if (animation === 'stagger') {
      return {
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      };
    }

    const baseVariants: Record<string, Variants> = {
      fadeInUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
      },
      fadeInDown: {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: 1, y: 0 },
      },
      fadeInLeft: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
      },
      fadeInRight: {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
      },
      scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
      },
    };

    const selectedVariant = baseVariants[animation];
    
    return {
      initial: selectedVariant.initial,
      animate: {
        ...selectedVariant.animate,
        transition: {
          duration,
          ease: [0.4, 0, 0.2, 1],
          delay,
        },
      },
    };
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants}
      className={className}
    >
      {animation === 'stagger' ? (
        <motion.div variants={{
          initial: { opacity: 0, y: 20 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        }}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};

// Individual animated item for stagger animations
export const AnimatedItem = ({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
