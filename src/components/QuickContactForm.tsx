'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail, MessageCircle, X, Award } from 'lucide-react';
import { modalBackdrop, modalContent, fadeInUp, scaleInCenter } from '@/lib/animations';
import EnhancedContactForm from './EnhancedContactForm';

const QuickContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Listen for custom event to open modal from CTA buttons
  useEffect(() => {
    const handleOpenQuickForm = () => {
      setIsOpen(true);
    };

    window.addEventListener('openQuickForm', handleOpenQuickForm);

    return () => {
      window.removeEventListener('openQuickForm', handleOpenQuickForm);
    };
  }, []);

  const handleFormSubmit = () => {
    // This callback is called when the form is successfully submitted
    setIsSubmitted(true);
    // Close modal after 2 seconds
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
    }, 2000);
  };

  if (isSubmitted) {
  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/95 backdrop-blur-md rounded-lg p-3 max-w-xs w-full text-center shadow-lg border border-white/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
            </motion.div>
            <motion.h3 
              className="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank You!
            </motion.h3>
            <motion.p 
              className="text-gray-600 text-xs leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Your consultation request has been submitted successfully. Our team will contact you within 24 hours.
            </motion.p>
            
            {/* Success animation */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* Enhanced Floating Contact Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group border border-white/20 backdrop-blur-sm"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageCircle className="w-7 h-7" />
        </motion.div>
        <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-md text-white px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-white/10">
          Get Free Consultation
        </div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 animate-pulse" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={modalBackdrop}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/98 backdrop-blur-lg rounded-2xl max-w-lg w-full max-h-[75vh] overflow-y-auto shadow-2xl border border-white/30"
              style={modalContent}
            >
              {/* Enhanced Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/60 to-purple-50/60 rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Award className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Free Consultation</h2>
                    <p className="text-sm text-gray-600">Get expert advice on your study abroad journey</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100/80 rounded-full transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </motion.button>
              </div>

              {/* Form Content */}
              <div className="p-4">
                <EnhancedContactForm
                  formType="consultation"
                  source="quick_contact_modal"
                  title=""
                  description=""
                  showCountry={true}
                  showProgram={true}
                  showMessage={true}
                  showLocation={false}
                  className=""
                  onSubmit={handleFormSubmit}
                />
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default QuickContactForm;