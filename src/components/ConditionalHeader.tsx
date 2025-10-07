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
  
  // Render appropriate header based on route
  if (shouldHideHeader) {
    return null;
  }
  
  
  return <Header />;
};

export default ConditionalHeader;
