'use client';

import { useState, useEffect } from 'react';

interface TrackingStatus {
  metaPixel: boolean;
  metaConversionAPI: boolean;
  gtm: boolean;
  lastEvent: string | null;
  totalEvents: number;
}

export default function ConversionTrackingStatus() {
  const [status, setStatus] = useState<TrackingStatus>({
    metaPixel: false,
    metaConversionAPI: false,
    gtm: false,
    lastEvent: null,
    totalEvents: 0
  });

  useEffect(() => {
    // Check tracking status
    const checkTrackingStatus = () => {
      const metaPixel = typeof window !== 'undefined' && 
                       window.fbq && 
                       process.env.NEXT_PUBLIC_META_PIXEL_ID !== '1234567890';
      
      const gtm = typeof window !== 'undefined' && 
                  window.gtag && 
                  process.env.NEXT_PUBLIC_GTM_ID !== 'GTM-XXXXXXX';
      
      const metaConversionAPI = !!process.env.META_ACCESS_TOKEN;

      setStatus({
        metaPixel,
        metaConversionAPI,
        gtm,
        lastEvent: localStorage.getItem('lastConversionEvent') || null,
        totalEvents: parseInt(localStorage.getItem('totalConversionEvents') || '0')
      });
    };

    checkTrackingStatus();
  }, []);

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? '✅' : '❌';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Meta Conversion API Tracking Status
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Meta Pixel</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status.metaPixel)}`}>
            {getStatusIcon(status.metaPixel)} {status.metaPixel ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Meta Conversion API</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status.metaConversionAPI)}`}>
            {getStatusIcon(status.metaConversionAPI)} {status.metaConversionAPI ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Google Tag Manager</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status.gtm)}`}>
            {getStatusIcon(status.gtm)} {status.gtm ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Total Events Tracked</span>
            <span className="text-sm font-semibold text-blue-600">{status.totalEvents}</span>
          </div>
          
          {status.lastEvent && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Last Event</span>
              <span className="text-xs text-gray-500">{status.lastEvent}</span>
            </div>
          )}
        </div>
      </div>
      
      {!status.metaConversionAPI && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Setup Required:</strong> Add META_ACCESS_TOKEN to your environment variables to enable Meta Conversion API tracking.
          </p>
        </div>
      )}
    </div>
  );
}
