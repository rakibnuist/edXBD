import { Metadata } from 'next';
import ConsultationButton from '@/components/ConsultationButton';

export const metadata: Metadata = {
  title: 'Study in China - Top Universities, Scholarships & Programs | 100% Free Education',
  description: 'Study in China with world-class universities like Tsinghua & Peking. Get 100% free education with full scholarships, learn Chinese culture, and access affordable education. Free consultation available.',
  keywords: [
    'study in china',
    'china universities',
    'chinese government scholarship',
    'tsinghua university',
    'peking university',
    'fudan university',
    'study abroad china',
    'china education',
    'international students china',
    'chinese language programs',
    'free education china',
    'csc scholarship',
    'china student visa',
    'chinese universities ranking',
    'study in china cost',
    'china education system'
  ],
  openGraph: {
    title: 'Study in China - Top Universities, Scholarships & Programs | 100% Free Education',
    description: 'Study in China with world-class universities like Tsinghua & Peking. Get 100% free education with full scholarships, learn Chinese culture, and access affordable education.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EduExpress International',
    images: [
      {
        url: '/images/china-study-abroad.jpg',
        width: 1200,
        height: 630,
        alt: 'Study in China - Top Universities, Scholarships & Programs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in China - Top Universities, Scholarships & Programs | 100% Free Education',
    description: 'Study in China with world-class universities like Tsinghua & Peking. Get 100% free education with full scholarships.',
    images: ['/images/china-study-abroad.jpg'],
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
    canonical: 'https://www.eduexpressint.com/destinations/china',
  },
};


const universities = [
  { name: 'Tsinghua University', logo: '🎓', color: 'from-red-500 to-red-700' },
  { name: 'Peking University', logo: '🏛️', color: 'from-yellow-500 to-yellow-700' },
  { name: 'Fudan University', logo: '📚', color: 'from-green-500 to-green-700' },
  { name: 'Shanghai Jiao Tong University', logo: '⚙️', color: 'from-blue-500 to-blue-700' },
  { name: 'Zhejiang University', logo: '🔬', color: 'from-purple-500 to-purple-700' },
  { name: 'University of Science and Technology of China', logo: '🧪', color: 'from-indigo-500 to-indigo-700' }
];

const scholarships = [
  { name: 'Chinese Government Scholarship (CSC)', amount: 'Full Tuition + Living Allowance', deadline: 'March 31st' },
  { name: 'Confucius Institute Scholarship', amount: 'Full Coverage', deadline: 'April 20th' },
  { name: 'Provincial Government Scholarships', amount: 'Partial to Full Coverage', deadline: 'Varies by province' },
  { name: 'University-specific Scholarships', amount: '10% - 100% Tuition Waiver', deadline: 'Varies by university' }
];

const popularPrograms = [
  { name: 'Engineering & Technology', programs: ['Computer Science', 'AI', 'Mechanical', 'Civil'] },
  { name: 'Business & Economics', programs: ['MBA', 'Finance', 'Marketing', 'International Business'] },
  { name: 'Medicine & Health', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing'] },
  { name: 'Arts & Humanities', programs: ['Law', 'Literature', 'History', 'Psychology'] }
];

const cities = [
  { name: 'Beijing', universities: '39', population: '21.5M', highlights: ['Capital city', 'Cultural center', 'Top universities'] },
  { name: 'Shanghai', universities: '64', population: '24.3M', highlights: ['Financial hub', 'International city', 'Modern lifestyle'] },
  { name: 'Guangzhou', universities: '83', population: '15.3M', highlights: ['Business center', 'Cantonese culture', 'Trade hub'] },
  { name: 'Hangzhou', universities: '47', population: '10.4M', highlights: ['Tech hub', 'Beautiful scenery', 'Alibaba headquarters'] }
];

export default function ChinaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "description": "Study in China with world-class universities like Tsinghua & Peking. Get 100% free education with full scholarships, learn Chinese culture, and access affordable education.",
    "url": "https://www.eduexpressint.com/destinations/china",
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
      "name": "Study in China Program",
      "description": "Study in China with 100% free education through full scholarships",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "China Study Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Engineering Programs",
            "description": "Engineering programs at top Chinese universities"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Business Programs",
            "description": "Business and management programs in China"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Medical Programs",
            "description": "Medical and health science programs in China"
          }
        }
      ]
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
            // Track page view for China
            if (typeof gtag !== 'undefined') {
              gtag('event', 'page_view', {
                page_title: 'Study in China',
                page_location: window.location.href,
                content_group1: 'China'
              });
            }
            
            // Track consultation button clicks
            document.addEventListener('click', function(e) {
              if (e.target.closest('[data-source*="china"]')) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'generate_lead', {
                    event_category: 'Consultation',
                    event_label: 'China Page',
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
      <div className="relative bg-gradient-to-br from-red-600 via-yellow-500 to-orange-600 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Animated Flag */}
            <div className="text-9xl mb-8 animate-bounce">🇨🇳</div>
            
            {/* Main Heading with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-lg">
              Study in China
            </h1>
            
            {/* Subtitle with Dragon Icon */}
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl mr-3">🐉</span>
              <p className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                World-Class Education
              </p>
            </div>
            
            {/* Price Highlight */}
            <div className="bg-white bg-opacity-95 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border-2 border-white shadow-2xl">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-2">
                  100% FREE Education!
                </div>
                <div className="text-lg text-gray-800 font-semibold">
                  With Full Scholarship Programs
                </div>
              </div>
            </div>
            
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
              Experience world-class education at top Chinese universities through our extensive network of partnerships with leading institutions and education providers.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-6xl mx-auto">
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
                  <div className="text-sm font-semibold text-gray-800">Free Tuition</div>
                  <div className="text-xs text-gray-600">Full Scholarship Coverage</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">150+</div>
                  <div className="text-sm font-semibold text-gray-800">Universities</div>
                  <div className="text-xs text-gray-600">Partner Institutions</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">¥500-3,500</div>
                  <div className="text-sm font-semibold text-gray-800">Monthly Stipend</div>
                  <div className="text-xs text-gray-600">CNY per month</div>
                </div>
              </div>
              <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%+</div>
                  <div className="text-sm font-semibold text-gray-800">Visa Success</div>
                  <div className="text-xs text-gray-600">High Approval Rate</div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ConsultationButton
                text="Apply for Full Scholarships"
                source="china_page_hero_consultation"
                className="bg-white text-red-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              />
              <ConsultationButton
                text="Free Consultation"
                source="china_page_hero_free_consultation"
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
            <p className="text-xl font-bold">Multiple Intakes Available - March & September</p>
            <span className="text-2xl animate-pulse">🎓</span>
          </div>
        </div>
      </div>

      {/* Why Choose China Section */}
      <div className="bg-gradient-to-br from-gray-50 to-red-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-600 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-400 to-yellow-500 rounded-full mb-6">
              <span className="text-4xl">🌟</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Study in China?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              China offers the perfect combination of world-class education, prestigious universities, and excellent opportunities with global recognition through our extensive partner network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-red-500 to-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% Free Tuition</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Full scholarship coverage for tuition fees at 150+ prestigious universities with world-class rankings.</p>
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                CSC & Provincial Scholarships
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Free Accommodation</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">University dormitory accommodation included in scholarship package with modern facilities.</p>
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                Modern Dormitories
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Stipend</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">Receive ¥500-3,500 CNY monthly stipend for living expenses and personal needs.</p>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                Living Allowance
              </div>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">English Programs</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">1000+ English-taught programs with no Chinese language requirement for admission.</p>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                No Chinese Required
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* China Education Statistics */}
      <div className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-yellow-50"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-600 rounded-full mb-6">
              <span className="text-2xl text-white">📊</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Study in China with World-Class Education
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join prestigious Chinese universities through our extensive partner network. Experience world-class education with global recognition and full scholarship opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🎓</div>
                <div className="text-2xl font-bold mb-2">Partner Universities</div>
                <div className="text-5xl font-bold mb-2">150+</div>
                <div className="text-lg">Chinese Universities</div>
                <div className="text-sm text-white opacity-95 mt-2">Including Tsinghua & Peking</div>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">💰</div>
                <div className="text-2xl font-bold mb-2">Full Scholarships</div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-lg">Tuition Coverage</div>
                <div className="text-sm text-white opacity-95 mt-2">CSC & Provincial Programs</div>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🌍</div>
                <div className="text-2xl font-bold mb-2">English Programs</div>
                <div className="text-5xl font-bold mb-2">1000+</div>
                <div className="text-lg">Programs Available</div>
                <div className="text-sm text-white opacity-95 mt-2">No Chinese Required</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Partner Universities Section */}
            <section id="universities">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Partner Universities</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <p className="text-gray-600 mb-8 text-center">
                  We have 150+ Universities with comprehensive scholarship opportunities.
                </p>
                
                {/* University Logos Carousel */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-scroll space-x-8">
                    {/* First set of logos */}
                    {universities.map((university, index: number) => (
                      <div key={index} className="flex-shrink-0">
                        <div className={`bg-gradient-to-r ${university.color} text-white rounded-2xl p-8 w-64 h-40 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                          <div className="text-4xl mb-3">{university.logo}</div>
                          <h3 className="text-lg font-bold text-center leading-tight">{university.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>
            </section>

            {/* Popular Programs Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Programs</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {popularPrograms.map((program, index: number) => (
                    <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-red-500 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl text-white">🎓</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{program.name}</h3>
                        <ul className="text-gray-700 space-y-2 text-sm">
                          {program.programs.map((prog, progIndex) => (
                            <li key={progIndex} className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                              {prog}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Special Features & Benefits */}
            <section>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                🌟 Special Features & Benefits
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-800">CSC & provincial full scholarships</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-800">1000+ English-taught programs</span>
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
                      <span className="text-gray-800">95%+ visa success rate</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-800">Foundation preparation program</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-800">Modern facilities and technology</span>
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
                    <div className="bg-red-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Available Intakes</h4>
                      <p className="text-gray-700">March & September Intakes Available</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Visa Success Rate</h4>
                      <p className="text-2xl font-bold text-green-600">95%+</p>
                      <p className="text-gray-700">success rate with our expert guidance and proven application process</p>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h4>
                      <p className="text-2xl font-bold text-yellow-600">2-4 weeks</p>
                      <p className="text-gray-700">Quick visa processing with streamlined documentation</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Study Cities Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Study Cities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cities.map((city, index: number) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{city.name}</h3>
                    <p className="text-gray-600 mb-4">Population: {city.population} • Universities: {city.universities}</p>
                    <div className="space-y-2">
                      {city.highlights.map((highlight: string, highlightIndex: number) => (
                        <div key={highlightIndex} className="flex items-center space-x-2">
                          <span className="text-red-500">•</span>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Admission Requirements Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Admission Requirements</h2>
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600">🗣️</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Language Requirements</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-red-500">✓</span>
                      <span className="text-gray-700">HSK 4+ (Chinese programs)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-red-500">✓</span>
                      <span className="text-gray-700">IELTS 6.0+ (English programs)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-red-500">✓</span>
                      <span className="text-gray-700">TOEFL 80+ (English programs)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-red-500">✓</span>
                      <span className="text-gray-700">Chinese Language Certificate</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Note:</strong> Many universities offer English-taught programs. Chinese language courses are available for beginners.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600">📄</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Required Documents</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">Academic Transcripts (translated)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">Language Proficiency Certificate</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">Personal Statement</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">Health Certificate</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">Passport Copy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">Financial Proof</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Apply Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Apply</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💬</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Consult</h3>
                    <p className="text-gray-600 mb-4">
                      Meet with our China education experts for FREE consultation and university selection.
                    </p>
                    <ConsultationButton
                      text="Book Free Consultation"
                      source="china_page_apply_consultation"
                      className="bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
                    />
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Apply</h3>
                    <p className="text-gray-600 mb-4">
                      We&apos;ll assist you with the complete application process to Chinese universities.
                    </p>
                    <div className="text-sm text-gray-500">
                      <p><strong>Intake:</strong></p>
                      <p className="text-green-600 font-medium">March, September</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✈️</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Fly</h3>
                    <p className="text-gray-600 mb-4">
                      We&apos;ll support you with visa applications and travel arrangements to China.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Enhanced Scholarships Section */}
            <div id="scholarships" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">🎓 Full Scholarship Programs</h3>
              
              {/* Scholarship Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">100%</div>
                  <div className="text-sm text-gray-600">Tuition Free</div>
                  <div className="text-xs text-gray-500">150+ Universities</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">¥500-3,500</div>
                  <div className="text-sm text-gray-600">Monthly Stipend</div>
                  <div className="text-xs text-gray-500">CNY/month</div>
                </div>
              </div>

              {/* Full Scholarship Benefits */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-gray-900">100% Free Tuition Fee</p>
                    <p className="text-sm text-gray-600">Full scholarship coverage</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 text-xl">🏠</span>
                  <div>
                    <p className="font-semibold text-gray-900">100% Free Accommodation</p>
                    <p className="text-sm text-gray-600">University dormitory included</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-600 text-xl">💰</span>
                  <div>
                    <p className="font-semibold text-gray-900">Monthly Stipend</p>
                    <p className="text-sm text-gray-600">¥500-3,500 CNY per month</p>
                  </div>
                </div>
              </div>

              {/* Scholarship Types */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900">Available Scholarships:</h4>
                {scholarships.map((scholarship, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-1">{scholarship.name}</h5>
                    <p className="text-sm text-red-600 mb-1">{scholarship.amount}</p>
                    <p className="text-xs text-gray-600">Deadline: {scholarship.deadline}</p>
                  </div>
                ))}
              </div>

              {/* Intake Information */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="text-blue-600 mr-2">📅</span>
                  Intake Information
                </h4>
                <div className="text-sm text-gray-700">
                  <p className="font-medium">Intake: <span className="text-blue-600 font-semibold">March, September</span></p>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">🌟 Special Features & Benefits</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>CSC & provincial full scholarships</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>1000+ English-taught programs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>No entrance exams for most programs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Direct admission process</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>95%+ visa success rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Foundation preparation program</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Visa Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Visa Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Visa Type</h4>
                  <p className="text-gray-700">Student Visa (X1/X2)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                  <p className="text-gray-700">1-4 years (renewable)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• JW201/JW202 Form</li>
                    <li>• Financial Documents</li>
                    <li>• Health Certificate</li>
                    <li>• Passport Copy</li>
                    <li>• Admission Letter</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Population:</span>
                  <span className="font-medium">1.4 billion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Universities:</span>
                  <span className="font-medium">2,800+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">International Students:</span>
                  <span className="font-medium">500,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Official Language:</span>
                  <span className="font-medium">Mandarin Chinese</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Currency:</span>
                  <span className="font-medium">Chinese Yuan (CNY)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Climate:</span>
                  <span className="font-medium">Diverse (Temperate to Tropical)</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Ready to Study in China?</h3>
              <p className="mb-6">Get FREE consultation and scholarship assistance for your China education journey</p>
              <ConsultationButton
                text="Get FREE Consultation"
                source="china_page_consultation"
                className="bg-white text-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block w-full text-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-br from-red-600 via-yellow-500 to-orange-600 text-white py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg">
            Start Your Education Journey in China
          </h2>
          <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
            Join thousands of students who are already pursuing world-class education at top Chinese universities. Get 100% FREE education through our extensive partner network!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">💰</div>
              <div className="text-xl font-bold mb-2 text-white">100% Free Education</div>
              <div className="text-sm text-white">Full scholarships covering tuition, accommodation & stipend</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">✅</div>
              <div className="text-xl font-bold mb-2 text-white">95%+ Visa Success</div>
              <div className="text-sm text-white">High approval rate with our expertise</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="text-3xl mb-3">🌍</div>
              <div className="text-xl font-bold mb-2 text-white">Global Recognition</div>
              <div className="text-sm text-white">World-class degrees from top Chinese universities</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <ConsultationButton
              text="Apply for Full Scholarships"
              source="china_page_cta_apply"
              className="bg-white text-red-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            />
            <ConsultationButton
              text="Free Consultation"
              source="china_page_cta_consultation"
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
