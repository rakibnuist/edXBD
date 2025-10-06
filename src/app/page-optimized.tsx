'use client';

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
import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import QuickContactForm from '@/components/QuickContactForm';
import AnimatedButton from '@/components/AnimatedButton';
import { Testimonial, Update } from '@/lib/types';
import { featuredCountries } from '@/lib/countries';

const Home = memo(function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentDestination, setCurrentDestination] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [updatesLoading, setUpdatesLoading] = useState(true);
  const [currentUpdateSlide, setCurrentUpdateSlide] = useState(0);

  const countries = useMemo(() => featuredCountries.map(country => ({
    name: country.name,
    flag: country.flag,
    description: country.description
  })), []);

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
  }, [fetchTestimonials, fetchUpdates]);

  // Combined auto-play functionality to reduce intervals
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate testimonials every 8 seconds
      if (testimonials.length > 0) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
      
      // Rotate destinations every 6 seconds
      setCurrentDestination((prev) => (prev + 1) % countries.length);
      
      // Rotate updates every 10 seconds
      if (updates.length > 4) {
        const totalSlides = Math.ceil(updates.length / 4);
        setCurrentUpdateSlide((prev) => (prev + 1) % totalSlides);
      }
    }, 4000); // Single interval for better performance

    return () => clearInterval(interval);
  }, [testimonials.length, countries.length, updates.length]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Optimized Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Simplified Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Trust Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 shadow-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-semibold text-gray-700">
                  🏆 Trusted Since 2018 • 3000+ Students Got Scholarships
                </span>
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Study Abroad
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            {/* Value Proposition */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                🎓 <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">FREE</span> Scholarship Assistance
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your education journey with expert study abroad consultancy. 
              <span className="font-bold text-green-600"> FREE scholarship assistance</span> since 2018. 
              <span className="font-bold text-blue-600"> 97% success rate</span> helping 3000+ students study at top universities worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <AnimatedButton
                onClick={() => {
                  trackConsultationRequest('hero_cta');
                  window.dispatchEvent(new CustomEvent('openQuickForm'));
                }}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-3xl"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Get FREE Consultation
              </AnimatedButton>
              
              <AnimatedButton
                onClick={() => trackApplicationStart('phone_call')}
                variant="outline"
                className="group relative bg-white hover:bg-gray-50 text-blue-600 text-lg px-8 py-4 rounded-full font-semibold shadow-xl border-2 border-blue-600 hover:border-blue-700"
                icon={<Phone className="w-5 h-5" />}
                iconPosition="left"
              >
                Call Now
              </AnimatedButton>
            </div>

            {/* Stats Preview */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                { value: "3000+", label: "Students Helped", icon: "🎓" },
                { value: "97%", label: "Success Rate", icon: "🏆" },
                { value: "2018", label: "Since", icon: "⭐" },
                { value: "100%", label: "Free Consultation", icon: "💯" }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              How We Help You
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8" />
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <span className="font-bold text-purple-600">3 Simple Steps</span> to Study Abroad with Scholarship Assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Free Consultation",
                description: "Get personalized guidance on study abroad opportunities and scholarship options tailored to your profile.",
                icon: "💬"
              },
              {
                step: "02", 
                title: "Application Support",
                description: "Complete assistance with university applications, document preparation, and scholarship applications.",
                icon: "📝"
              },
              {
                step: "03",
                title: "Visa & Departure",
                description: "End-to-end visa assistance and pre-departure support to ensure smooth transition to your new country.",
                icon: "✈️"
              }
            ].map((process, index) => (
              <div
                key={process.step}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <span className="text-4xl">{process.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {process.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {process.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Countries Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Popular Study Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our most popular study destinations with comprehensive support and scholarship opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {countries.slice(0, 8).map((country, index) => (
              <div
                key={country.name}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-100 hover:border-blue-200 relative overflow-hidden"
                onClick={() => {
                  trackApplicationStart(`country_${country.name.toLowerCase()}`);
                  window.dispatchEvent(new CustomEvent('openQuickForm'));
                }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-indigo-50/0 group-hover:from-blue-50/30 group-hover:via-purple-50/20 group-hover:to-indigo-50/30 transition-all duration-700 rounded-3xl"></div>
                
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl"></div>
                </div>
                
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 filter group-hover:drop-shadow-lg">
                    {country.flag}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    {country.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {country.description}
                  </p>
                  <div className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:text-white bg-blue-50 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 px-6 py-3 rounded-full transition-all duration-300 shadow-sm group-hover:shadow-lg">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from students who achieved their study abroad dreams with our support
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-6xl mb-6">{testimonials[currentTestimonial]?.image || "👨‍🎓"}</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle
                        key={i}
                        className={`w-6 h-6 ${i < (testimonials[currentTestimonial]?.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{testimonials[currentTestimonial]?.quote || 'EduExpress International made my study abroad dream come true!'}"
                  </blockquote>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonials[currentTestimonial]?.name || "Student"}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial]?.university || "University"} • {testimonials[currentTestimonial]?.program || "Program"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-8">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <span className="text-4xl">🚀</span>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white">
              Ready to Study Abroad?
            </h2>
            
            <div className="w-24 h-1 bg-white/50 rounded-full mx-auto mb-8" />
            
            <p className="text-blue-100 text-lg lg:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Join <span className="font-bold text-yellow-300">3000+ students</span> who achieved their study abroad dreams with our FREE scholarship assistance since 2018
            </p>
            
            <button
              onClick={() => {
                trackConsultationRequest('final_cta');
                window.dispatchEvent(new CustomEvent('openQuickForm'));
              }}
              className="group relative bg-white text-blue-600 hover:bg-gray-50 text-lg px-12 py-4 rounded-full font-semibold transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center">
                <GraduationCap className="mr-3 w-6 h-6" />
                Get FREE Consultation
                <ArrowRight className="ml-3 w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Quick Contact Form Modal */}
      <QuickContactForm />
    </div>
  );
}

export default Home;
