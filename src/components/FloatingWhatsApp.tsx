'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { trackContactInteraction, getUserDevice } from '@/lib/vercel-analytics';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export default function FloatingWhatsApp({ 
  phoneNumber = '+8801234567890',
  message = 'Hi! I\'m interested in studying abroad. Can you help me?',
  className = ''
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Show the widget after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    setIsClicked(true);
    
    // Track WhatsApp interaction
    trackContactInteraction('whatsapp', {
      page: window.location.pathname,
      source: 'floating_widget',
      device: getUserDevice(),
      phone_number: phoneNumber
    });
    
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const whatsappPhone = cleanPhone.startsWith('880') ? cleanPhone : `880${cleanPhone}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappPhone}?text=${encodedMessage}`, '_blank');
    
    // Reset click state
    setTimeout(() => setIsClicked(false), 1000);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fadeIn">
          <div className="flex items-center">
            <span>Need help with study abroad?</span>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-14 h-14 bg-green-500 hover:bg-green-600 
          rounded-full shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          transform hover:scale-110 active:scale-95
          ${isClicked ? 'animate-pulse' : ''}
          focus:outline-none focus:ring-4 focus:ring-green-300
          flex items-center justify-center
          group
        `}
        title="Chat with us on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <FaWhatsapp 
          className={`w-8 h-8 text-white transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}
        />

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
          !
        </div>
      </button>

      {/* Ripple Effect */}
      {isClicked && (
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></div>
      )}
    </div>
  );
}
