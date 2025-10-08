'use client';

import { useEffect } from 'react';
import { trackDestinationView } from '@/lib/analytics';

interface DestinationTrackingProps {
  countryName: string;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
}

export default function DestinationTracking({ countryName, userData }: DestinationTrackingProps) {
  useEffect(() => {
    // Track destination page view with Meta Conversion API
    const trackDestinationPageView = async () => {
      try {
        await fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'destination_view',
            data: {
              countryName,
              userData
            },
            source: 'destination_page'
          }),
        });
      } catch (error) {
        console.error('Failed to track destination view:', error);
      }
    };

    // Track with client-side analytics
    trackDestinationView(countryName);
    
    // Track with Meta Conversion API
    trackDestinationPageView();
  }, [countryName, userData]);

  return null; // This component doesn't render anything
}
