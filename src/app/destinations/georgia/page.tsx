import { Metadata } from 'next';
import ConsultationButton from '@/components/ConsultationButton';

export const metadata: Metadata = {
  title: 'Study in Georgia - World-Class Medical Education from $3,000 Per Year | WHO Recognized',
  description: 'Study in Georgia with world-class medical education from $3,000 per year. WHO-recognized medical degrees, 100% English medium programs, European standards, and affordable living costs.',
  keywords: [
    'study in Georgia',
    'Georgia medical education',
    'MBBS in Georgia',
    'WHO recognized medical degrees',
    'Georgia universities',
    'affordable medical education',
    'English medium programs Georgia',
    'Georgia student visa',
    'medical education Georgia',
    'study abroad Georgia',
    'Georgia tuition fees',
    'European medical education',
    'Georgia scholarships',
    'international students Georgia'
  ],
  openGraph: {
    title: 'Study in Georgia - World-Class Medical Education from $3,000 Per Year',
    description: 'Experience affordable world-class education with English-medium programs and WHO-recognized medical degrees in the heart of Europe.',
    type: 'website',
    url: 'https://www.eduexpressint.com/destinations/georgia',
    images: [
      {
        url: '/images/georgia-medical-education.jpg',
        width: 1200,
        height: 630,
        alt: 'Study in Georgia - Medical Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Georgia - World-Class Medical Education from $3,000 Per Year',
    description: 'Experience affordable world-class education with English-medium programs and WHO-recognized medical degrees in the heart of Europe.',
    images: ['/images/georgia-medical-education.jpg'],
  },
  alternates: {
    canonical: 'https://www.eduexpressint.com/destinations/georgia',
  },
};

export default function GeorgiaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "description": "Study in Georgia with world-class medical education from $3,000 per year. WHO-recognized medical degrees, 100% English medium programs, European standards, and affordable living costs.",
    "url": "https://www.eduexpressint.com/destinations/georgia",
    "logo": "https://www.eduexpressint.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12/1, Ground Floor, Road: 4/A, Dhanmondi",
      "addressLocality": "Dhaka",
      "postalCode": "1209",
      "addressCountry": "BD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880-1983-333566",
      "contactType": "customer service",
      "email": "info@eduexpressint.com"
    },
    "offers": {
      "@type": "Offer",
      "name": "Study in Georgia Program",
      "description": "Study in Georgia with world-class medical education from $3,000 per year",
      "price": "3000",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* GTM Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Track page view for Georgia
            if (typeof gtag !== 'undefined') {
              gtag('event', 'page_view', {
                page_title: 'Study in Georgia',
                page_location: window.location.href,
                content_group1: 'Georgia'
              });
            }
            
            // Track consultation button clicks
            document.addEventListener('click', function(e) {
              if (e.target.closest('[data-source*="georgia"]')) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'generate_lead', {
                    event_category: 'Consultation',
                    event_label: 'Georgia Page',
                    value: 1
                  });
                }
              }
            });
          `
        }}
      />
      
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 via-orange-600 to-yellow-700 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Animated Flag */}
            <div className="text-9xl mb-8 animate-bounce">🇬🇪</div>
            
            {/* Main Heading with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-lg">
              Study in Georgia
            </h1>
            
            {/* Subtitle with Medical Icon */}
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl mr-3">🏥</span>
              <p className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                World-Class Medical Education
              </p>
            </div>
            
            {/* Price Highlight */}
            <div className="bg-white bg-opacity-95 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border-2 border-white shadow-2xl">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-2">
                  From $3,000 Per Year!
                </div>
                <div className="text-lg text-gray-800 font-semibold">
                  WHO-Recognized Medical Degrees
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
              Experience affordable world-class education with English-medium programs and WHO-recognized medical degrees in the heart of Europe.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-6xl mx-auto">
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">$3k</div>
                  <div className="text-sm font-semibold text-gray-800">Annual Tuition</div>
                  <div className="text-xs text-gray-600">Affordable</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-sm font-semibold text-gray-800">English Medium</div>
                  <div className="text-xs text-gray-600">No Language Barrier</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$300</div>
                  <div className="text-sm font-semibold text-gray-800">Monthly Living</div>
                  <div className="text-xs text-gray-600">Very Affordable</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">WHO</div>
                  <div className="text-sm font-semibold text-gray-800">Recognized</div>
                  <div className="text-xs text-gray-600">Medical Degrees</div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ConsultationButton
                text="Apply Now - Start Your Journey!"
                source="georgia_page_hero_consultation"
                className="bg-white text-red-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              />
              <ConsultationButton
                text="Free Consultation"
                source="georgia_page_hero_free_consultation"
                className="border-2 border-white text-white py-5 px-10 rounded-xl font-bold text-xl hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Multiple Intakes Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl animate-pulse">🎓</span>
            <p className="text-xl font-bold">September & January Intakes Available</p>
            <span className="text-2xl animate-pulse">🎓</span>
          </div>
        </div>
      </div>

      {/* Why Choose Georgia Section */}
      <div className="bg-gradient-to-br from-gray-50 to-red-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-400 to-orange-500 rounded-full mb-6">
              <span className="text-4xl">🌟</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Study in Georgia?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Georgia offers the perfect combination of affordable world-class education, English-medium programs, and WHO-recognized medical degrees in a safe European environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-red-500 to-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🏥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Affordable Medical Education</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">World-class MBBS programs at a fraction of Western costs with WHO recognition.</p>
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                $3,000-6,000 per year
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% English Medium</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">All programs taught in English with no language barriers for international students.</p>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                No Language Barrier
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Safe & Welcoming</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Low crime rate, friendly locals, and excellent support for international students.</p>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                Very Safe Environment
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">European Standards</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">High-quality education following European standards with modern facilities and technology.</p>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                Quality Education
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Georgia Education Statistics */}
      <div className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mb-6">
              <span className="text-2xl text-white">📊</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Study in Georgia with World-Class Medical Education
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join thousands of students pursuing WHO-recognized medical degrees at affordable costs. Experience world-class education with English-medium programs in a safe European environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🏥</div>
                <div className="text-2xl font-bold mb-2">Medical Programs</div>
                <div className="text-5xl font-bold mb-2">WHO</div>
                <div className="text-lg">Recognized</div>
                <div className="text-sm text-white opacity-95 mt-2">International Standards</div>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🌍</div>
                <div className="text-2xl font-bold mb-2">English Medium</div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-lg">Programs</div>
                <div className="text-sm text-white opacity-95 mt-2">No Language Barrier</div>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">💰</div>
                <div className="text-2xl font-bold mb-2">Affordable Living</div>
                <div className="text-5xl font-bold mb-2">$300</div>
                <div className="text-lg">per month</div>
                <div className="text-sm text-white opacity-95 mt-2">Very Affordable</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Programs */}
      <div className="bg-gradient-to-br from-gray-50 to-red-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-40 h-40 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-orange-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mb-6">
              <span className="text-4xl text-white">🎓</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Popular Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a wide range of world-class medical and healthcare programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">🏥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Medicine (MBBS)</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    General Medicine
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    WHO Recognized
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    English Medium
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    6 Years Program
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">🦷</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Dentistry</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Dental Surgery
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Clinical Training
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Modern Facilities
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    5 Years Program
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">💊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pharmacy</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Pharmaceutical Sciences
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Clinical Pharmacy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Research Opportunities
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    4 Years Program
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">👩‍⚕️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nursing</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Clinical Nursing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Patient Care
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Healthcare Management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    4 Years Program
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Features & Benefits */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              🌟 Special Features & Benefits
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">WHO-recognized medical degrees</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">European education standards</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">No entrance exams required</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Direct admission process</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Affordable living costs ($300/month)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">English-taught programs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Modern university facilities</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">International student support</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Intake Information</h3>
              <div className="space-y-6">
                <div className="bg-red-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Available Intakes</h4>
                  <p className="text-gray-700">September & January</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Visa Success Rate</h4>
                  <p className="text-2xl font-bold text-green-600">95%+</p>
                  <p className="text-gray-700">success rate with our expert guidance and proven application process</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h4>
                  <p className="text-2xl font-bold text-blue-600">2-3 weeks</p>
                  <p className="text-gray-700">Quick visa processing with streamlined documentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Universities Logo Carousel */}
      <div className="bg-gradient-to-br from-gray-50 to-red-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mb-6">
              <span className="text-4xl text-white">🤝</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Partner Universities
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We have partnerships with top Georgian universities and leading education providers to help you get admission and comprehensive support
            </p>
          </div>
          
          {/* Logo Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-scroll space-x-8">
                {/* First set of logos */}
                {[
                  { name: 'Tbilisi State Medical University', logo: '🏥', color: 'from-red-500 to-red-700' },
                  { name: 'Georgian American University', logo: '🎓', color: 'from-blue-500 to-blue-700' },
                  { name: 'Caucasus University', logo: '🏛️', color: 'from-green-500 to-green-700' },
                  { name: 'Ilia State University', logo: '📚', color: 'from-purple-500 to-purple-700' },
                  { name: 'Georgian Technical University', logo: '⚙️', color: 'from-orange-500 to-orange-700' },
                  { name: 'Free University of Tbilisi', logo: '🌍', color: 'from-indigo-500 to-indigo-700' },
                  { name: 'Batumi Shota Rustaveli State University', logo: '🏖️', color: 'from-teal-500 to-teal-700' },
                  { name: 'Akaki Tsereteli State University', logo: '🏰', color: 'from-pink-500 to-pink-700' },
                  { name: 'Georgian Institute of Public Affairs', logo: '📊', color: 'from-cyan-500 to-cyan-700' },
                  { name: 'International Black Sea University', logo: '🌊', color: 'from-emerald-500 to-emerald-700' }
                ].map((university, index) => (
                  <div key={index} className="flex-shrink-0">
                    <div className={`bg-gradient-to-r ${university.color} text-white rounded-2xl p-8 w-64 h-40 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                      <div className="text-4xl mb-3">{university.logo}</div>
                      <h3 className="text-lg font-bold text-center leading-tight">{university.name}</h3>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  { name: 'Tbilisi State Medical University', logo: '🏥', color: 'from-red-500 to-red-700' },
                  { name: 'Georgian American University', logo: '🎓', color: 'from-blue-500 to-blue-700' },
                  { name: 'Caucasus University', logo: '🏛️', color: 'from-green-500 to-green-700' },
                  { name: 'Ilia State University', logo: '📚', color: 'from-purple-500 to-purple-700' },
                  { name: 'Georgian Technical University', logo: '⚙️', color: 'from-orange-500 to-orange-700' },
                  { name: 'Free University of Tbilisi', logo: '🌍', color: 'from-indigo-500 to-indigo-700' },
                  { name: 'Batumi Shota Rustaveli State University', logo: '🏖️', color: 'from-teal-500 to-teal-700' },
                  { name: 'Akaki Tsereteli State University', logo: '🏰', color: 'from-pink-500 to-pink-700' },
                  { name: 'Georgian Institute of Public Affairs', logo: '📊', color: 'from-cyan-500 to-cyan-700' },
                  { name: 'International Black Sea University', logo: '🌊', color: 'from-emerald-500 to-emerald-700' }
                ].map((university, index) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0">
                    <div className={`bg-gradient-to-r ${university.color} text-white rounded-2xl p-8 w-64 h-40 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                      <div className="text-4xl mb-3">{university.logo}</div>
                      <h3 className="text-lg font-bold text-center leading-tight">{university.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Partnership Benefits */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Benefits</h3>
              <p className="text-gray-600">Why choose our partner universities?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-red-50 rounded-xl">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Direct Admission</h4>
                <p className="text-gray-700">Streamlined application process with our partner universities</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-4xl mb-4">💰</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Affordable Tuition</h4>
                <p className="text-gray-700">Access to special tuition rates for our students</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Full Support</h4>
                <p className="text-gray-700">Complete guidance from application to enrollment</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <ConsultationButton
                text="Apply to Partner Universities"
                source="georgia_page_partner_universities"
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-red-600 via-orange-600 to-yellow-700 text-white py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg">
            Start Your Medical Education Journey in Georgia
          </h2>
          <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
            Join thousands of students who are already pursuing WHO-recognized medical degrees at affordable costs. Get world-class education with English-medium programs!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">💰</div>
              <div className="text-xl font-bold mb-2 text-white">From $3,000/Year</div>
              <div className="text-sm text-white">Affordable world-class education</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">✅</div>
              <div className="text-xl font-bold mb-2 text-white">95%+ Visa Success</div>
              <div className="text-sm text-white">High approval rate with our expertise</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">🏥</div>
              <div className="text-xl font-bold mb-2 text-white">WHO Recognized</div>
              <div className="text-sm text-white">Internationally recognized medical degrees</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <ConsultationButton
              text="Apply Now - Start Your Journey!"
              source="georgia_page_cta_apply"
              className="bg-white text-red-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            />
            <ConsultationButton
              text="Free Consultation"
              source="georgia_page_cta_consultation"
              className="border-2 border-white text-white py-5 px-10 rounded-xl font-bold text-xl hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            />
          </div>
          
          <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full inline-block font-bold text-lg animate-pulse">
            ⚡ Limited Time Opportunity - Apply Now! ⚡
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
