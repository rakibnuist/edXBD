import { Metadata } from 'next';
import ConsultationButton from '@/components/ConsultationButton';

export const metadata: Metadata = {
  title: 'Study in Finland - World\'s Happiest Country | €8,000 Per Year | 500+ English Programs',
  description: 'Study in Finland - the world\'s happiest country! From €8,000 per year with free tuition for EU students. 500+ English programs, no language barrier, €700 monthly living costs. Innovation hub with tech & research excellence.',
  keywords: [
    'study in Finland',
    'Finland universities',
    'world\'s happiest country',
    'Finland education',
    'free tuition EU students',
    'English programs Finland',
    'Finland student visa',
    'innovation hub Finland',
    'Finland tuition fees',
    'study abroad Finland',
    'University of Helsinki',
    'Aalto University',
    'Finland scholarships',
    'EU work rights Finland',
    'Finland living costs',
    'Finland international students',
    'Finland education system',
    'Finland visa requirements',
    'study in Helsinki',
    'Finland technology programs'
  ],
  openGraph: {
    title: 'Study in Finland - World\'s Happiest Country | €8,000 Per Year | 500+ English Programs',
    description: 'Study in Finland - the world\'s happiest country! From €8,000 per year with free tuition for EU students. 500+ English programs, no language barrier.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EduExpress International',
    images: [
      {
        url: '/images/finland-study-abroad.jpg',
        width: 1200,
        height: 630,
        alt: 'Study in Finland - World\'s Happiest Country',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Finland - World\'s Happiest Country | €8,000 Per Year | 500+ English Programs',
    description: 'Study in Finland - the world\'s happiest country! From €8,000 per year with free tuition for EU students.',
    images: ['/images/finland-study-abroad.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.eduexpressint.com/destinations/finland',
  },
};

export default function FinlandPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "description": "Study in Finland - the world's happiest country! From €8,000 per year with free tuition for EU students. 500+ English programs, no language barrier.",
    "url": "https://www.eduexpressint.com/destinations/finland",
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
      "name": "Study in Finland Program",
      "description": "Study in Finland with 500+ English programs from €8,000 per year",
      "price": "8000",
      "priceCurrency": "EUR",
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
            // Track page view for Finland
            if (typeof gtag !== 'undefined') {
              gtag('event', 'page_view', {
                page_title: 'Study in Finland',
                page_location: window.location.href,
                content_group1: 'Finland'
              });
            }
            
            // Track consultation button clicks
            document.addEventListener('click', function(e) {
              if (e.target.closest('[data-source*="finland"]')) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'generate_lead', {
                    event_category: 'Consultation',
                    event_label: 'Finland Page',
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
      <div className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Animated Flag */}
            <div className="text-9xl mb-8 animate-bounce">🇫🇮</div>
            
            {/* Main Heading with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-lg">
              Study in Finland
            </h1>
            
            {/* Subtitle with Happiness Icon */}
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl mr-3">🌟</span>
              <p className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                World&apos;s Happiest Country
              </p>
            </div>
            
            {/* Price Highlight */}
            <div className="bg-white bg-opacity-95 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border-2 border-white shadow-2xl">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-yellow-600 mb-2">
                  From €8,000 Per Year!
                </div>
                <div className="text-lg text-gray-800 font-semibold">
                  Free for EU Students
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
              Experience world-class education with free tuition for EU students and cutting-edge innovation in the happiest country on Earth.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-6xl mx-auto">
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">€8k-€15k</div>
                  <div className="text-sm font-semibold text-gray-800">Annual Tuition</div>
                  <div className="text-xs text-gray-600">Free for EU Students</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-sm font-semibold text-gray-800">English Programs</div>
                  <div className="text-xs text-gray-600">No Language Barrier</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">€700</div>
                  <div className="text-sm font-semibold text-gray-800">Monthly Living</div>
                  <div className="text-xs text-gray-600">Very Affordable</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%+</div>
                  <div className="text-sm font-semibold text-gray-800">Visa Success</div>
                  <div className="text-xs text-gray-600">High Success Rate</div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ConsultationButton
                text="Apply Now - Start Your Journey!"
                source="finland_page_hero_consultation"
                className="bg-white text-blue-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              />
              <ConsultationButton
                text="Free Consultation"
                source="finland_page_hero_free_consultation"
                className="border-2 border-white text-white py-5 px-10 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
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

      {/* Why Choose Finland Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-cyan-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
              <span className="text-4xl">🌟</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Study in Finland?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Finland offers the perfect combination of world-class education, innovation excellence, and high quality of life in the world&apos;s happiest country.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">😊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">World&apos;s Happiest Country</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Consistently ranked as the world&apos;s happiest country with excellent quality of life and work-life balance.</p>
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                #1 Happiest Country
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation Excellence</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Leading in technology, research, and innovation with strong focus on sustainability and digital transformation.</p>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                Tech & Innovation Hub
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🇪🇺</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">EU Work Rights</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Work permit after graduation and access to entire EU job market with excellent career prospects and high salaries.</p>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                EU Job Market Access
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">EU Recognition</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">European Standards with EU work rights and post-study opportunities in the innovation hub.</p>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                European Standards
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Finland Education Statistics */}
      <div className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-cyan-200 rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-6">
              <span className="text-2xl text-white">📊</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Study in Finland with Innovation Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join prestigious Finnish universities through our comprehensive support network. Experience world-class education with 500+ English programs and innovation excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🌟</div>
                <div className="text-2xl font-bold mb-2">World&apos;s Happiest</div>
                <div className="text-5xl font-bold mb-2">#1</div>
                <div className="text-lg">Country</div>
                <div className="text-sm text-white opacity-95 mt-2">Quality of Life Excellence</div>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">💡</div>
                <div className="text-2xl font-bold mb-2">Innovation Hub</div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-lg">English Programs</div>
                <div className="text-sm text-white opacity-95 mt-2">Tech & Research Focus</div>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🇪🇺</div>
                <div className="text-2xl font-bold mb-2">EU Work Rights</div>
                <div className="text-5xl font-bold mb-2">95%+</div>
                <div className="text-lg">Visa Success</div>
                <div className="text-sm text-white opacity-95 mt-2">Easy Visa Process</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Programs */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-40 h-40 bg-blue-600 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-cyan-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-6">
              <span className="text-4xl text-white">🎓</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Popular Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a wide range of world-class innovation and technology programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">💡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technology & Innovation</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Computer Science
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    AI & Machine Learning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Engineering
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Digital Innovation
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">🏥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Medicine & Health</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Medicine
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Dentistry
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Pharmacy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Nursing
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Business & Management</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    International Business
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Finance
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Marketing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    MBA
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Arts & Sciences</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Arts & Design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Social Sciences
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Natural Sciences
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Psychology
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
                  <span className="text-gray-800">500+ English-taught programs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Free tuition for EU students</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">No entrance exams for most programs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Direct admission process</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Affordable living costs (€700/month)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Innovation and technology focus</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Modern university facilities</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Strong international community</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Intake Information</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Available Intakes</h4>
                  <p className="text-gray-700">September & January</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Visa Success Rate</h4>
                  <p className="text-2xl font-bold text-green-600">95%+</p>
                  <p className="text-gray-700">success rate with our expert guidance and proven application process</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h4>
                  <p className="text-2xl font-bold text-purple-600">2-3 weeks</p>
                  <p className="text-gray-700">Quick visa processing with streamlined documentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Universities Logo Carousel */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-cyan-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-6">
              <span className="text-4xl text-white">🤝</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Partner Universities
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We have partnerships with top Finnish universities and leading education providers to help you get admission and comprehensive support
            </p>
          </div>
          
          {/* Logo Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-scroll space-x-8">
                {/* First set of logos */}
                {[
                  { name: 'University of Helsinki', logo: '🏛️', color: 'from-blue-500 to-blue-700' },
                  { name: 'Aalto University', logo: '💡', color: 'from-cyan-500 to-cyan-700' },
                  { name: 'University of Turku', logo: '🎓', color: 'from-green-500 to-green-700' },
                  { name: 'Tampere University', logo: '🏭', color: 'from-purple-500 to-purple-700' },
                  { name: 'University of Oulu', logo: '❄️', color: 'from-indigo-500 to-indigo-700' },
                  { name: 'Lappeenranta University', logo: '🌲', color: 'from-teal-500 to-teal-700' },
                  { name: 'Åbo Akademi University', logo: '📚', color: 'from-orange-500 to-orange-700' },
                  { name: 'University of Eastern Finland', logo: '🌅', color: 'from-pink-500 to-pink-700' },
                  { name: 'Hanken School of Economics', logo: '💼', color: 'from-yellow-500 to-yellow-700' },
                  { name: 'University of Vaasa', logo: '🏢', color: 'from-red-500 to-red-700' },
                  { name: 'Study in Finland', logo: '🇫🇮', color: 'from-emerald-500 to-emerald-700' },
                  { name: 'Finnish Education', logo: '🎯', color: 'from-rose-500 to-rose-700' },
                  { name: 'EU Education Hub', logo: '🌐', color: 'from-sky-500 to-sky-700' }
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
                  { name: 'University of Helsinki', logo: '🏛️', color: 'from-blue-500 to-blue-700' },
                  { name: 'Aalto University', logo: '💡', color: 'from-cyan-500 to-cyan-700' },
                  { name: 'University of Turku', logo: '🎓', color: 'from-green-500 to-green-700' },
                  { name: 'Tampere University', logo: '🏭', color: 'from-purple-500 to-purple-700' },
                  { name: 'University of Oulu', logo: '❄️', color: 'from-indigo-500 to-indigo-700' },
                  { name: 'Lappeenranta University', logo: '🌲', color: 'from-teal-500 to-teal-700' },
                  { name: 'Åbo Akademi University', logo: '📚', color: 'from-orange-500 to-orange-700' },
                  { name: 'University of Eastern Finland', logo: '🌅', color: 'from-pink-500 to-pink-700' },
                  { name: 'Hanken School of Economics', logo: '💼', color: 'from-yellow-500 to-yellow-700' },
                  { name: 'University of Vaasa', logo: '🏢', color: 'from-red-500 to-red-700' },
                  { name: 'Study in Finland', logo: '🇫🇮', color: 'from-emerald-500 to-emerald-700' },
                  { name: 'Finnish Education', logo: '🎯', color: 'from-rose-500 to-rose-700' },
                  { name: 'EU Education Hub', logo: '🌐', color: 'from-sky-500 to-sky-700' }
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
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Direct Admission</h4>
                <p className="text-gray-700">Streamlined application process with our partner universities</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-4xl mb-4">💰</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Exclusive Scholarships</h4>
                <p className="text-gray-700">Access to special scholarship programs for our students</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Full Support</h4>
                <p className="text-gray-700">Complete guidance from application to enrollment</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <ConsultationButton
                text="Apply to Partner Universities"
                source="finland_page_partner_universities"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700 text-white py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg">
            Start Your Innovation Journey in Finland
          </h2>
          <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
            Join thousands of students who are already pursuing world-class education at affordable costs. Get cutting-edge education with 500+ English programs!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">🌟</div>
              <div className="text-xl font-bold mb-2 text-white">World&apos;s Happiest</div>
              <div className="text-sm text-white">#1 happiest country with excellent quality of life</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">✅</div>
              <div className="text-xl font-bold mb-2 text-white">95%+ Visa Success</div>
              <div className="text-sm text-white">High approval rate with our expertise</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">🇪🇺</div>
              <div className="text-xl font-bold mb-2 text-white">EU Recognition</div>
              <div className="text-sm text-white">European-standard degrees with EU work rights</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <ConsultationButton
              text="Apply Now - Start Your Journey!"
              source="finland_page_cta_apply"
              className="bg-white text-blue-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            />
            <ConsultationButton
              text="Free Consultation"
              source="finland_page_cta_consultation"
              className="border-2 border-white text-white py-5 px-10 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
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
