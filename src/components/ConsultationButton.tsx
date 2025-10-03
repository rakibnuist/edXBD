'use client';

import { trackConsultationRequest } from '@/lib/analytics';
import { ConsultationButtonProps } from '@/lib/types';

export default function ConsultationButton({ text, className, source }: ConsultationButtonProps) {
  const handleClick = () => {
    trackConsultationRequest(source);
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
