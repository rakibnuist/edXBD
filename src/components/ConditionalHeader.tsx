'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './Header';

const ConditionalHeader = () => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Hide header for admin and dashboard routes
  const shouldHideHeader = isClient && (pathname.startsWith('/admin') || pathname.startsWith('/dashboard'));
  
  // Debug log
  useEffect(() => {
    if (isClient) {
      console.log('ConditionalHeader - pathname:', pathname, 'shouldHideHeader:', shouldHideHeader);
    }
  }, [pathname, shouldHideHeader, isClient]);
  
  // Add/remove class to body for dashboard routes
  useEffect(() => {
    if (isClient) {
      if (shouldHideHeader) {
        document.body.classList.add('dashboard-mode');
      } else {
        document.body.classList.remove('dashboard-mode');
      }
    }
  }, [shouldHideHeader, isClient]);
  
  // Always render Header but conditionally hide it with CSS
  return (
    <div 
      className={shouldHideHeader ? 'hidden' : ''}
      style={shouldHideHeader ? { display: 'none', visibility: 'hidden', height: 0, overflow: 'hidden' } : {}}
    >
      <Header />
    </div>
  );
};

export default ConditionalHeader;
