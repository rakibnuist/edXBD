'use client';

import { useState } from 'react';
import { useMetaTracking } from '@/hooks/useMetaTracking';
import CountryCodePhoneInput from './CountryCodePhoneInput';
import { Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  program: string;
  message: string;
  city: string;
  state: string;
  zipCode: string;
}

interface EnhancedContactFormProps {
  formType?: 'contact' | 'consultation' | 'application' | 'scholarship' | 'partnership';
  source?: string;
  title?: string;
  description?: string;
  showCountry?: boolean;
  showProgram?: boolean;
  showMessage?: boolean;
  showLocation?: boolean;
  className?: string;
  onSubmit?: () => void; // Callback for form submission
}

const EnhancedContactForm: React.FC<EnhancedContactFormProps> = ({
  formType = 'contact',
  source = 'website',
  title = 'Get Free Consultation',
  description = 'Fill out the form below and our experts will contact you within 24 hours.',
  showCountry = true,
  showProgram = true,
  showMessage = true,
  showLocation = false,
  className = '',
  onSubmit
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    program: '',
    message: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
  
  const { trackFormSubmission, trackButtonClick } = useMetaTracking();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log('Form already submitting, ignoring duplicate submission');
      return;
    }

    // Prevent rapid successive submissions (within 2 seconds)
    const now = Date.now();
    if (now - lastSubmissionTime < 2000) {
      console.log('Form submitted too recently, ignoring duplicate submission');
      return;
    }
    setLastSubmissionTime(now);
    
    setIsSubmitting(true);
    setError(null);

    try {
      // Client-side validation
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Please fill in all required fields (Name, Email, Phone)');
        setIsSubmitting(false);
        return;
      }

      // Additional validation for empty strings
      if (formData.name.trim() === '' || formData.email.trim() === '' || formData.phone.trim() === '') {
        setError('Please fill in all required fields (Name, Email, Phone)');
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }

      // Ensure message field has a value (required by API)
      const submitData = {
        ...formData,
        message: formData.message || 'Consultation request from ' + formData.country,
        formType,
        source
      };

      console.log('Submitting form data:', submitData);
      console.log('Form validation check:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        program: formData.program
      });
      console.log('Field lengths:', {
        nameLength: formData.name?.length || 0,
        emailLength: formData.email?.length || 0,
        phoneLength: formData.phone?.length || 0
      });
      console.log('Form state at submission:', {
        isSubmitting,
        isSubmitted,
        error
      });

      // Track form submission with enhanced Meta tracking (completely non-blocking)
      setTimeout(() => {
        try {
          trackFormSubmission(formType, formData, source);
        } catch (trackingError) {
          console.warn('Meta tracking error (non-blocking):', trackingError);
        }
      }, 0);

      // Submit form data to your API
      console.log('Making API request to /api/contact');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Success result:', result);

      setIsSubmitted(true);
      
      // Track successful submission (completely non-blocking)
      setTimeout(() => {
        try {
          trackButtonClick('consultation', source, {
            email: formData.email,
            firstName: formData.name.split(' ')[0],
            lastName: formData.name.split(' ').slice(1).join(' '),
            country: formData.country
          });
        } catch (trackingError) {
          console.warn('Success tracking error (non-blocking):', trackingError);
        }
      }, 0);

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit();
      }

    } catch (err) {
      console.error('Form submission error:', err);
      console.error('Error type:', typeof err);
      console.error('Error name:', err instanceof Error ? err.name : 'Unknown');
      console.error('Error message:', err instanceof Error ? err.message : String(err));
      console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace');
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to submit form. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackButtonClick('whatsapp', source, {
      email: formData.email,
      firstName: formData.name.split(' ')[0],
      lastName: formData.name.split(' ').slice(1).join(' '),
      country: formData.country
    });
  };

  const handlePhoneClick = () => {
    trackButtonClick('phone', source, {
      email: formData.email,
      firstName: formData.name.split(' ')[0],
      lastName: formData.name.split(' ').slice(1).join(' '),
      country: formData.country
    });
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700 mb-4">
          Your {formType} request has been submitted successfully. Our team will contact you within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              country: '',
              program: '',
              message: '',
              city: '',
              state: '',
              zipCode: ''
            });
            setError(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white/98 backdrop-blur-lg rounded-xl shadow-2xl border border-white/30 p-4 ${className}`}>
      <div className="text-center mb-3">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg"
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-1">
            Phone Number *
          </label>
          <div className="border border-gray-300/60 rounded-lg focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md focus-within:shadow-lg">
            <CountryCodePhoneInput
              value={formData.phone}
              onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
              placeholder="Enter your phone number"
              required
              error={error && formData.phone === '' ? 'Phone number is required' : undefined}
            />
          </div>
        </div>

        {/* Country */}
        {showCountry && (
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Study Destination
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a country</option>
              <option value="UK">United Kingdom</option>
              <option value="China">China</option>
              <option value="South Korea">South Korea</option>
              <option value="Hungary">Hungary</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Finland">Finland</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Georgia">Georgia</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Program */}
        {showProgram && (
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
              Program of Interest
            </label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a program</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Master">Master's Degree</option>
              <option value="PhD">PhD</option>
              <option value="Diploma">Diploma</option>
              <option value="Certificate">Certificate</option>
              <option value="Language Course">Language Course</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Location fields */}
        {showLocation && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your state"
                />
              </div>
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your ZIP code"
              />
            </div>
          </>
        )}

        {/* Message */}
        {showMessage && (
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-gray-800 mb-0.5">
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us more about your study abroad goals..."
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Enhanced Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-bold text-sm shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="flex items-center justify-center space-x-2 relative z-10">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Request</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </div>
        </button>
      </form>

      {/* Contact options */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-center text-xs text-gray-600 mb-2">Or contact us directly:</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://wa.me/8801983333566"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <span>📱</span>
            <span>WhatsApp</span>
          </a>
          <a
            href="tel:+8801983333566"
            onClick={handlePhoneClick}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>📞</span>
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnhancedContactForm;
