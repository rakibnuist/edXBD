'use client';

import { useEffect } from 'react';

const MobileOptimizer = () => {
  useEffect(() => {
    // Mobile-specific optimizations
    const optimizeForMobile = () => {
      // Prevent zoom on input focus (iOS)
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
          }
        });
        
        input.addEventListener('blur', () => {
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover');
          }
        });
      });

      // Optimize touch interactions
      const addTouchOptimizations = () => {
        // Add touch-action CSS for better scrolling
        const style = document.createElement('style');
        style.textContent = `
          * {
            touch-action: manipulation;
          }
          
          .mobile-scroll-container {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          
          .mobile-touch-target {
            min-height: 44px;
            min-width: 44px;
          }
          
          @media (max-width: 768px) {
            body {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
            }
            
            input, textarea, select {
              -webkit-appearance: none;
              border-radius: 0;
            }
            
            button, a {
              -webkit-tap-highlight-color: transparent;
            }
          }
        `;
        document.head.appendChild(style);
      };

      // Optimize images for mobile
      const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          // Add loading="lazy" for better performance
          if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }
          
          // Add decoding="async" for better performance
          if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
          }
        });
      };

      // Add mobile-specific event listeners
      const addMobileEventListeners = () => {
        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
          const now = (new Date()).getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        }, false);

        // Optimize scroll performance
        let ticking = false;
        const optimizeScroll = () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              // Add any scroll optimizations here
              ticking = false;
            });
            ticking = true;
          }
        };

        window.addEventListener('scroll', optimizeScroll, { passive: true });
      };

      // Initialize all optimizations
      addTouchOptimizations();
      optimizeImages();
      addMobileEventListeners();
    };

    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeForMobile);
    } else {
      optimizeForMobile();
    }

    // Cleanup function
    return () => {
      // Remove event listeners if needed
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.removeEventListener('focus', () => {});
        input.removeEventListener('blur', () => {});
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileOptimizer;
