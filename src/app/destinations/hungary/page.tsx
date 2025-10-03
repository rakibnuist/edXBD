import { Metadata } from 'next';
import ConsultationButton from '@/components/ConsultationButton';

export const metadata: Metadata = {
  title: 'Study in Hungary - EU Degree Recognition & Affordable Education from €3,000',
  description: 'Study in Hungary with EU degree recognition and affordable tuition fees from €3,000 per year. 65+ universities, 95% success rate, English programs, and multiple scholarship opportunities.',
  keywords: [
    'study in Hungary',
    'Hungary universities',
    'EU degree recognition',
    'Hungary education',
    'Stipendium Hungaricum',
    'Hungary student visa',
    'Hungary tuition fees',
    'study abroad Hungary',
    'Budapest universities',
    'Semmelweis University',
    'Hungary scholarships',
    'English programs Hungary',
    'affordable education Hungary',
    'Central European education',
    'Hungary international students',
    'Hungary education system',
    'Hungary visa requirements',
    'study in Budapest',
    'Hungary medical programs'
  ],
  openGraph: {
    title: 'Study in Hungary - EU Degree Recognition & Affordable Education',
    description: 'Experience world-class education with EU degree recognition and affordable tuition fees in Hungary\'s leading universities. From €3,000 per year with scholarships available.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EduExpress International',
    images: [
      {
        url: '/images/hungary-study-abroad.jpg',
        width: 1200,
        height: 630,
        alt: 'Study in Hungary - EU Degree Recognition & Affordable Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Hungary - EU Degree Recognition & Affordable Education',
    description: 'Experience world-class education with EU degree recognition and affordable tuition fees in Hungary\'s leading universities.',
    images: ['/images/hungary-study-abroad.jpg'],
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
    canonical: 'https://www.eduexpressint.com/destinations/hungary',
  },
};

export default function HungaryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "description": "Study in Hungary with EU degree recognition and affordable tuition fees from €3,000 per year. 65+ universities, 95% success rate, English programs, and multiple scholarship opportunities.",
    "url": "https://www.eduexpressint.com/destinations/hungary",
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
      "name": "Study in Hungary Program",
      "description": "Study in Hungary with EU degree recognition from €3,000 per year",
      "price": "3000",
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
            // Track page view for Hungary
            if (typeof gtag !== 'undefined') {
              gtag('event', 'page_view', {
                page_title: 'Study in Hungary',
                page_location: window.location.href,
                content_group1: 'Hungary'
              });
            }
            
            // Track consultation button clicks
            document.addEventListener('click', function(e) {
              if (e.target.closest('[data-source*="hungary"]')) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'generate_lead', {
                    event_category: 'Consultation',
                    event_label: 'Hungary Page',
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
      <div className="relative bg-gradient-to-br from-red-600 via-white to-green-600 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-green-600/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Animated Flag */}
            <div className="text-9xl mb-8 animate-bounce">🇭🇺</div>
            
            {/* Main Heading with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-lg">
              Study in Hungary
            </h1>
            
            {/* Subtitle with EU Icon */}
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl mr-3">🇪🇺</span>
              <p className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                EU Degree Recognition
              </p>
            </div>
            
            {/* Price Highlight */}
            <div className="bg-white bg-opacity-95 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border-2 border-white shadow-2xl">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-yellow-600 mb-2">
                  From €3,000 Per Year!
                </div>
                <div className="text-lg text-gray-800 font-semibold">
                  With Scholarships Available
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
              Experience world-class education with EU degree recognition and affordable tuition fees in Hungary&apos;s leading universities.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-6xl mx-auto">
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">€3k-€8k</div>
                  <div className="text-sm font-semibold text-gray-800">Annual Tuition</div>
                  <div className="text-xs text-gray-600">With Scholarships Available</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">65+</div>
                  <div className="text-sm font-semibold text-gray-800">Universities</div>
                  <div className="text-xs text-gray-600">Top-Ranked Institutions</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-sm font-semibold text-gray-800">Success Rate</div>
                  <div className="text-xs text-gray-600">Proven Track Record</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">🇪🇺</div>
                  <div className="text-sm font-semibold text-gray-800">EU Recognition</div>
                  <div className="text-xs text-gray-600">Degrees Valid Across EU</div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ConsultationButton
                text="Apply Now - Start Your Journey!"
                source="hungary_page_hero_consultation"
                className="bg-white text-red-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              />
              <ConsultationButton
                text="Free Consultation"
                source="hungary_page_hero_free_consultation"
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
            <p className="text-xl font-bold">Multiple Intakes Available - Apply Early</p>
            <span className="text-2xl animate-pulse">🎓</span>
          </div>
        </div>
      </div>

      {/* Why Choose Hungary Section */}
      <div className="bg-gradient-to-br from-gray-50 to-red-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
              <span className="text-4xl">🌟</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Study in Hungary?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              🇭🇺 Hungary offers the perfect combination of EU degree recognition, affordable education, and excellent scholarship opportunities with world-class universities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🇪🇺</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">EU Degree Recognition</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Degrees recognized across all EU countries and internationally with full validity.</p>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                Valid Across All EU Countries
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Affordable Education</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Low tuition fees starting from €3,000 per year with scholarship opportunities.</p>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                From €3,000 Per Year
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">English Programs</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Wide range of English-taught programs with no Hungarian language requirement.</p>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                No Hungarian Required
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rich Culture</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Central European heritage with beautiful architecture and rich history.</p>
              <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                Central European Heritage
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hungary Education Statistics */}
      <div className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-green-50"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-green-200 rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-green-600 rounded-full mb-6">
              <span className="text-2xl text-white">📊</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Study in Hungary with World-Class Education
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join prestigious Hungarian universities offering world-class education with affordable tuition fees. Start your academic journey with excellent support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">💰</div>
                <div className="text-2xl font-bold mb-2">Affordable Tuition</div>
                <div className="text-5xl font-bold mb-2">€3k-8k</div>
                <div className="text-lg">EUR/year</div>
                <div className="text-sm text-white opacity-95 mt-2">With Scholarships</div>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🇪🇺</div>
                <div className="text-2xl font-bold mb-2">EU Recognition</div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-lg">Recognition</div>
                <div className="text-sm text-white opacity-95 mt-2">Across All EU Countries</div>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🎓</div>
                <div className="text-2xl font-bold mb-2">Apply Early</div>
                <div className="text-5xl font-bold mb-2">Multiple</div>
                <div className="text-lg">Intakes</div>
                <div className="text-sm text-white opacity-95 mt-2">Early Application</div>
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
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-green-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-green-600 rounded-full mb-6">
              <span className="text-4xl text-white">🎓</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Popular Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a wide range of world-class programs across various disciplines
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">🏥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Medicine & Health Sciences</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    General Medicine
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Dentistry
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Pharmacy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Veterinary
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">⚙️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Engineering & Technology</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Computer Science
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Mechanical
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Civil
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Electrical
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Business & Economics</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Business Administration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Economics
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    International Relations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Finance
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Arts & Humanities</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Psychology
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Education
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Languages
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Cultural Studies
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
                  <span className="text-gray-800">EU degree recognition across all member countries</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Affordable tuition fees from €3,000 per year</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">No entrance exams for most programs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Direct application to universities</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Low cost of living (€400-600/month)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">English-taught programs available</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Central European location and culture</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-800">Strong international student community</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Intake Information</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Available Intakes</h4>
                  <p className="text-gray-700">Multiple Intakes Available</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Visa Success Rate</h4>
                  <p className="text-2xl font-bold text-green-600">95%+</p>
                  <p className="text-gray-700">success rate with our expert guidance and proven application process</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h4>
                  <p className="text-2xl font-bold text-purple-600">2-4 weeks</p>
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
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-green-600 rounded-full mb-6">
              <span className="text-4xl text-white">🤝</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Partner Universities
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We have partnerships with top Hungarian universities and leading education providers to help you get admission and comprehensive support
            </p>
          </div>
          
          {/* Logo Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-scroll space-x-8">
                {/* First set of logos */}
                {[
                  { name: 'University of Budapest', logo: '🏛️', color: 'from-red-500 to-red-700' },
                  { name: 'Semmelweis University', logo: '🏥', color: 'from-green-500 to-green-700' },
                  { name: 'Corvinus University', logo: '💼', color: 'from-blue-500 to-blue-700' },
                  { name: 'Budapest University of Technology', logo: '⚙️', color: 'from-purple-500 to-purple-700' },
                  { name: 'University of Debrecen', logo: '🎓', color: 'from-indigo-500 to-indigo-700' },
                  { name: 'University of Szeged', logo: '📚', color: 'from-yellow-500 to-yellow-700' },
                  { name: 'Pécs University', logo: '🏰', color: 'from-pink-500 to-pink-700' },
                  { name: 'University of Miskolc', logo: '🏭', color: 'from-teal-500 to-teal-700' },
                  { name: 'Stipendium Hungaricum', logo: '💰', color: 'from-orange-500 to-orange-700' },
                  { name: 'Hungarian Government Scholarships', logo: '🎯', color: 'from-cyan-500 to-cyan-700' },
                  { name: 'Erasmus+ Programs', logo: '🌐', color: 'from-emerald-500 to-emerald-700' },
                  { name: 'Study in Hungary', logo: '🇭🇺', color: 'from-rose-500 to-rose-700' },
                  { name: 'EU Education Network', logo: '🇪🇺', color: 'from-sky-500 to-sky-700' }
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
                  { name: 'University of Budapest', logo: '🏛️', color: 'from-red-500 to-red-700' },
                  { name: 'Semmelweis University', logo: '🏥', color: 'from-green-500 to-green-700' },
                  { name: 'Corvinus University', logo: '💼', color: 'from-blue-500 to-blue-700' },
                  { name: 'Budapest University of Technology', logo: '⚙️', color: 'from-purple-500 to-purple-700' },
                  { name: 'University of Debrecen', logo: '🎓', color: 'from-indigo-500 to-indigo-700' },
                  { name: 'University of Szeged', logo: '📚', color: 'from-yellow-500 to-yellow-700' },
                  { name: 'Pécs University', logo: '🏰', color: 'from-pink-500 to-pink-700' },
                  { name: 'University of Miskolc', logo: '🏭', color: 'from-teal-500 to-teal-700' },
                  { name: 'Stipendium Hungaricum', logo: '💰', color: 'from-orange-500 to-orange-700' },
                  { name: 'Hungarian Government Scholarships', logo: '🎯', color: 'from-cyan-500 to-cyan-700' },
                  { name: 'Erasmus+ Programs', logo: '🌐', color: 'from-emerald-500 to-emerald-700' },
                  { name: 'Study in Hungary', logo: '🇭🇺', color: 'from-rose-500 to-rose-700' },
                  { name: 'EU Education Network', logo: '🇪🇺', color: 'from-sky-500 to-sky-700' }
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
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Exclusive Scholarships</h4>
                <p className="text-gray-700">Access to special scholarship programs for our students</p>
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
                source="hungary_page_partner_universities"
                className="bg-gradient-to-r from-red-600 to-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-red-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-red-600 via-white to-green-600 text-white py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-green-600/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg">
            Start Your Education Journey in Hungary
          </h2>
          <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
            Join thousands of students who are already pursuing world-class education with EU degree recognition. Experience affordable education and rich culture!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">💰</div>
              <div className="text-xl font-bold mb-2 text-white">Scholarships Available</div>
              <div className="text-sm text-white">Various scholarship opportunities for international students</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">✅</div>
              <div className="text-xl font-bold mb-2 text-white">95%+ Success Rate</div>
              <div className="text-sm text-white">High approval rate with our expertise</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">🇪🇺</div>
              <div className="text-xl font-bold mb-2 text-white">EU Recognition</div>
              <div className="text-sm text-white">Degrees recognized across all EU countries</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <ConsultationButton
              text="Apply Now - Start Your Journey!"
              source="hungary_page_cta_apply"
              className="bg-white text-red-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            />
            <ConsultationButton
              text="Free Consultation"
              source="hungary_page_cta_consultation"
              className="border-2 border-white text-white py-5 px-10 rounded-xl font-bold text-xl hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            />
          </div>
          
          <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full inline-block font-bold text-lg animate-pulse">
            🇭🇺 Limited Time Opportunity - Apply Now! 🇭🇺
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
