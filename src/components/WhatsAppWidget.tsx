'use client';

import { MessageSquare, X, Award, Sparkles, Zap, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackWhatsAppClick } from '@/lib/analytics';
import { useState, useEffect } from 'react';

const WhatsAppWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  const phoneNumber = '+8801983333566';
  const message = encodeURIComponent('Hi! I want to start my study abroad journey with EduExpress International. Can you help me find scholarship opportunities?');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPopup(true);
    }, 8000);

    const hideTimer = setTimeout(() => {
      setShowInitialPopup(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFloating(!isFloating);
    }, 4000);

    return () => clearInterval(interval);
  }, [isFloating]);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('floating_widget');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Creative Initial Popup */}
      <AnimatePresence>
        {showInitialPopup && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, x: 100, scale: 0.8, rotate: 10 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 max-w-xs"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 relative overflow-hidden">
              {/* Creative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full -translate-y-8 translate-x-8 opacity-30" />
              
              <div className="relative z-10">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Scholarship Expert Available!</h4>
                    <p className="text-gray-600 text-xs mb-2">
                      Get instant help with your study abroad and scholarship questions
                    </p>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWhatsAppClick}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
                      >
                        Chat Now
                      </motion.button>
                      <button
                        onClick={() => setShowInitialPopup(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Creative Floating Widget */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-xs relative overflow-hidden"
            >
              {/* Creative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full -translate-y-10 translate-x-10 opacity-30" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">EduExpress International</h4>
                    <p className="text-green-600 text-xs flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                      Online now
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-xs mb-3">
                  Need help with scholarships? Our experts are here to guide you!
                </p>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Start Chat
                  </motion.button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Creative Main Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: isFloating ? [-5, 5, -5] : 0,
            rotate: isFloating ? [-2, 2, -2] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
          
          {/* Main Button */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl border-2 border-white">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            
            {/* Scholarship Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-white" />
            </div>
            
            {/* Sparkle Effects */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: 0.5
              }}
              className="absolute -top-1 -left-1"
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </motion.div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: 1
              }}
              className="absolute -bottom-1 -right-1"
            >
              <Zap className="w-2 h-2 text-blue-400" />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default WhatsAppWidget;