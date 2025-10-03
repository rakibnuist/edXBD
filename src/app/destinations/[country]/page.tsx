import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ConsultationButton from '@/components/ConsultationButton';

interface CountryPageProps {
  params: Promise<{
    country: string;
  }>;
}

interface University {
  name: string;
  ranking: string;
  programs: string[];
  logo?: string;
}

interface CountryData {
  name: string;
  flag: string;
  description: string;
  universities: University[];
  requirements: {
    language: string[];
    documents: string[];
    visa: string[];
  };
  costs: {
    tuition: string;
    living: string;
    total: string;
  };
  visa: {
    type: string;
    duration: string;
    requirements: string[];
    successRate?: string;
  };
  scholarships: string[];
  applicationDeadline: string;
  language: string;
  currency: string;
  climate: string;
  culture: string;
  specialFeatures?: {
    eapKapPrograms?: boolean;
    technologyExcellence?: boolean;
    flexibleVisas?: boolean;
    noEntranceExams?: boolean;
    directApplication?: boolean;
    techCompanies?: string[];
    visaProcessingTime?: string;
    coastalLifestyle?: boolean;
    euRecognition?: boolean;
    englishPrograms?: boolean;
  };
}

const countryData: Record<string, CountryData> = {
  'china': {
    name: 'China',
    flag: '🇨🇳',
    description: 'Rapidly growing education system with modern facilities and affordable costs',
    universities: [
      { name: 'Tsinghua University', ranking: '1st', programs: ['Engineering', 'Business', 'Computer Science', 'Medicine'] },
      { name: 'Peking University', ranking: '2nd', programs: ['Arts', 'Sciences', 'Medicine', 'Business'] },
      { name: 'Fudan University', ranking: '3rd', programs: ['Business', 'Medicine', 'Engineering', 'Arts'] },
      { name: 'Shanghai Jiao Tong University', ranking: '4th', programs: ['Engineering', 'Business', 'Medicine', 'Technology'] }
    ],
    requirements: {
      language: ['HSK 4+', 'IELTS 6.0+', 'TOEFL 80+'],
      documents: ['Academic Transcripts', 'Language Proficiency', 'Personal Statement', 'Health Certificate', 'Passport Copy'],
      visa: ['Student Visa (X1/X2)', 'JW201/JW202 Form', 'Financial Documents', 'Health Certificate']
    },
    costs: {
      tuition: '$3,000 - $8,000 per year',
      living: '$2,000 - $4,000 per year',
      total: '$5,000 - $12,000 per year'
    },
    scholarships: [
      'Chinese Government Scholarship',
      'Confucius Institute Scholarship',
      'University Scholarships',
      'Provincial Scholarships'
    ],
    visa: {
      type: 'Student Visa (X1/X2)',
      duration: '1-4 years',
      requirements: ['JW201/JW202 Form', 'Financial Documents', 'Health Certificate', 'Passport Copy']
    },
    applicationDeadline: 'March 31st',
    language: 'Chinese/English',
    currency: 'CNY',
    climate: 'Temperate',
    culture: 'Rich history and traditions'
  },
  'south-korea': {
    name: 'South Korea',
    flag: '🇰🇷',
    description: '🇰🇷 Technology Excellence - Experience world-class technology education with EAP/KAP programs and flexible visa options in South Korea\'s leading universities.',
    universities: [
      { name: 'Seoul National University', ranking: '1st', programs: ['Engineering', 'Medicine', 'Business', 'Arts', 'Technology'] },
      { name: 'KAIST', ranking: '2nd', programs: ['Engineering', 'Technology', 'Computer Science', 'Business', 'AI & Robotics'] },
      { name: 'Yonsei University', ranking: '3rd', programs: ['Medicine', 'Business', 'Engineering', 'Arts', 'Digital Innovation'] },
      { name: 'Korea University', ranking: '4th', programs: ['Business', 'Law', 'Medicine', 'Engineering', 'Tech Innovation'] }
    ],
    requirements: {
      language: ['EAP/KAP Programs Available', 'TOPIK 3+', 'IELTS 6.0+', 'TOEFL 80+'],
      documents: ['Academic Transcripts', 'Language Proficiency', 'Personal Statement', 'Health Certificate', 'Passport Copy'],
      visa: ['Regional VISA (Bachelor)', 'E-VISA (Master)', 'Certificate of Admission', 'Financial Documents', 'Health Certificate']
    },
    costs: {
      tuition: '$3,000 - $7,000 per year',
      living: '$3,000 - $6,000 per year',
      total: '$6,000 - $13,000 per year'
    },
    scholarships: [
      'Korean Government Scholarship',
      'University Scholarships',
      'KGSP Scholarship',
      'Global Korea Scholarship',
      'EAP/KAP Program Scholarships'
    ],
    visa: {
      type: 'Regional VISA (Bachelor) / E-VISA (Master)',
      duration: '1-4 years',
      requirements: ['Certificate of Admission', 'Financial Documents', 'Health Certificate', 'Passport Copy'],
      successRate: '95%+'
    },
    applicationDeadline: 'Multiple Intakes Available',
    language: 'Korean/English (EAP/KAP Programs)',
    currency: 'KRW',
    climate: 'Temperate',
    culture: 'K-Culture & Rich Cultural Experience',
    specialFeatures: {
      eapKapPrograms: true,
      technologyExcellence: true,
      flexibleVisas: true,
      noEntranceExams: true,
      directApplication: true,
      techCompanies: ['Samsung', 'LG', 'Hyundai'],
      visaProcessingTime: '2-4 weeks'
    }
  },
  'uk': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'Experience world-class education at Russell Group universities with excellent scholarship opportunities and global recognition',
    universities: [
      { name: 'University of Oxford', ranking: '1st', programs: ['Business & Management', 'Engineering & Technology', 'Medicine & Health', 'Arts & Humanities'] },
      { name: 'University of Cambridge', ranking: '2nd', programs: ['Engineering & Technology', 'Medicine & Health', 'Arts & Humanities', 'Business & Management'] },
      { name: 'Imperial College London', ranking: '3rd', programs: ['Engineering & Technology', 'Medicine & Health', 'Business & Management', 'Computer Science'] },
      { name: 'London School of Economics', ranking: '4th', programs: ['Business & Management', 'Economics', 'Law', 'Social Sciences'] },
      { name: 'University College London', ranking: '5th', programs: ['Medicine & Health', 'Engineering & Technology', 'Arts & Humanities', 'Business & Management'] },
      { name: 'King\'s College London', ranking: '6th', programs: ['Medicine & Health', 'Law', 'Arts & Humanities', 'Social Sciences'] }
    ],
    requirements: {
      language: ['IELTS 6.5+', 'TOEFL 90+', 'PTE 62+', 'Cambridge English'],
      documents: ['Academic Transcripts', 'English Proficiency', 'Personal Statement', 'References', 'Passport Copy', 'UCAS Application'],
      visa: ['Student Visa (Tier 4)', 'Financial Documents', 'CAS Letter', 'TB Test Certificate', 'Biometric Residence Permit']
    },
    costs: {
      tuition: '£15,000 - £35,000 per year',
      living: '£800 - £1,200 per month',
      total: '£24,000 - £50,000 per year'
    },
    scholarships: [
      'Chevening Scholarships',
      'Commonwealth Scholarships',
      'Rhodes Scholarships',
      'Gates Cambridge Scholarships',
      'University-specific Scholarships',
      'Government Scholarships'
    ],
    visa: {
      type: 'Student Visa (Tier 4) / Graduate Route',
      duration: '1-4 years + 2 years post-study work',
      requirements: ['CAS Letter', 'Financial Documents', 'TB Test Certificate', 'Passport Copy', 'Biometric Residence Permit']
    },
    applicationDeadline: 'January 15th (UCAS)',
    language: 'English',
    currency: 'GBP',
    climate: 'Temperate',
    culture: 'Rich history, diverse culture, and global recognition'
  },
  'netherlands': {
    name: 'Netherlands',
    flag: '🇳🇱',
    description: 'Innovation and international focus in education with English-taught programs',
    universities: [
      { name: 'Delft University of Technology', ranking: '1st', programs: ['Engineering', 'Technology', 'Architecture', 'Computer Science'] },
      { name: 'University of Amsterdam', ranking: '2nd', programs: ['Business', 'Economics', 'Law', 'Social Sciences'] },
      { name: 'Erasmus University Rotterdam', ranking: '3rd', programs: ['Business', 'Economics', 'Medicine', 'Social Sciences'] },
      { name: 'Utrecht University', ranking: '4th', programs: ['Medicine', 'Sciences', 'Arts', 'Social Sciences'] }
    ],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+', 'Cambridge English'],
      documents: ['Academic Transcripts', 'English Proficiency', 'Personal Statement', 'References', 'Passport Copy'],
      visa: ['Student Visa (MVV)', 'Financial Documents', 'Admission Letter', 'Health Insurance']
    },
    costs: {
      tuition: '€8,000 - €15,000 per year',
      living: '€8,000 - €12,000 per year',
      total: '€16,000 - €27,000 per year'
    },
    scholarships: [
      'Holland Scholarship',
      'Orange Tulip Scholarship',
      'University Scholarships',
      'Government Scholarships'
    ],
    visa: {
      type: 'Student Visa (MVV)',
      duration: '1-4 years',
      requirements: ['Admission Letter', 'Financial Documents', 'Health Insurance', 'Passport Copy']
    },
    applicationDeadline: 'April 1st',
    language: 'English/Dutch',
    currency: 'EUR',
    climate: 'Temperate',
    culture: 'International and innovative'
  },
  'finland': {
    name: 'Finland',
    flag: '🇫🇮',
    description: 'Nordic excellence in education and innovation with world-class research',
    universities: [
      { name: 'University of Helsinki', ranking: '1st', programs: ['Medicine', 'Sciences', 'Arts', 'Social Sciences'] },
      { name: 'Aalto University', ranking: '2nd', programs: ['Engineering', 'Business', 'Technology', 'Arts'] },
      { name: 'University of Turku', ranking: '3rd', programs: ['Medicine', 'Sciences', 'Arts', 'Social Sciences'] },
      { name: 'Tampere University', ranking: '4th', programs: ['Engineering', 'Technology', 'Medicine', 'Social Sciences'] }
    ],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+', 'Finnish/Swedish (some programs)'],
      documents: ['Academic Transcripts', 'Language Proficiency', 'Personal Statement', 'References', 'Passport Copy'],
      visa: ['Student Visa (D)', 'Financial Documents', 'Admission Letter', 'Health Insurance']
    },
    costs: {
      tuition: '€8,000 - €15,000 per year',
      living: '€6,000 - €8,000 per year',
      total: '€14,000 - €23,000 per year'
    },
    scholarships: [
      'Finnish Government Scholarship',
      'University Scholarships',
      'CIMO Scholarships',
      'Erasmus+ Scholarships'
    ],
    visa: {
      type: 'Student Visa (D)',
      duration: '1-4 years',
      requirements: ['Admission Letter', 'Financial Documents', 'Health Insurance', 'Passport Copy']
    },
    applicationDeadline: 'January 15th',
    language: 'English/Finnish/Swedish',
    currency: 'EUR',
    climate: 'Temperate',
    culture: 'Nordic excellence and innovation'
  },
  'hungary': {
    name: 'Hungary',
    flag: '🇭🇺',
    description: 'Central European excellence with affordable education and rich history',
    universities: [
      { name: 'University of Budapest', ranking: '1st', programs: ['Medicine', 'Engineering', 'Business', 'Arts'] },
      { name: 'Semmelweis University', ranking: '2nd', programs: ['Medicine', 'Health Sciences', 'Pharmacy', 'Dentistry'] },
      { name: 'Corvinus University', ranking: '3rd', programs: ['Business', 'Economics', 'Social Sciences', 'Arts'] },
      { name: 'Budapest University of Technology', ranking: '4th', programs: ['Engineering', 'Technology', 'Architecture', 'Computer Science'] }
    ],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+', 'Hungarian (some programs)'],
      documents: ['Academic Transcripts', 'Language Proficiency', 'Personal Statement', 'Health Certificate', 'Passport Copy'],
      visa: ['Student Visa (D)', 'Financial Documents', 'Admission Letter', 'Health Insurance']
    },
    costs: {
      tuition: '€2,000 - €6,000 per year',
      living: '€3,000 - €5,000 per year',
      total: '€5,000 - €11,000 per year'
    },
    scholarships: [
      'Stipendium Hungaricum',
      'University Scholarships',
      'Government Scholarships',
      'Erasmus+ Scholarships'
    ],
    visa: {
      type: 'Student Visa (D)',
      duration: '1-4 years',
      requirements: ['Admission Letter', 'Financial Documents', 'Health Insurance', 'Passport Copy']
    },
    applicationDeadline: 'February 15th',
    language: 'English/Hungarian',
    currency: 'EUR',
    climate: 'Temperate',
    culture: 'Rich history and Central European heritage'
  },
  'cyprus': {
    name: 'Cyprus',
    flag: '🇨🇾',
    description: 'Mediterranean learning paradise with English programs and beautiful environment',
    universities: [
      { name: 'University of Cyprus', ranking: '1st', programs: ['Engineering', 'Business', 'Medicine', 'Arts'] },
      { name: 'European University Cyprus', ranking: '2nd', programs: ['Business', 'Medicine', 'Engineering', 'Arts'] },
      { name: 'Cyprus University of Technology', ranking: '3rd', programs: ['Engineering', 'Technology', 'Business', 'Arts'] },
      { name: 'University of Nicosia', ranking: '4th', programs: ['Business', 'Medicine', 'Engineering', 'Social Sciences'] }
    ],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+', 'English Proficiency'],
      documents: ['Academic Transcripts', 'Language Proficiency', 'Personal Statement', 'Health Certificate', 'Passport Copy'],
      visa: ['Student Visa', 'Financial Documents', 'Admission Letter', 'Health Insurance']
    },
    costs: {
      tuition: '€3,000 - €8,000 per year',
      living: '€4,000 - €6,000 per year',
      total: '€7,000 - €14,000 per year'
    },
    scholarships: [
      'University Scholarships',
      'Government Scholarships',
      'Merit-based Scholarships',
      'Need-based Scholarships'
    ],
    visa: {
      type: 'Student Visa',
      duration: '1-4 years',
      requirements: ['Admission Letter', 'Financial Documents', 'Health Insurance', 'Passport Copy']
    },
    applicationDeadline: 'July 31st',
    language: 'English/Greek',
    currency: 'EUR',
    climate: 'Mediterranean',
    culture: 'Mediterranean and European blend'
  },
  'croatia': {
    name: 'Croatia',
    flag: '🇭🇷',
    description: '🇭🇷 Coastal Excellence & EU Recognition - Experience world-class education with EU degree recognition and beautiful coastal lifestyle in Croatia\'s leading universities.',
    universities: [
      { name: 'University of Zagreb', ranking: '1st', programs: ['Tourism & Hospitality', 'Maritime Studies', 'Engineering & Technology', 'Business & Economics'] },
      { name: 'University of Split', ranking: '2nd', programs: ['Tourism Management', 'Maritime Engineering', 'Business Administration', 'Hotel Management'] },
      { name: 'University of Rijeka', ranking: '3rd', programs: ['Naval Architecture', 'Port Management', 'Event Management', 'International Business'] },
      { name: 'University of Dubrovnik', ranking: '4th', programs: ['Tourism & Hospitality', 'Maritime Studies', 'Business & Economics', 'Engineering'] }
    ],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+', 'English Programs Available'],
      documents: ['Academic Transcripts', 'Language Proficiency', 'Personal Statement', 'Health Certificate', 'Passport Copy'],
      visa: ['Student Visa (D)', 'Financial Documents', 'Admission Letter', 'Health Insurance']
    },
    costs: {
      tuition: '€2,000 - €8,000 per year',
      living: '€500 - €700 per month',
      total: '€8,000 - €15,000 per year'
    },
    scholarships: [
      'University Scholarships',
      'Government Scholarships',
      'Erasmus+ Scholarships',
      'Merit-based Scholarships',
      'EU Student Scholarships'
    ],
    visa: {
      type: 'Student Visa (D)',
      duration: '1-4 years',
      requirements: ['Admission Letter', 'Financial Documents', 'Health Insurance', 'Passport Copy'],
      successRate: '95%+'
    },
    applicationDeadline: 'October Intake - June 15th',
    language: 'English/Croatian',
    currency: 'EUR',
    climate: 'Mediterranean',
    culture: 'Adriatic coast heritage and Mediterranean lifestyle',
    specialFeatures: {
      coastalLifestyle: true,
      euRecognition: true,
      englishPrograms: true,
      noEntranceExams: true,
      directApplication: true,
      visaProcessingTime: '2-4 weeks'
    }
  },
  'georgia': {
    name: 'Georgia',
    flag: '🇬🇪',
    description: 'Caucasian mountain knowledge with affordable programs and unique culture',
    universities: [
      { name: 'Tbilisi State University', ranking: '1st', programs: ['Medicine', 'Business', 'Arts', 'Sciences'] },
      { name: 'Georgian Technical University', ranking: '2nd', programs: ['Engineering', 'Technology', 'Architecture', 'Computer Science'] },
      { name: 'Ilia State University', ranking: '3rd', programs: ['Business', 'Arts', 'Social Sciences', 'Sciences'] },
      { name: 'Caucasus University', ranking: '4th', programs: ['Business', 'Medicine', 'Engineering', 'Arts'] }
    ],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+', 'Georgian (some programs)'],
      documents: ['Academic Transcripts', 'Language Proficiency', 'Personal Statement', 'Health Certificate', 'Passport Copy'],
      visa: ['Student Visa', 'Financial Documents', 'Admission Letter', 'Health Insurance']
    },
    costs: {
      tuition: '$2,000 - $5,000 per year',
      living: '$2,000 - $4,000 per year',
      total: '$4,000 - $9,000 per year'
    },
    scholarships: [
      'Government Scholarships',
      'University Scholarships',
      'Merit-based Scholarships',
      'International Scholarships'
    ],
    visa: {
      type: 'Student Visa',
      duration: '1-4 years',
      requirements: ['Admission Letter', 'Financial Documents', 'Health Insurance', 'Passport Copy']
    },
    applicationDeadline: 'August 15th',
    language: 'English/Georgian',
    currency: 'USD',
    climate: 'Temperate',
    culture: 'Caucasian mountain heritage and unique traditions'
  }
};

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const country = countryData[countrySlug];
  
  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  // Enhanced metadata for all countries
  const baseUrl = 'https://www.eduexpressint.com';
  const countryUrl = `${baseUrl}/destinations/${countrySlug}`;
  
  // Remove any year references from titles and descriptions
  const cleanTitle = `Study in ${country.name} - Universities, Programs & Scholarships | EduExpress International`;
  const cleanDescription = `Study in ${country.name} with world-class education and scholarship opportunities. Explore top universities, programs, requirements, and costs for international students. Expert guidance available.`;

  return {
    title: cleanTitle,
    description: cleanDescription,
    keywords: [
      `study in ${country.name}`,
      `${country.name} universities`,
      `${country.name} education`,
      `${country.name} student visa`,
      `${country.name} scholarships`,
      'international students',
      'study abroad',
      'university admission',
      'education consultant',
      'student visa assistance',
      'scholarship opportunities',
      'higher education',
      'degree programs',
      'university ranking',
      'admission requirements'
    ],
    authors: [{ name: 'EduExpress International' }],
    creator: 'EduExpress International',
    publisher: 'EduExpress International',
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
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      type: 'website',
      locale: 'en_US',
      url: countryUrl,
      siteName: 'EduExpress International',
      images: [
        {
          url: `${baseUrl}/og-image-${countrySlug}.jpg`,
          width: 1200,
          height: 630,
          alt: `Study in ${country.name} - EduExpress International`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanDescription,
      images: [`${baseUrl}/og-image-${countrySlug}.jpg`],
      creator: '@eduexpressint',
      site: '@eduexpressint',
    },
    alternates: {
      canonical: countryUrl,
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug } = await params;
  const country = countryData[countrySlug];

  if (!country) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "description": `Study in ${country.name} with world-class education and scholarship opportunities. Explore top universities, programs, requirements, and costs for international students.`,
    "url": `https://www.eduexpressint.com/destinations/${countrySlug}`,
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
      "name": `Study in ${country.name} Program`,
      "description": `Study in ${country.name} with world-class education and scholarship opportunities`,
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
            // Track page view for ${country.name}
            if (typeof gtag !== 'undefined') {
              gtag('event', 'page_view', {
                page_title: 'Study in ${country.name}',
                page_location: window.location.href,
                content_group1: '${country.name}'
              });
            }
            
            // Track consultation button clicks
            document.addEventListener('click', function(e) {
              if (e.target.closest('[data-source*="${countrySlug}"]')) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'generate_lead', {
                    event_category: 'Consultation',
                    event_label: '${country.name} Page',
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
      <div className="relative bg-gradient-to-br from-red-600 via-blue-600 to-purple-700 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Animated Flag */}
            <div className="text-9xl mb-8 animate-bounce">{country.flag}</div>
            
            {/* Main Heading with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-lg">
              Study in {country.name}
            </h1>
            
            {countrySlug === 'south-korea' ? (
              <div className="mb-8">
                {/* Subtitle with Technology Icon */}
                <div className="flex items-center justify-center mb-6">
                  <span className="text-3xl mr-3">🚀</span>
                  <p className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                    Technology Excellence
                  </p>
                </div>
                
                {/* Price Highlight */}
                <div className="bg-white bg-opacity-95 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border-2 border-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-yellow-600 mb-2">
                      From $3,000 Per Year!
                    </div>
                    <div className="text-lg text-gray-800 font-semibold">
                      With EAP/KAP Programs
                    </div>
                  </div>
                </div>
                
                <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
                  {country.description}
                </p>
                
                {/* Enhanced Key Stats */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-6xl mx-auto">
                  <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">$3k-$7k</div>
                      <div className="text-sm font-semibold text-gray-800">Annual Tuition</div>
                      <div className="text-xs text-gray-600">With EAP/KAP Programs</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">60+</div>
                      <div className="text-sm font-semibold text-gray-800">Universities</div>
                      <div className="text-xs text-gray-600">Top-Ranked Institutions</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                      <div className="text-sm font-semibold text-gray-800">Visa Success</div>
                      <div className="text-xs text-gray-600">Regional & E-VISA</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">2-4</div>
                      <div className="text-sm font-semibold text-gray-800">Weeks</div>
                      <div className="text-xs text-gray-600">Visa Processing</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : countrySlug === 'croatia' ? (
              <div className="mb-8">
                {/* Subtitle with Coastal Icon */}
                <div className="flex items-center justify-center mb-6">
                  <span className="text-3xl mr-3">🏖️</span>
                  <p className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                    Coastal Excellence & EU Recognition
                  </p>
                </div>
                
                {/* Price Highlight */}
                <div className="bg-white bg-opacity-95 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border-2 border-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-yellow-600 mb-2">
                      From €2,000 Per Year!
                    </div>
                    <div className="text-lg text-gray-800 font-semibold">
                      With EU Degree Recognition
                    </div>
                  </div>
                </div>
                
                <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
                  {country.description}
                </p>
                
                {/* Enhanced Key Stats */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-6xl mx-auto">
                  <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">€2k-€8k</div>
                      <div className="text-sm font-semibold text-gray-800">Annual Tuition</div>
                      <div className="text-xs text-gray-600">Affordable Education</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white bg-opacity-95 rounded-xl p-6 border-2 border-white hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">8+</div>
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
                      <div className="text-3xl font-bold text-purple-600 mb-2">EU</div>
                      <div className="text-sm font-semibold text-gray-800">Recognition</div>
                      <div className="text-xs text-gray-600">Degrees Valid Across EU</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
                {country.description}
              </p>
            )}

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ConsultationButton
                text={countrySlug === 'south-korea' ? "Apply Now - Start Your Journey!" : countrySlug === 'croatia' ? "Apply Now - Start Your Journey!" : "Get FREE Consultation"}
                source={`country_page_${countrySlug}_hero_consultation`}
                className="bg-white text-blue-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              />
              <ConsultationButton
                text={countrySlug === 'south-korea' ? "Free Consultation" : countrySlug === 'croatia' ? "Free Consultation" : "Explore Universities"}
                source={`country_page_${countrySlug}_hero_free_consultation`}
                className="border-2 border-white text-white py-5 px-10 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Multiple Intakes Banner */}
      {countrySlug === 'south-korea' && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl animate-pulse">🎓</span>
              <p className="text-xl font-bold">🇰🇷 EAP/KAP Programs - Multiple Intakes Available</p>
              <span className="text-2xl animate-pulse">🎓</span>
            </div>
          </div>
        </div>
      )}

      {/* Croatia Intake Banner */}
      {countrySlug === 'croatia' && (
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl animate-pulse">🏖️</span>
              <p className="text-xl font-bold">🇭🇷 October Intake Available</p>
              <span className="text-2xl animate-pulse">🏖️</span>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-600 rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
              <span className="text-4xl">🌟</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Study in {country.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {countrySlug === 'south-korea' 
                ? "🇰🇷 South Korea offers the perfect combination of cutting-edge technology, EAP/KAP programs, and flexible visa options with world-class education."
                : countrySlug === 'croatia'
                ? "🇭🇷 Croatia offers the perfect combination of EU degree recognition, coastal lifestyle, and affordable education with world-class universities by the Adriatic Sea."
                : `Discover the unique advantages of studying in ${country.name} and why it's the perfect destination for your international education journey.`
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {countrySlug === 'south-korea' ? (
              <>
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Excellence</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">Leading in AI, robotics, and digital innovation with world-class tech companies.</p>
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Samsung, LG, Hyundai & More
                  </div>
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🎓</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">EAP/KAP Programs</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">English Academic Preparation and Korean Academic Preparation programs available.</p>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Direct University Pathway
                  </div>
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">📋</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Visa Options</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">Regional VISA for Bachelor&apos;s and E-VISA for Master&apos;s programs.</p>
                  <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Easy Application Process
                  </div>
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🎭</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">K-Culture</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">Rich Cultural Experience with modern lifestyle and K-wave.</p>
                  <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Rich Cultural Experience
                  </div>
                </div>
              </>
            ) : countrySlug === 'croatia' ? (
              <>
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
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🏖️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Coastal Lifestyle</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">Study by the beautiful Adriatic Sea with Mediterranean climate and stunning coastline.</p>
                  <div className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Beautiful Adriatic Coast
                  </div>
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Affordable Education</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">Low tuition fees starting from €2,000 per year with excellent value for money.</p>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    From €2,000 Per Year
                  </div>
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🗣️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">English Programs</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">No Croatian language requirement with comprehensive English-taught programs.</p>
                  <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                    No Croatian Required
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🎓</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Top Universities</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">World-renowned institutions with excellent academic reputation</p>
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Global Recognition
                  </div>
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Affordable Education</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">Quality education at competitive tuition fees</p>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Value for Money
                  </div>
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🌍</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">International Environment</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">Diverse student community from around the world</p>
                  <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Global Community
                  </div>
                </div>
                
                <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Career Opportunities</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">Excellent job prospects and work opportunities</p>
                  <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Future Success
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* South Korea Education Statistics */}
      {countrySlug === 'south-korea' && (
        <div className="py-20 bg-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-blue-50"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-blue-600 rounded-full mb-6">
                <span className="text-2xl text-white">📊</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Study in South Korea with Technology Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Join prestigious South Korean universities through our comprehensive support network. Experience world-class technology education with EAP/KAP programs and flexible visa options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group text-center">
                <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">🚀</div>
                  <div className="text-2xl font-bold mb-2">Technology Excellence</div>
                  <div className="text-5xl font-bold mb-2">60+</div>
                  <div className="text-lg">Top Universities</div>
                  <div className="text-sm text-white opacity-95 mt-2">Including KAIST, SNU</div>
                </div>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">🎓</div>
                  <div className="text-2xl font-bold mb-2">EAP/KAP Programs</div>
                  <div className="text-5xl font-bold mb-2">100%</div>
                  <div className="text-lg">Success Rate</div>
                  <div className="text-sm text-white opacity-95 mt-2">Direct University Pathway</div>
                </div>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">📋</div>
                  <div className="text-2xl font-bold mb-2">Visa Success</div>
                  <div className="text-5xl font-bold mb-2">95%</div>
                  <div className="text-lg">Approval Rate</div>
                  <div className="text-sm text-white opacity-95 mt-2">Regional & E-VISA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Croatia Education Statistics */}
      {countrySlug === 'croatia' && (
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
                Study in Croatia with Coastal Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Join prestigious Croatian universities offering world-class education with unique coastal lifestyle. Start your academic journey in October with excellent support and beautiful surroundings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">🏖️</div>
                  <div className="text-2xl font-bold mb-2">Coastal Excellence</div>
                  <div className="text-5xl font-bold mb-2">8+</div>
                  <div className="text-lg">Top Universities</div>
                  <div className="text-sm text-white opacity-95 mt-2">Adriatic Coast</div>
                </div>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">🇪🇺</div>
                  <div className="text-2xl font-bold mb-2">EU Recognition</div>
                  <div className="text-5xl font-bold mb-2">100%</div>
                  <div className="text-lg">Recognition</div>
                  <div className="text-sm text-white opacity-95 mt-2">Degrees Valid Across EU</div>
                </div>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">📋</div>
                  <div className="text-2xl font-bold mb-2">Visa Success</div>
                  <div className="text-5xl font-bold mb-2">95%</div>
                  <div className="text-lg">Success Rate</div>
                  <div className="text-sm text-white opacity-95 mt-2">Proven Track Record</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Programs for South Korea */}
      {countrySlug === 'south-korea' && (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-40 h-40 bg-red-600 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-600 rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-blue-600 rounded-full mb-6">
                <span className="text-4xl text-white">🎓</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Popular Programs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from a wide range of world-class technology and innovation programs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technology & Innovation</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      AI & Robotics
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Computer Science
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Digital Innovation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Engineering
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">💼</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business & Management</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      International Business
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Finance
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Marketing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      MBA
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
                    <span className="text-3xl text-white">🎨</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Arts & Culture</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      K-Culture Studies
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Korean Language
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Arts & Design
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Media Studies
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Programs for Croatia */}
      {countrySlug === 'croatia' && (
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
                Choose from a wide range of world-class programs with coastal excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🏨</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tourism & Hospitality</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Tourism Management
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Hotel Management
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Event Management
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Hospitality Studies
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">🚢</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Maritime Studies</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                      Maritime Engineering
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                      Naval Architecture
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                      Port Management
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                      Marine Technology
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
                      Civil Engineering
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Mechanical Engineering
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Electrical Engineering
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Computer Engineering
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">💼</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business & Economics</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Business Administration
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Economics
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      International Business
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Finance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Special Features Section for South Korea */}
      {countrySlug === 'south-korea' && country.specialFeatures && (
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
                    <span className="text-gray-800">EAP/KAP programs for English & Korean preparation</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">Regional VISA for Bachelor&apos;s, E-VISA for Master&apos;s</span>
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
                    <span className="text-gray-800">Affordable tuition ($3k-7k/year)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">Safe and modern environment</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">World-class technology and innovation</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">Rich Korean culture and K-wave experience</span>
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
      )}

      {/* Special Features Section for Croatia */}
      {countrySlug === 'croatia' && country.specialFeatures && (
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
                    <span className="text-gray-800">Affordable tuition fees from €2,000 per year</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">Beautiful coastal lifestyle by Adriatic Sea</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">No entrance exams for most programs</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">Low cost of living (€500-700/month)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">English-taught programs available</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-800">World-class maritime and tourism programs</span>
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
                    <p className="text-gray-700">October</p>
                    <p className="text-gray-700">February</p>
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
      )}

      {/* Partner Universities Carousel for South Korea */}
      {countrySlug === 'south-korea' && (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-600 rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-blue-600 rounded-full mb-6">
                <span className="text-4xl text-white">🤝</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Partner Universities
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We have partnerships with top South Korean universities and leading education providers to help you get admission and comprehensive support
              </p>
            </div>
            
            {/* Logo Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex animate-scroll space-x-8">
                  {/* First set of logos */}
                  {[
                    { name: 'Seoul National University', logo: '🏛️', color: 'from-red-500 to-red-700' },
                    { name: 'KAIST', logo: '🚀', color: 'from-blue-500 to-blue-700' },
                    { name: 'Yonsei University', logo: '🎓', color: 'from-green-500 to-green-700' },
                    { name: 'Korea University', logo: '👑', color: 'from-purple-500 to-purple-700' },
                    { name: 'Sungkyunkwan University', logo: '📚', color: 'from-indigo-500 to-indigo-700' },
                    { name: 'Hanyang University', logo: '⚙️', color: 'from-yellow-500 to-yellow-700' },
                    { name: 'Kyung Hee University', logo: '🌸', color: 'from-pink-500 to-pink-700' },
                    { name: 'Ewha Womans University', logo: '🌺', color: 'from-rose-500 to-rose-700' },
                    { name: 'Sogang University', logo: '⛪', color: 'from-teal-500 to-teal-700' },
                    { name: 'Chung-Ang University', logo: '🎭', color: 'from-orange-500 to-orange-700' },
                    { name: 'EAP/KAP Programs', logo: '📖', color: 'from-emerald-500 to-emerald-700' },
                    { name: 'Korean Language Institute', logo: '🗣️', color: 'from-cyan-500 to-cyan-700' },
                    { name: 'Study Korea', logo: '🇰🇷', color: 'from-sky-500 to-sky-700' }
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
                    { name: 'Seoul National University', logo: '🏛️', color: 'from-red-500 to-red-700' },
                    { name: 'KAIST', logo: '🚀', color: 'from-blue-500 to-blue-700' },
                    { name: 'Yonsei University', logo: '🎓', color: 'from-green-500 to-green-700' },
                    { name: 'Korea University', logo: '👑', color: 'from-purple-500 to-purple-700' },
                    { name: 'Sungkyunkwan University', logo: '📚', color: 'from-indigo-500 to-indigo-700' },
                    { name: 'Hanyang University', logo: '⚙️', color: 'from-yellow-500 to-yellow-700' },
                    { name: 'Kyung Hee University', logo: '🌸', color: 'from-pink-500 to-pink-700' },
                    { name: 'Ewha Womans University', logo: '🌺', color: 'from-rose-500 to-rose-700' },
                    { name: 'Sogang University', logo: '⛪', color: 'from-teal-500 to-teal-700' },
                    { name: 'Chung-Ang University', logo: '🎭', color: 'from-orange-500 to-orange-700' },
                    { name: 'EAP/KAP Programs', logo: '📖', color: 'from-emerald-500 to-emerald-700' },
                    { name: 'Korean Language Institute', logo: '🗣️', color: 'from-cyan-500 to-cyan-700' },
                    { name: 'Study Korea', logo: '🇰🇷', color: 'from-sky-500 to-sky-700' }
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
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-4xl mb-4">💰</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Exclusive Scholarships</h4>
                  <p className="text-gray-700">Access to special scholarship programs for our students</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Full Support</h4>
                  <p className="text-gray-700">Complete guidance from application to enrollment</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <ConsultationButton
                  text="Apply to Partner Universities"
                  source="south_korea_page_partner_universities"
                  className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-red-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partner Universities Carousel for Croatia */}
      {countrySlug === 'croatia' && (
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
                We have partnerships with top Croatian universities and leading education providers to help you get admission and comprehensive support
              </p>
            </div>
            
            {/* Logo Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex animate-scroll space-x-8">
                  {/* First set of logos */}
                  {[
                    { name: 'University of Zagreb', logo: '🏛️', color: 'from-blue-500 to-blue-700' },
                    { name: 'University of Split', logo: '🏖️', color: 'from-cyan-500 to-cyan-700' },
                    { name: 'University of Rijeka', logo: '🚢', color: 'from-green-500 to-green-700' },
                    { name: 'University of Dubrovnik', logo: '🏰', color: 'from-purple-500 to-purple-700' },
                    { name: 'University of Osijek', logo: '🏫', color: 'from-indigo-500 to-indigo-700' },
                    { name: 'University of Zadar', logo: '🌊', color: 'from-teal-500 to-teal-700' },
                    { name: 'Croatian Studies', logo: '📚', color: 'from-orange-500 to-orange-700' },
                    { name: 'Maritime Studies', logo: '⚓', color: 'from-yellow-500 to-yellow-700' },
                    { name: 'Tourism Institute', logo: '🏨', color: 'from-pink-500 to-pink-700' },
                    { name: 'Business School', logo: '💼', color: 'from-red-500 to-red-700' },
                    { name: 'Engineering Faculty', logo: '⚙️', color: 'from-emerald-500 to-emerald-700' },
                    { name: 'EU Programs', logo: '🇪🇺', color: 'from-sky-500 to-sky-700' },
                    { name: 'Study Croatia', logo: '🇭🇷', color: 'from-rose-500 to-rose-700' }
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
                    { name: 'University of Zagreb', logo: '🏛️', color: 'from-blue-500 to-blue-700' },
                    { name: 'University of Split', logo: '🏖️', color: 'from-cyan-500 to-cyan-700' },
                    { name: 'University of Rijeka', logo: '🚢', color: 'from-green-500 to-green-700' },
                    { name: 'University of Dubrovnik', logo: '🏰', color: 'from-purple-500 to-purple-700' },
                    { name: 'University of Osijek', logo: '🏫', color: 'from-indigo-500 to-indigo-700' },
                    { name: 'University of Zadar', logo: '🌊', color: 'from-teal-500 to-teal-700' },
                    { name: 'Croatian Studies', logo: '📚', color: 'from-orange-500 to-orange-700' },
                    { name: 'Maritime Studies', logo: '⚓', color: 'from-yellow-500 to-yellow-700' },
                    { name: 'Tourism Institute', logo: '🏨', color: 'from-pink-500 to-pink-700' },
                    { name: 'Business School', logo: '💼', color: 'from-red-500 to-red-700' },
                    { name: 'Engineering Faculty', logo: '⚙️', color: 'from-emerald-500 to-emerald-700' },
                    { name: 'EU Programs', logo: '🇪🇺', color: 'from-sky-500 to-sky-700' },
                    { name: 'Study Croatia', logo: '🇭🇷', color: 'from-rose-500 to-rose-700' }
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
                <div className="text-center p-6 bg-cyan-50 rounded-xl">
                  <div className="text-4xl mb-4">💰</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Exclusive Scholarships</h4>
                  <p className="text-gray-700">Access to special scholarship programs for our students</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Full Support</h4>
                  <p className="text-gray-700">Complete guidance from application to enrollment</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <ConsultationButton
                  text="Apply to Partner Universities"
                  source="croatia_page_partner_universities"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Original Special Features Section - keeping for other countries */}
      {countrySlug !== 'south-korea' && (
        <div className="bg-gradient-to-r from-red-50 to-blue-50 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                🌟 Special Features & Benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover what makes {country.name} the perfect destination for your international education journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {country.specialFeatures?.eapKapPrograms && (
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">EAP/KAP Programs</h3>
                  <p className="text-gray-600">English & Korean Academic Preparation programs for direct university pathway</p>
                </div>
              )}
              
              {country.specialFeatures?.technologyExcellence && (
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Technology Excellence</h3>
                  <p className="text-gray-600">Leading in AI, robotics, and digital innovation with world-class tech companies</p>
                  {country.specialFeatures?.techCompanies && (
                    <div className="mt-3 text-sm text-blue-600 font-medium">
                      {country.specialFeatures.techCompanies.join(', ')}
                    </div>
                  )}
                </div>
              )}
              
              {country.specialFeatures?.flexibleVisas && (
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Visa Options</h3>
                  <p className="text-gray-600">Regional VISA for Bachelor&apos;s and E-VISA for Master&apos;s programs</p>
                  {country.visa.successRate && (
                    <div className="mt-3 text-sm text-green-600 font-medium">
                      {country.visa.successRate} Success Rate
                    </div>
                  )}
                </div>
              )}
              
              {country.specialFeatures?.noEntranceExams && (
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Entrance Exams</h3>
                  <p className="text-gray-600">Most programs don&apos;t require entrance exams for admission</p>
                </div>
              )}
              
              {country.specialFeatures?.directApplication && (
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Direct Application</h3>
                  <p className="text-gray-600">Apply directly to universities with streamlined process</p>
                </div>
              )}
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">K-Culture Experience</h3>
                <p className="text-gray-600">Rich Korean culture and K-wave experience with modern lifestyle</p>
              </div>
            </div>

            {/* Intake Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Intake Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Available Intakes</h4>
                  <p className="text-blue-600 font-medium">Multiple Intakes Available</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Visa Success Rate</h4>
                  <p className="text-green-600 font-medium">{country.visa.successRate} with expert guidance</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h4>
                  <p className="text-purple-600 font-medium">{country.specialFeatures?.visaProcessingTime} visa processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Call to Action Section for South Korea */}
      {countrySlug === 'south-korea' && (
        <div className="bg-gradient-to-br from-red-600 via-blue-600 to-purple-700 text-white py-24 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="text-6xl mb-6 animate-bounce">🚀</div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg">
              Start Your Education Journey in South Korea
            </h2>
            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
              Join thousands of students who are already pursuing cutting-edge technology education with EAP/KAP programs. Get world-class innovation through our comprehensive support network!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
              <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-3xl mb-3">🎓</div>
                <div className="text-xl font-bold mb-2 text-white">EAP/KAP Programs</div>
                <div className="text-sm text-white">English and Korean preparation programs</div>
              </div>
              <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-3xl mb-3">✅</div>
                <div className="text-xl font-bold mb-2 text-white">95%+ Visa Success</div>
                <div className="text-sm text-white">High approval rate with our expertise</div>
              </div>
              <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-3xl mb-3">🚀</div>
                <div className="text-xl font-bold mb-2 text-white">Tech Innovation</div>
                <div className="text-sm text-white">World-class technology and innovation</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <ConsultationButton
                text="Apply Now - Start Your Journey!"
                source={`country_page_${countrySlug}_cta_apply`}
                className="bg-white text-blue-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              />
              <ConsultationButton
                text="Free Consultation"
                source={`country_page_${countrySlug}_cta_consultation`}
                className="border-2 border-white text-white py-5 px-10 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              />
            </div>
            
            <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full inline-block font-bold text-lg animate-pulse">
              ⚡ Limited Time Opportunity - Apply Now! ⚡
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Section for Croatia */}
      {countrySlug === 'croatia' && (
        <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-700 text-white py-24 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="text-6xl mb-6 animate-bounce">🏖️</div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg">
              Start Your Education Journey in Croatia
            </h2>
            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white drop-shadow-md">
              Join thousands of students who are already pursuing world-class education with EU degree recognition. Experience coastal lifestyle and affordable education!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
              <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-50 hover:bg-opacity-40 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <div className="text-3xl mb-3">🏖️</div>
                <div className="text-xl font-bold mb-2 text-white">Coastal Lifestyle</div>
                <div className="text-sm text-white">Study by the beautiful Adriatic Sea</div>
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
                source={`country_page_${countrySlug}_cta_apply`}
                className="bg-white text-blue-600 py-5 px-10 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              />
              <ConsultationButton
                text="Free Consultation"
                source={`country_page_${countrySlug}_cta_consultation`}
                className="border-2 border-white text-white py-5 px-10 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              />
            </div>
            
            <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full inline-block font-bold text-lg animate-pulse">
              ⚡ Limited Time Opportunity - Apply Now! ⚡
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}

