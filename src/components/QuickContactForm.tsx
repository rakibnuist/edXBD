'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail, MessageCircle, X, Award } from 'lucide-react';
import { modalBackdrop, modalContent, fadeInUp, scaleInCenter } from '@/lib/animations';
import EnhancedContactForm from './EnhancedContactForm';

const QuickContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-open modal on component mount - DISABLED
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsOpen(true);
  //   }, 2000); // Open after 2 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  const handleFormSubmit = () => {
        setIsSubmitted(true);
    // Close modal after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
    }, 3000);
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
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Your consultation request has been submitted successfully. Our team will contact you within 24 hours.
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* Floating Contact Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Get Free Consultation
        </div>
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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              style={modalContent}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
            </div>
            <div>
                    <h2 className="text-xl font-bold text-gray-900">Free Consultation</h2>
                    <p className="text-sm text-gray-600">Get expert advice on your study abroad journey</p>
            </div>
            </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

              {/* Form Content */}
              <div className="p-6">
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