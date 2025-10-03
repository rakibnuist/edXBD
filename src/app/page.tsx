'use client';

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  ArrowRight, 
  Phone, 
  CheckCircle,
  Award,
  MessageCircle,
  Send,
  Plane,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { trackApplicationStart, trackConsultationRequest } from '@/lib/analytics';
import { useState, useEffect, useCallback } from 'react';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import QuickContactForm from '@/components/QuickContactForm';
import { Testimonial, Update } from '@/lib/types';
import { featuredCountries } from '@/lib/countries';


export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentDestination, setCurrentDestination] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [updatesLoading, setUpdatesLoading] = useState(true);
  const [currentUpdateSlide, setCurrentUpdateSlide] = useState(0);

  const countries = featuredCountries.map(country => ({
    name: country.name,
    flag: country.flag,
    description: country.description
  }));

  const stats = [
    { value: '97%', label: 'Success Rate', icon: Award },
    { value: '3K+', label: 'Students', icon: Users },
    { value: '48hrs', label: 'Response', icon: Clock },
    { value: '100%', label: 'Free Service', icon: CheckCircle }
  ];


  // Fetch testimonials from database
  const fetchTestimonials = useCallback(async () => {
    const fallbackTestimonials: Testimonial[] = [
      {
        _id: "fallback-1",
        name: "Rahman Ahmed",
        location: "Dhaka, Bangladesh",
        university: "University of Manchester, UK",
        program: "Computer Science",
        quote: "EduExpress International made my dream of studying in the UK come true. Their guidance was like having a personal mentor throughout the entire process.",
        rating: 5,
        image: "🇧🇩",
        country: "UK",
        isActive: true,
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: "fallback-2",
        name: "Fatima Khan",
        location: "Karachi, Pakistan",
        university: "University of Toronto, Canada",
        program: "Business Administration",
        quote: "The team at EduExpress International was incredibly supportive. They helped me navigate the complex application process and secure a scholarship.",
        rating: 5,
        image: "🇵🇰",
        country: "Canada",
        isActive: true,
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: "fallback-3",
        name: "Ahmed Hassan",
        location: "Cairo, Egypt",
        university: "University of Melbourne, Australia",
        program: "Engineering",
        quote: "From visa assistance to accommodation help, EduExpress International provided comprehensive support. Highly recommended!",
        rating: 5,
        image: "🇪🇬",
        country: "Australia",
        isActive: true,
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    try {
      setTestimonialsLoading(true);
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        // API already filters for active testimonials and sorts them properly
        setTestimonials(data.length > 0 ? data : fallbackTestimonials);
      } else {
        console.error('Failed to fetch testimonials:', response.statusText);
        setTestimonials(fallbackTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(fallbackTestimonials);
    } finally {
      setTestimonialsLoading(false);
    }
  }, []);

  // Fetch latest updates from database
  const fetchUpdates = useCallback(async () => {
    try {
      setUpdatesLoading(true);
      const response = await fetch('/api/updates?limit=4');
      if (response.ok) {
        const data = await response.json();
        setUpdates(data.updates || []);
      } else {
        console.error('Failed to fetch updates:', response.statusText);
        setUpdates([]);
      }
    } catch (error) {
      console.error('Error fetching updates:', error);
      setUpdates([]);
    } finally {
      setUpdatesLoading(false);
    }
  }, []);


  // Fetch testimonials and updates on component mount
  useEffect(() => {
    fetchTestimonials();
    fetchUpdates();
  }, []);

  // Auto-play functionality for testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  // Auto-play functionality for destinations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % countries.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [countries.length]);

  // Auto-play functionality for updates carousel
  useEffect(() => {
    if (updates.length > 4) {
      const totalSlides = Math.ceil(updates.length / 4);
      const interval = setInterval(() => {
        setCurrentUpdateSlide((prev) => (prev + 1) % totalSlides);
      }, 6000); // Change every 6 seconds

      return () => clearInterval(interval);
    }
  }, [updates.length]);


  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Minimal Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="inline-flex items-center space-x-2">
                <div className="minimal-dot"></div>
                <span className="text-minimal text-lg font-bold text-blue-600">Trusted Since 2018 • 3000+ Students Got Scholarships</span>
                <div className="minimal-dot"></div>
              </div>
            </motion.div>

            {/* Minimal Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="heading-minimal text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-6 sm:mb-8"
            >
              Study Abroad
              <br />
              <span className="heading-creative">Made Simple</span>
            </motion.h1>

            {/* Bold Hook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 sm:mb-6"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-handwriting-bold text-gray-800 mb-3 sm:mb-4 handwriting-tilt handwriting-glow">
                🎓 <span className="text-blue-600">FREE</span> Scholarship Assistance
              </h2>
            </motion.div>

            {/* Minimal Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-minimal text-lg sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
            >
              Expert study abroad consultancy with <span className="font-bold text-green-600">FREE scholarship assistance</span> since 2018. 6+ years of proven experience helping 3000+ students study at top universities worldwide.
            </motion.p>

            {/* Creative CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  trackApplicationStart();
                  window.dispatchEvent(new CustomEvent('openQuickForm'));
                }}
                className="btn-creative w-full sm:w-auto min-h-[48px] text-base sm:text-lg"
              >
                <span className="flex items-center justify-center">
                  Get FREE Consultation
                  <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-minimal w-full sm:w-auto min-h-[48px] text-base sm:text-lg"
              >
                <span className="flex items-center justify-center">
                  <Phone className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Creative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 organic-shape"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 organic-shape"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 right-1/3 w-64 h-64 organic-shape"
          />
        </div>
      </section>

      {/* Creative Process Section */}
      <section id="process" className="section-minimal bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Creative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-r from-blue-200 to-green-200 rounded-full opacity-25"
          />
        </div>

        <div className="container-minimal relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center-minimal mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h2 className="font-script text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent handwriting-tilt">
              How We Help You
            </h2>
            <div className="minimal-divider"></div>
            <p className="text-minimal text-xl">
              <span className="font-bold text-purple-600">3 Simple Steps</span> to Study Abroad with Scholarship Assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: "01",
                  title: "Consult",
                  description: "FREE consultation to understand your goals and find the best study abroad opportunities with scholarship assistance",
                  icon: MessageCircle,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "02", 
                  title: "Apply",
                  description: "Complete study abroad applications with FREE scholarship assistance and expert guidance",
                  icon: Send,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "03",
                  title: "Fly",
                  description: "Get visa approved and fly to your dream study abroad destination",
                  icon: Plane,
                  color: "from-green-500 to-emerald-500"
                }
              ].map((process, index) => (
              <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden h-full">
                    {/* Creative Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${process.color} rounded-full -translate-y-12 translate-x-12 opacity-10`} />
                    
                    <div className="relative z-10">
                  <motion.div
                        className={`w-20 h-20 bg-gradient-to-r ${process.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                        <process.icon className="w-10 h-10 text-white" />
                  </motion.div>
                      
                      <div className={`w-12 h-12 bg-gradient-to-r ${process.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}>
                        {process.step}
                      </div>
                      
                      <h3 className="heading-minimal text-2xl mb-4">{process.title}</h3>
                      <p className="text-minimal text-base mb-6">{process.description}</p>
                      
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Destinations Section */}
      <section id="destinations" className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-handwriting text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent handwriting-tilt">
              Study Abroad Destinations
            </h2>
            <p className="text-minimal text-lg">
              <span className="font-bold text-blue-600">Top Countries</span> with Scholarship Opportunities
            </p>
          </motion.div>

          {/* Compact Destination Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="relative h-[400px] overflow-visible rounded-2xl">
              {countries.map((country, index) => {
                const isActive = index === currentDestination;
                const isPrev = index === (currentDestination - 1 + countries.length) % countries.length;
                const isNext = index === (currentDestination + 1) % countries.length;
                
                return (
                <motion.div
                    key={country.name}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ 
                      opacity: isActive ? 1 : isPrev || isNext ? 0.6 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.9 : 0.7,
                      rotateY: isActive ? 0 : isPrev ? -15 : isNext ? 15 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px"
                    }}
                  >
                    <div className="relative w-full max-w-3xl mx-auto">
                      <motion.div
                        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
                        whileHover={{ scale: 1.02, rotateY: 2 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Creative Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full -translate-y-32 translate-x-32" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400 to-orange-400 rounded-full translate-y-24 -translate-x-24" />
                          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full -translate-x-16 -translate-y-16" />
                        </div>

                        <div className="relative z-10 text-center">
                          {/* Flag with Creative Animation */}
                          <motion.div 
                            className="text-6xl mb-4"
                            whileHover={{ 
                              scale: 1.2, 
                              rotate: [0, -10, 10, 0],
                              transition: { duration: 0.6 }
                            }}
                          >
                            {country.flag}
                </motion.div>

                          {/* Country Name */}
                          <h3 className="heading-minimal text-2xl mb-3">
                            {country.name}
                          </h3>

                          {/* Description */}
                          <p className="text-minimal text-base mb-6 max-w-xl mx-auto">
                            {country.description}
                          </p>

                          {/* Scholarship Badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mb-8"
                          >
              </motion.div>

                          {/* CTA Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full font-semibold text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                            onClick={() => {
                              trackConsultationRequest('destination_exploration');
                              window.dispatchEvent(new CustomEvent('openQuickForm'));
                            }}
                          >
                            <span className="flex items-center justify-center">
                              <Plane className="mr-2 w-4 h-4" />
                              Study in {country.name}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>


          </div>

        </div>
      </section>

      {/* Creative Stats Section */}
      <section className="section-minimal bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Creative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              x: [0, 15, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 right-1/4 w-16 h-16 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-25"
          />
        </div>

        <div className="container-minimal relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-amatic text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent handwriting-tilt">
              💯 Our Success Rate
            </h2>
            <div className="minimal-divider"></div>
            <p className="text-minimal text-lg">
              <span className="font-bold text-blue-600">97% Success Rate</span> in Study Abroad Applications with Scholarship Assistance since 2018
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                  {/* Creative Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full -translate-y-8 translate-x-8 opacity-20" />
                  
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-3xl font-heading font-bold mb-2 text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-minimal text-sm">{stat.label}</div>
                    
                  </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>


      {/* Creative Student Stories Section */}
      <section id="testimonials" className="section-minimal bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="container-minimal">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center-minimal mb-16"
          >
            <h2 className="font-casual text-4xl lg:text-5xl mb-4 handwriting-tilt">
              🌟 Success Stories
            </h2>
            <div className="minimal-divider"></div>
            <p className="text-minimal text-base">
              <span className="font-bold text-purple-600">Real Students</span> who achieved their study abroad dreams with our scholarship assistance
            </p>
          </motion.div>

          {/* Creative Carousel Container */}
          <div className="relative">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-30 floating-bg-1" />
              <div className="absolute top-20 right-20 w-16 h-16 bg-purple-100 rounded-full opacity-40 floating-bg-2" />
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-100 rounded-full opacity-35 floating-bg-3" />
            </div>

            {/* Main Carousel */}
            <div className="relative max-w-6xl mx-auto">
              {/* Testimonial Cards Container */}
              <div className="relative h-[500px] overflow-visible">
                {testimonialsLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading testimonials...</p>
                    </div>
                  </div>
                ) : testimonials.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-gray-600">No testimonials available at the moment.</p>
                    </div>
                  </div>
                ) : (
                  testimonials.map((testimonial, index) => {
                  const isActive = index === currentTestimonial;
                  const isPrev = index === (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                  const isNext = index === (currentTestimonial + 1) % testimonials.length;
                  
                  return (
              <motion.div
                key={testimonial.name}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      animate={{ 
                        opacity: isActive ? 1 : isPrev || isNext ? 0.7 : 0,
                        scale: isActive ? 1 : isPrev || isNext ? 0.95 : 0.85,
                        rotateY: isActive ? 0 : isPrev ? -10 : isNext ? 10 : 0,
                        zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px"
                      }}
                    >
                      <div className={`
                        relative w-full max-w-2xl mx-auto
                        ${isActive ? 'transform-none' : 'transform-gpu'}
                      `}>
                        {/* Main Card */}
                      <motion.div
                          className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden carousel-card"
                          whileHover={{ scale: 1.02, rotateY: 2 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Creative Decorative Elements */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-60" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50" />
                          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full -translate-x-8 -translate-y-8 opacity-40" />
                          
                          {/* Content */}
                          <div className="relative z-10">
                            {/* Stars */}
                            <motion.div 
                              className="flex justify-center mb-6"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                            >
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <motion.span 
                        key={i}
                                  className="text-yellow-400 text-2xl mx-1 carousel-star"
                                  initial={{ opacity: 0, y: -20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                                >
                                  ⭐
                                </motion.span>
                              ))}
                            </motion.div>

                            {/* Quote */}
                            <motion.blockquote 
                              className="text-minimal text-xl mb-8 italic text-center leading-relaxed"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5, duration: 0.6 }}
                            >
                              &ldquo;{testimonial.quote}&rdquo;
                            </motion.blockquote>

                            {/* Student Info */}
                            <motion.div 
                              className="flex items-center justify-center mb-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6, duration: 0.6 }}
                            >
                              <div className="text-5xl mr-6 transform hover:scale-110 transition-transform duration-300">
                                {testimonial.image}
                              </div>
                              <div className="text-left">
                                <h4 className="heading-minimal text-2xl mb-1">
                          {testimonial.name}
                        </h4>
                                <p className="text-minimal text-sm text-gray-600">
                          {testimonial.location}
                        </p>
                      </div>
                            </motion.div>
                            
                            {/* Program Info */}
                            <motion.div 
                              className="text-center"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7, duration: 0.6 }}
                            >
                              <p className="text-minimal text-base font-medium text-blue-600 mb-1">
                        {testimonial.program}
                      </p>
                              <p className="text-minimal text-sm text-gray-500 mb-3">
                        {testimonial.university}
                      </p>
                              
                            </motion.div>
                  </div>
                        </motion.div>
                </div>
              </motion.div>
                  );
                })
                )}
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section id="updates" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-gray-900">
              LATEST UPDATES
            </h2>
            <p className="text-xl font-body text-gray-600 max-w-2xl mx-auto mb-8">
              Latest opportunities and news
            </p>
            
            {/* View All Updates Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/updates'}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-base hover:bg-blue-700 transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center">
                View All Updates
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>

          {updatesLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading updates...</p>
              </div>
            </div>
          ) : updates.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No updates available</h3>
              <p className="text-gray-600">Check back later for the latest news and opportunities.</p>
            </div>
          ) : (
            <div className="relative max-w-7xl mx-auto">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-2xl">
                <motion.div
                  className="flex transition-transform duration-500 ease-in-out"
                  animate={{
                    x: `-${currentUpdateSlide * 100}%`
                  }}
                >
                  {Array.from({ length: Math.ceil(updates.length / 4) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {updates.slice(slideIndex * 4, (slideIndex + 1) * 4).map((update, index) => (
                          <motion.div
                            key={update._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group cursor-pointer"
                            onClick={() => window.location.href = `/updates/${update.slug}`}
                          >
                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                              <div className="flex flex-col h-full">
                                {/* Icon */}
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.2 }}
                                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4 flex-shrink-0"
                                >
                                  <span className="text-2xl">
                                    {update.category === 'Scholarships' ? '🎓' :
                                     update.category === 'Events' ? '📚' :
                                     update.category === 'Success Stories' ? '✈️' :
                                     update.category === 'Partnerships' ? '🤝' :
                                     update.category === 'News' ? '📰' : '📢'}
                                  </span>
                                </motion.div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                      {update.category || 'Update'}
                                    </span>
                                    <span className="font-body text-gray-500 text-xs">
                                      {new Intl.DateTimeFormat('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                      }).format(new Date(update.publishedAt || update.createdAt))}
                                    </span>
                                  </div>

                                  <h3 className="font-heading font-semibold text-gray-900 text-base mb-3 line-clamp-2">
                                    {update.title}
                                  </h3>

                                  <p className="font-body text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
                                    {update.excerpt || update.metaDescription || `Learn more about ${update.title.split('—')[0]?.trim() || 'this program'}`}
                                  </p>
                                  
                                  {/* Read More Indicator */}
                                  <div className="mt-3 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
                                    <span>Read more</span>
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Controls */}
              {updates.length > 4 && (
                <div className="flex items-center justify-center mt-8 space-x-4">
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const totalSlides = Math.ceil(updates.length / 4);
                      setCurrentUpdateSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
                    }}
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </motion.button>

                  {/* Slide Indicators */}
                  <div className="flex space-x-2">
                    {Array.from({ length: Math.ceil(updates.length / 4) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentUpdateSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentUpdateSlide ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const totalSlides = Math.ceil(updates.length / 4);
                      setCurrentUpdateSlide((prev) => (prev + 1) % totalSlides);
                    }}
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container-minimal text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center-minimal"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              🚀 Ready to Study Abroad?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join <span className="font-bold text-yellow-300">3000+ students</span> who achieved their study abroad dreams with our FREE scholarship assistance since 2018
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                trackConsultationRequest('final_cta');
                window.dispatchEvent(new CustomEvent('openQuickForm'));
              }}
              className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              <span className="flex items-center">
                <GraduationCap className="mr-2 w-5 h-5" />
                Get FREE Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>



      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Quick Contact Form Modal */}
      <QuickContactForm />
    </div>
  );
}