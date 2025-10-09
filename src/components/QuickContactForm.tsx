'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail, MessageCircle, X, Award } from 'lucide-react';
import { modalBackdrop, modalContent, fadeInUp, scaleInCenter } from '@/lib/animations';
import { 
  trackConsultationRequest, 
  trackFormStart,
  trackFormFieldFocus,
  trackFormFieldComplete,
  trackFormValidationError,
  trackFormAbandonment,
  trackStudyAbroadFormSubmission
} from '@/lib/analytics';
import { trackFormSubmission, trackContactInteraction, getUserDevice } from '@/lib/vercel-analytics';

const QuickContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    program: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [completedFields, setCompletedFields] = useState(0);
  const [fieldFocusTimes, setFieldFocusTimes] = useState<Record<string, number>>({});

  // Auto-open modal on component mount - DISABLED
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsOpen(true);
  //     trackConsultationRequest('quick_form_auto_opened');
  //   }, 2000); // Open after 2 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  // Track form start when user first interacts
  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('quick_contact_form');
    }
  };

  // Track field focus
  const handleFieldFocus = (fieldName: string) => {
    handleFormStart();
    trackFormFieldFocus(fieldName, 'study_abroad_consultation');
    setFieldFocusTimes(prev => ({
      ...prev,
      [fieldName]: Date.now()
    }));
  };

  // Track field completion
  const handleFieldComplete = (fieldName: string, value: string) => {
    const hasValue = value.trim().length > 0;
    trackFormFieldComplete(fieldName, value);
    
    if (hasValue && !fieldFocusTimes[fieldName]) {
      setCompletedFields(prev => prev + 1);
    }
  };

  // Track form abandonment
  const handleFormAbandonment = () => {
    if (formStarted && !isSubmitted) {
      const totalFields = 6; // name, phone, email, country, program, message
      trackFormAbandonment('quick_contact_form', completedFields);
    }
  };

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
      trackConsultationRequest('quick_form_modal_opened');
    };

    window.addEventListener('openQuickForm', handleOpenModal);
    return () => window.removeEventListener('openQuickForm', handleOpenModal);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      
      // Enhanced tracking with comprehensive conversion data
      await trackStudyAbroadFormSubmission(formData);
      
      // Track with Vercel Analytics
      trackFormSubmission('contact', {
        page: 'quick_contact_form',
        source: 'modal',
        user_type: 'new',
        device: getUserDevice(),
        country: formData.country,
        program: formData.program
      });
      
      // Submit to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'website_contact_form'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          country: '',
          program: '',
          message: ''
        });
        
        // Reset tracking states
        setFormStarted(false);
        setCompletedFields(0);
        setFieldFocusTimes({});

        // Close modal after 5 seconds (increased for better UX)
        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Failed to submit form');
      }

    } catch (error) {
      // Track validation error
      trackFormValidationError('form_submission', 'api_error', 'study_abroad_consultation');
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Track field completion
    handleFieldComplete(name, value);
  };

  const handleClose = () => {
    // Track form abandonment if form was started but not submitted
    handleFormAbandonment();
    
    setIsOpen(false);
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      country: '',
      program: '',
      message: ''
    });
    
    // Reset tracking states
    setFormStarted(false);
    setCompletedFields(0);
    setFieldFocusTimes({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={handleClose}
          variants={modalBackdrop}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative mx-2 mobile-overflow-hidden mobile-scroll-smooth"
            onClick={(e) => e.stopPropagation()}
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
          >
        {/* Enhanced Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation active:bg-gray-200"
          aria-label="Close form"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Free Study Abroad Consultation</h2>
          <p className="text-gray-600">Tell us about your study abroad goals</p>
        </motion.div>

        {isSubmitted ? (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              🎉 Congratulations!
            </motion.h3>
            <motion.p 
              className="text-lg font-semibold text-green-600 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Your application has been submitted successfully!
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              We&apos;ve received your information and our expert counselors will contact you within 24 hours to discuss your study abroad journey.
            </motion.p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-blue-900 mb-2">What happens next?</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✅ Our team will review your profile</li>
                <li>✅ We&apos;ll find the best study opportunities for you</li>
                <li>✅ Prepare your application materials</li>
                <li>✅ Guide you through the entire process</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <a
                href="https://wa.me/8801983333566?text=Hi! I just submitted my study abroad application. I'd like to discuss my options."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with us on WhatsApp
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name *"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('name')}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[56px] mobile-form-input touch-manipulation"
                autoComplete="name"
                autoCapitalize="words"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('phone')}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[56px] mobile-form-input touch-manipulation"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('email')}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[56px] mobile-form-input touch-manipulation"
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('country')}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[56px] mobile-form-input touch-manipulation"
              >
                <option value="">Select Study Destination *</option>
                <option value="united-kingdom">🇬🇧 United Kingdom</option>
                <option value="finland">🇫🇮 Finland</option>
                <option value="netherlands">🇳🇱 Netherlands</option>
                <option value="china">🇨🇳 China</option>
                <option value="south-korea">🇰🇷 South Korea</option>
                <option value="hungary">🇭🇺 Hungary</option>
                <option value="cyprus">🇨🇾 Cyprus</option>
                <option value="croatia">🇭🇷 Croatia</option>
                <option value="georgia">🇬🇪 Georgia</option>
                <option value="other">🌍 Other Countries</option>
              </select>
            </div>

            <div>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('program')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[56px] mobile-form-input touch-manipulation"
              >
                <option value="">Select Program (Optional)</option>
                <option value="business">Business Administration</option>
                <option value="engineering">Engineering</option>
                <option value="medicine">Medicine</option>
                <option value="computer-science">Computer Science</option>
                <option value="arts">Arts & Humanities</option>
                <option value="sciences">Sciences</option>
                <option value="law">Law</option>
                <option value="economics">Economics</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell us about your study abroad goals and preferences..."
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('message')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[56px] resize-none mobile-form-input touch-manipulation"
                autoComplete="off"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl min-h-[56px] text-base hover:scale-105 transform touch-manipulation active:scale-95"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <motion.div 
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <Award className="w-5 h-5 mr-2" />
              )}
              {isSubmitting ? 'Sending...' : 'Get Free Study Abroad Consultation'}
            </motion.button>
          </motion.form>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:info@eduexpressint.com"
              className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Us
            </a>
            <a
              href="https://wa.me/8801983333566"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactInteraction('whatsapp', {
                page: 'quick_contact_form',
                source: 'footer_link',
                device: getUserDevice()
              })}
              className="inline-flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickContactForm;