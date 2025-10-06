export interface Country {
  name: string;
  slug: string;
  flag: string;
  description: string;
  universities: string[];
  programs: string[];
  requirements: {
    language: string[];
    documents: string[];
    visa: string[];
  };
  costs: {
    tuition: string;
    living: string;
    currency: string;
  };
  scholarships: string[];
  isActive: boolean;
  featured: boolean;
  images: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export const countries: Country[] = [
  {
    name: 'South Korea',
    slug: 'south-korea',
    flag: '🇰🇷',
    description: 'Technology and tradition blend',
    universities: ['Seoul National University', 'KAIST', 'Yonsei University'],
    programs: ['Engineering', 'Technology', 'Business', 'Medicine', 'Arts', 'EAP/KAP'],
    requirements: {
      language: ['TOPIK 3+ (Korean programs)', 'IELTS 6.0+ (English programs)'],
      documents: ['Academic Transcripts', 'Language Certificate', 'Health Certificate'],
      visa: ['Certificate of Admission', 'Financial Documents', 'Passport Copy']
    },
    costs: {
      tuition: '$3,000 - $7,000',
      living: '$3,000 - $6,000',
      currency: 'USD'
    },
    scholarships: ['Korean Government Scholarship', 'University-specific Scholarships'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in South Korea - Technology Excellence',
    metaDescription: 'Study in South Korea with EAP/KAP programs and technology excellence'
  },
  {
    name: 'United Kingdom',
    slug: 'uk',
    flag: '🇬🇧',
    description: 'Classic education excellence',
    universities: ['University of Oxford', 'University of Cambridge', 'Imperial College London'],
    programs: ['Business', 'Engineering', 'Medicine', 'Law', 'Arts'],
    requirements: {
      language: ['IELTS 6.5+', 'TOEFL 90+'],
      documents: ['Academic Transcripts', 'Personal Statement', 'References'],
      visa: ['CAS Letter', 'Financial Documents', 'Tuberculosis Test']
    },
    costs: {
      tuition: '£15,000 - £35,000',
      living: '£12,000 - £15,000',
      currency: 'GBP'
    },
    scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in UK - World-Class Education',
    metaDescription: 'Study in UK with Russell Group universities and world-class education'
  },
  {
    name: 'Hungary',
    slug: 'hungary',
    flag: '🇭🇺',
    description: 'Central European charm',
    universities: ['University of Budapest', 'Semmelweis University', 'Corvinus University'],
    programs: ['Medicine', 'Engineering', 'Business', 'Arts', 'Sciences'],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+'],
      documents: ['Academic Transcripts', 'Language Certificate', 'Health Certificate'],
      visa: ['Admission Letter', 'Financial Documents', 'Passport Copy']
    },
    costs: {
      tuition: '€2,000 - €6,000',
      living: '€3,000 - €5,000',
      currency: 'EUR'
    },
    scholarships: ['Stipendium Hungaricum', 'University-specific Scholarships'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in Hungary - Central European Excellence',
    metaDescription: 'Study in Hungary with affordable education and central European charm'
  },
  {
    name: 'Cyprus',
    slug: 'cyprus',
    flag: '🇨🇾',
    description: 'Mediterranean learning paradise',
    universities: ['University of Cyprus', 'European University Cyprus', 'Cyprus University of Technology'],
    programs: ['Business', 'Engineering', 'Medicine', 'Tourism', 'Arts'],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+'],
      documents: ['Academic Transcripts', 'Language Certificate', 'Health Certificate'],
      visa: ['Admission Letter', 'Financial Documents', 'Passport Copy']
    },
    costs: {
      tuition: '€3,000 - €8,000',
      living: '€4,000 - €6,000',
      currency: 'EUR'
    },
    scholarships: ['Cyprus Government Scholarship', 'University-specific Scholarships'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in Cyprus - Mediterranean Paradise',
    metaDescription: 'Study in Cyprus with English programs and Mediterranean learning paradise'
  },
  {
    name: 'Croatia',
    slug: 'croatia',
    flag: '🇭🇷',
    description: 'Adriatic coast education',
    universities: ['University of Zagreb', 'University of Split', 'University of Rijeka'],
    programs: ['Engineering', 'Medicine', 'Business', 'Arts', 'Tourism'],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+'],
      documents: ['Academic Transcripts', 'Language Certificate', 'Health Certificate'],
      visa: ['Admission Letter', 'Financial Documents', 'Passport Copy']
    },
    costs: {
      tuition: '€2,000 - €5,000',
      living: '€3,000 - €5,000',
      currency: 'EUR'
    },
    scholarships: ['Croatian Government Scholarship', 'University-specific Scholarships'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in Croatia - Adriatic Coast Education',
    metaDescription: 'Study in Croatia with Adriatic coast education and rich cultural heritage'
  },
  {
    name: 'Georgia',
    slug: 'georgia',
    flag: '🇬🇪',
    description: 'Caucasian mountain knowledge',
    universities: ['Tbilisi State Medical University', 'Georgian American University', 'Caucasus University'],
    programs: ['Medicine (MBBS)', 'Dentistry', 'Pharmacy', 'Nursing', 'Engineering'],
    requirements: {
      language: ['IELTS 6.0+', 'TOEFL 80+'],
      documents: ['Academic Transcripts', 'Language Certificate', 'Health Certificate'],
      visa: ['Admission Letter', 'Financial Documents', 'Passport Copy']
    },
    costs: {
      tuition: '$3,000 - $6,000',
      living: '$300 - $500',
      currency: 'USD'
    },
    scholarships: ['Georgian Government Scholarship', 'University-specific Scholarships'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in Georgia - World-Class Medical Education',
    metaDescription: 'Study in Georgia with WHO-recognized medical degrees and world-class education'
  },
  {
    name: 'Finland',
    slug: 'finland',
    flag: '🇫🇮',
    description: 'Nordic excellence in education',
    universities: ['University of Helsinki', 'Aalto University', 'University of Turku'],
    programs: ['Technology', 'Engineering', 'Business', 'Arts', 'Sciences'],
    requirements: {
      language: ['IELTS 6.5+', 'TOEFL 90+'],
      documents: ['Academic Transcripts', 'Language Certificate', 'Health Certificate'],
      visa: ['Admission Letter', 'Financial Documents', 'Passport Copy']
    },
    costs: {
      tuition: '€8,000 - €15,000',
      living: '€6,000 - €8,000',
      currency: 'EUR'
    },
    scholarships: ['Finnish Government Scholarship', 'University-specific Scholarships'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in Finland - Nordic Excellence',
    metaDescription: 'Study in Finland with Nordic excellence in education and innovation'
  },
  {
    name: 'Netherlands',
    slug: 'netherlands',
    flag: '🇳🇱',
    description: 'Innovation and international focus',
    universities: ['Delft University of Technology', 'University of Amsterdam', 'Erasmus University'],
    programs: ['Engineering', 'Business', 'Technology', 'Arts', 'Sciences'],
    requirements: {
      language: ['IELTS 6.5+', 'TOEFL 90+'],
      documents: ['Academic Transcripts', 'Language Certificate', 'Health Certificate'],
      visa: ['Admission Letter', 'Financial Documents', 'Passport Copy']
    },
    costs: {
      tuition: '€8,000 - €15,000',
      living: '€8,000 - €12,000',
      currency: 'EUR'
    },
    scholarships: ['Holland Scholarship', 'University-specific Scholarships'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in Netherlands - Innovation Excellence',
    metaDescription: 'Study in Netherlands with innovation excellence and EU work rights'
  },
  {
    name: 'China',
    slug: 'china',
    flag: '🇨🇳',
    description: 'Ancient wisdom meets modern innovation',
    universities: ['Tsinghua University', 'Peking University', 'Fudan University'],
    programs: ['Engineering', 'Business', 'Computer Science', 'Medicine', 'Language'],
    requirements: {
      language: ['HSK 4+ (Chinese programs)', 'IELTS 6.0+ (English programs)'],
      documents: ['Academic Transcripts', 'Language Certificate', 'Health Certificate'],
      visa: ['JW201/JW202 Form', 'Financial Documents', 'Admission Letter']
    },
    costs: {
      tuition: '$3,000 - $8,000',
      living: '$2,000 - $4,000',
      currency: 'USD'
    },
    scholarships: ['Chinese Government Scholarship (CSC)', 'Confucius Institute Scholarship'],
    isActive: true,
    featured: true,
    images: [],
    metaTitle: 'Study in China - Top Universities & Scholarships',
    metaDescription: 'Study in China with world-class universities and scholarship opportunities'
  }
];

// Simple country names for navigation
export const countryNames = countries.map(country => country.name);

// Country lookup by slug
export const getCountryBySlug = (slug: string): Country | undefined => {
  return countries.find(country => country.slug === slug);
};

// Featured countries
export const featuredCountries = countries.filter(country => country.featured);

// Active countries
export const activeCountries = countries.filter(country => country.isActive);
