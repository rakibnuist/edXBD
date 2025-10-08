'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { initGTM, initGA4, initMetaPixel, GTM_ID, GA4_MEASUREMENT_ID, META_PIXEL_ID } from '@/lib/analytics';

const Analytics = () => {
  useEffect(() => {
    // Initialize tracking on client side
    initGTM();
    initGA4();
    initMetaPixel();
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* Meta Pixel */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1292963899542368');
            
            // Generate unique event ID for PageView deduplication
            const pageViewEventId = 'pageview_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            fbq('track', 'PageView', {}, { eventID: pageViewEventId });
            
            // Store event ID for server-side deduplication
            window.pageViewEventId = pageViewEventId;
            
            // Send PageView to server with same event ID for deduplication
            fetch('/api/meta-conversion', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                eventType: 'page_view',
                data: {
                  pageName: document.title,
                  pageCategory: 'general',
                  eventId: pageViewEventId
                },
                source: 'client_side'
              })
            }).catch(err => console.log('PageView server tracking failed:', err));
          `,
        }}
      />

      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}');
          `,
        }}
      />

      {/* Noscript fallback for GTM */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Meta Pixel noscript fallback */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1292963899542368&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
};

export default Analytics;
