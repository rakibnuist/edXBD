'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { trackConsultationRequest } from '@/lib/analytics';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          message: ''
        });
        // Track successful form submission
        trackConsultationRequest('contact_form_submission');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Contact Us</h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Get in touch with our expert counselors for a free consultation
          </p>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 sm:mb-4">How Would You Like to Connect?</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Choose your preferred way to get expert study abroad guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* WhatsApp Option */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">WhatsApp Chat</h3>
              <p className="text-gray-600 mb-6">Get instant responses and share documents easily</p>
              <a
                href="https://wa.me/8801983333566?text=Hi! I'm interested in study abroad consultation. Can you help me?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors min-h-[48px] flex items-center justify-center"
              >
                Start Chat
              </a>
            </div>

            {/* Book Appointment Option */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h3>
              <p className="text-gray-600 mb-6">Schedule a formal consultation with our experts</p>
              <button 
                onClick={() => {
                  trackConsultationRequest('contact_page_appointment');
                  window.dispatchEvent(new CustomEvent('openQuickForm'));
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors min-h-[48px] flex items-center justify-center"
              >
                Book Now
              </button>
            </div>

            {/* Contact Form Option */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Send Message</h3>
              <p className="text-gray-600 mb-6">Fill out our form for detailed consultation</p>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors min-h-[48px] flex items-center justify-center"
              >
                Fill Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Office Information & Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Visit Our Office</h2>
            <p className="text-lg text-gray-600">Come meet us in person for a personalized consultation</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Office Information */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-orange-500" />
                  Main Office
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg font-semibold">EduExpress International</p>
                  <div className="space-y-2">
                    <p>House: 12/1, Ground Floor</p>
                    <p>Road: 4/A, Dhanmondi</p>
                    <p>Dhaka - 1209, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <Phone className="w-8 h-8 text-blue-600 mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Phone Numbers</h4>
                  <p className="text-gray-700 text-sm">+880 1983-333566</p>
                  <p className="text-gray-700 text-sm">+880 1329-6663505</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <Mail className="w-8 h-8 text-green-600 mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                  <p className="text-gray-700 text-sm">info@eduexpressint.com</p>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl">
                <Clock className="w-8 h-8 text-orange-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                <p className="text-gray-700">Saturday - Thursday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-700">Friday: Closed</p>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-blue-900 mb-6">Find Us on Map</h3>
              <div className="rounded-xl overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.202884783131!2d90.37130087596677!3d23.740143478677417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9fd0e50740f%3A0x5a73c108d952b70!2sEduExpress%20International!5e0!3m2!1sen!2sbd!4v1759446242229!5m2!1sen!2sbd" 
                  width="100%" 
                  height="400" 
                  style={{border: 0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EduExpress International Location"
                ></iframe>
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Click on the map to open in Google Maps for directions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 sm:mb-4">Send Us a Message</h2>
              <p className="text-base sm:text-lg text-gray-600 px-4">Tell us about your study abroad goals and we&apos;ll help you achieve them</p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <p className="text-green-700">Message sent successfully! We&apos;ll get back to you soon.</p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <p className="text-red-700">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[48px]"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[48px]"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Study Destination
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a country</option>
                    <option value="china">China</option>
                    <option value="south-korea">South Korea</option>
                    <option value="uk">United Kingdom</option>
                    <option value="hungary">Hungary</option>
                    <option value="cyprus">Cyprus</option>
                    <option value="croatia">Croatia</option>
                    <option value="georgia">Georgia</option>
                    <option value="finland">Finland</option>
                    <option value="netherlands">Netherlands</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your study plans and how we can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center min-h-[48px] text-base"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <a
          href="https://wa.me/8801983333566?text=Hi! I'm interested in study abroad consultation. Can you help me?"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[48px]"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold">Chat on WhatsApp</div>
            <div className="text-xs opacity-90">Get instant help!</div>
          </div>
        </a>
      </div>

    </div>
  );
}
