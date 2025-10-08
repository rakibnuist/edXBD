'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';

interface ConnectivityStatus {
  metaPixel: boolean;
  conversionAPI: boolean;
  gtm: boolean;
  ga4: boolean;
  errors: string[];
}

export default function ConnectivityTest() {
  const [status, setStatus] = useState<ConnectivityStatus>({
    metaPixel: false,
    conversionAPI: false,
    gtm: false,
    ga4: false,
    errors: []
  });
  const [testing, setTesting] = useState(false);

  const testConnectivity = async () => {
    setTesting(true);
    setStatus({
      metaPixel: false,
      conversionAPI: false,
      gtm: false,
      ga4: false,
      errors: []
    });

    const errors: string[] = [];

    // Test Meta Pixel
    try {
      const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
      if (!pixelId || pixelId === '1234567890') {
        errors.push('Meta Pixel ID not configured');
      } else if (typeof window !== 'undefined' && window.fbq) {
        setStatus(prev => ({ ...prev, metaPixel: true }));
      } else {
        errors.push('Meta Pixel not loaded');
      }
    } catch (error) {
      errors.push('Meta Pixel test failed');
    }

    // Test Conversion API
    try {
      const response = await fetch('/api/meta-conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType: 'test',
          data: {},
          source: 'connectivity_test'
        }),
      });

      if (response.ok) {
        setStatus(prev => ({ ...prev, conversionAPI: true }));
      } else {
        errors.push('Conversion API test failed');
      }
    } catch (error) {
      errors.push('Conversion API not accessible');
    }

    // Test GTM
    try {
      const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
      if (!gtmId || gtmId === 'GTM-XXXXXXX') {
        errors.push('GTM ID not configured');
      } else if (typeof window !== 'undefined' && window.gtag) {
        setStatus(prev => ({ ...prev, gtm: true }));
      } else {
        errors.push('GTM not loaded');
      }
    } catch (error) {
      errors.push('GTM test failed');
    }

    // Test GA4
    try {
      const ga4Id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (!ga4Id || ga4Id === 'G-XXXXXXXXXX') {
        errors.push('GA4 ID not configured');
      } else if (typeof window !== 'undefined' && window.gtag) {
        setStatus(prev => ({ ...prev, ga4: true }));
      } else {
        errors.push('GA4 not loaded');
      }
    } catch (error) {
      errors.push('GA4 test failed');
    }

    setStatus(prev => ({ ...prev, errors }));
    setTesting(false);
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const getConnectionIcon = (isActive: boolean) => {
    return isActive ? (
      <Wifi className="w-4 h-4 text-green-500" />
    ) : (
      <WifiOff className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
          Tracking Connectivity Test
        </h3>
        <button
          onClick={testConnectivity}
          disabled={testing}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm flex items-center"
        >
          {testing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Connectivity'
          )}
        </button>
      </div>

      <div className="space-y-4">
        {/* Meta Pixel */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center">
            {getConnectionIcon(status.metaPixel)}
            <span className="ml-2 font-medium">Meta Pixel</span>
            <span className="ml-2 text-sm text-gray-500">
              (ID: {process.env.NEXT_PUBLIC_META_PIXEL_ID || 'Not set'})
            </span>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status.metaPixel)}`}>
            {getStatusIcon(status.metaPixel)} {status.metaPixel ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        {/* Conversion API */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center">
            {getConnectionIcon(status.conversionAPI)}
            <span className="ml-2 font-medium">Meta Conversion API</span>
            <span className="ml-2 text-sm text-gray-500">
              (Token: {process.env.META_ACCESS_TOKEN ? 'Set' : 'Not set'})
            </span>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status.conversionAPI)}`}>
            {getStatusIcon(status.conversionAPI)} {status.conversionAPI ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        {/* GTM */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center">
            {getConnectionIcon(status.gtm)}
            <span className="ml-2 font-medium">Google Tag Manager</span>
            <span className="ml-2 text-sm text-gray-500">
              (ID: {process.env.NEXT_PUBLIC_GTM_ID || 'Not set'})
            </span>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status.gtm)}`}>
            {getStatusIcon(status.gtm)} {status.gtm ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        {/* GA4 */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center">
            {getConnectionIcon(status.ga4)}
            <span className="ml-2 font-medium">Google Analytics 4</span>
            <span className="ml-2 text-sm text-gray-500">
              (ID: {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'Not set'})
            </span>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status.ga4)}`}>
            {getStatusIcon(status.ga4)} {status.ga4 ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Errors */}
      {status.errors.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-medium text-red-800 mb-2">Issues Found:</h4>
          <ul className="text-sm text-red-600 space-y-1">
            {status.errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Quick Setup Guide:</h4>
        <div className="text-sm text-blue-600 space-y-1">
          <p>1. <strong>Meta Pixel ID:</strong> Get from Meta Business Manager → Events Manager</p>
          <p>2. <strong>Access Token:</strong> Generate in Business Settings → System Users</p>
          <p>3. <strong>Add to .env.local:</strong> NEXT_PUBLIC_META_PIXEL_ID=your_id</p>
          <p>4. <strong>Test:</strong> Click "Test Connectivity" button above</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Summary:</h4>
        <div className="text-sm text-gray-600">
          <p>
            <strong>Meta Tracking:</strong> {status.metaPixel && status.conversionAPI ? '✅ Complete' : '❌ Needs Setup'}
          </p>
          <p>
            <strong>Google Tracking:</strong> {status.gtm && status.ga4 ? '✅ Complete' : '⚠️ Optional'}
          </p>
          <p>
            <strong>Recommendation:</strong> {status.metaPixel && status.conversionAPI ? 
              'Ready for Meta campaigns!' : 
              'Configure Meta Pixel & Access Token first'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
