import { Metadata } from 'next';
import ConsultationButton from '@/components/ConsultationButton';
import { countries } from '@/lib/countries';

export const metadata: Metadata = {
  title: 'Study Abroad Destinations - Top Universities & Scholarship Opportunities',
  description: 'Explore top study abroad destinations with scholarship opportunities. Study in UK, China, South Korea, Hungary, Cyprus, Croatia, Georgia, Finland, Netherlands and more. Get expert guidance and visa assistance.',
  keywords: [
    'study abroad destinations',
    'international universities',
    'scholarship opportunities',
    'UK universities',
    'China universities',
    'South Korea education',
    'Hungary study',
    'Cyprus universities',
    'Croatia education',
    'Georgia universities',
    'Finland education',
    'Netherlands universities',
    'study abroad programs',
    'international education',
    'student visa assistance',
    'education consultancy',
    'overseas education'
  ],
  openGraph: {
    title: 'Study Abroad Destinations - Top Universities & Scholarship Opportunities',
    description: 'Explore top study abroad destinations with scholarship opportunities. Study in UK, China, South Korea, Hungary, Cyprus, Croatia, Georgia, Finland, Netherlands and more.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EduExpress International',
    images: [
      {
        url: '/images/study-abroad-destinations.jpg',
        width: 1200,
        height: 630,
        alt: 'Study Abroad Destinations - Top Universities & Scholarship Opportunities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Abroad Destinations - Top Universities & Scholarship Opportunities',
    description: 'Explore top study abroad destinations with scholarship opportunities. Study in UK, China, South Korea, Hungary, Cyprus, Croatia, Georgia, Finland, Netherlands and more.',
    images: ['/images/study-abroad-destinations.jpg'],
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
    canonical: 'https://www.eduexpressint.com/destinations',
  },
};

export default function DestinationsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "description": "Explore top study abroad destinations with scholarship opportunities. Study in UK, China, South Korea, Hungary, Cyprus, Croatia, Georgia, Finland, Netherlands and more.",
    "url": "https://www.eduexpressint.com/destinations",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Study Abroad Destinations",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Study in China",
            "description": "Study in China with world-class universities and scholarship opportunities"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Study in UK",
            "description": "Study in UK with Russell Group universities and world-class education"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Study in Netherlands",
            "description": "Study in Netherlands with innovation excellence and EU work rights"
          }
        }
      ]
    }
  };

  // Use shared countries data

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
            // Track page view for destinations
            if (typeof gtag !== 'undefined') {
              gtag('event', 'page_view', {
                page_title: 'Study Abroad Destinations',
                page_location: window.location.href,
                content_group1: 'Destinations'
              });
            }
            
            // Track consultation button clicks
            document.addEventListener('click', function(e) {
              if (e.target.closest('[data-source*="destinations"]')) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'generate_lead', {
                    event_category: 'Consultation',
                    event_label: 'Destinations Page',
                    value: 1
                  });
                }
              }
            });
          `
        }}
      />
      
      <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Study Abroad Destinations
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
            Explore top study abroad destinations with scholarship opportunities
          </p>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country) => (
            <div key={country.slug} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{country.flag}</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{country.name}</h2>
                  <p className="text-gray-600">{country.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Top Universities</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {country.universities.slice(0, 3).map((university, index) => (
                        <li key={index}>• {university}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Popular Programs</h3>
                    <div className="flex flex-wrap gap-2">
                      {country.programs.slice(0, 4).map((program, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">Tuition:</span>
                    <p className="text-gray-600">{country.costs.tuition}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Living:</span>
                    <p className="text-gray-600">{country.costs.living}</p>
                  </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href={country.slug === 'china' ? '/destinations/china' : `/destinations/${country.slug}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center block"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get FREE consultation and scholarship assistance for your dream destination
          </p>
          <ConsultationButton
            text="Get FREE Consultation"
            source="destinations_page_consultation"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-block"
          />
        </div>
      </div>
      </div>
    </>
  );
}
