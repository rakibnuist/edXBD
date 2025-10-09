'use client';

import { trackConsultationRequest } from '@/lib/analytics';
import { trackEvent, getUserDevice } from '@/lib/vercel-analytics';
import { ConsultationButtonProps } from '@/lib/types';

export default function ConsultationButton({ text, className, source }: ConsultationButtonProps) {
  const handleClick = () => {
    trackConsultationRequest(source);
    
    // Track with Vercel Analytics
    trackEvent('consultation_request', {
      page: window.location.pathname,
      source: source,
      device: getUserDevice(),
      button_text: text
    });
    
    window.dispatchEvent(new CustomEvent('openQuickForm'));
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {text}
    </button>
  );
}
