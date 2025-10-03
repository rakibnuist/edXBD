import connectDB from './mongodb';
import Lead from '@/models/Lead';
import Testimonial from '@/models/Testimonial';
import Country from '@/models/Country';

export async function initializeDatabase() {
  try {
    await connectDB();
    // Database connected successfully

    // Check if we have any data
    await Lead.countDocuments();
    const testimonialCount = await Testimonial.countDocuments();
    const countryCount = await Country.countDocuments();

    // Current data summary

    // If no countries exist, add some sample data
    if (countryCount === 0) {
      // Adding sample countries
      const sampleCountries = [
        {
          name: 'United Kingdom',
          slug: 'united-kingdom',
          flag: '🇬🇧',
          description: 'World-class education with prestigious universities and rich cultural heritage',
          universities: ['University of Oxford', 'University of Cambridge', 'Imperial College London'],
          programs: ['Business Administration', 'Engineering', 'Medicine', 'Law', 'Arts & Humanities'],
          requirements: {
            language: ['IELTS 6.5+', 'TOEFL 90+', 'PTE 62+'],
            documents: ['Academic Transcripts', 'English Proficiency', 'Personal Statement', 'References'],
            visa: ['Student Visa (Tier 4)', 'Financial Documents', 'CAS Letter']
          },
          costs: {
            tuition: '£15,000 - £35,000 per year',
            living: '£12,000 - £15,000 per year',
            currency: 'GBP'
          },
          scholarships: ['Chevening Scholarships', 'Commonwealth Scholarships', 'University-specific Scholarships'],
          isActive: true,
          featured: true
        },
        {
          name: 'China',
          slug: 'china',
          flag: '🇨🇳',
          description: 'Rapidly growing education system with modern facilities and affordable costs',
          universities: ['Tsinghua University', 'Peking University', 'Fudan University'],
          programs: ['Engineering', 'Business Administration', 'Computer Science', 'Medicine', 'Chinese Language'],
          requirements: {
            language: ['HSK 4+', 'IELTS 6.0+', 'TOEFL 80+'],
            documents: ['Academic Transcripts', 'Language Proficiency', 'Personal Statement', 'Health Certificate'],
            visa: ['Student Visa (X1/X2)', 'JW201/JW202 Form', 'Financial Documents']
          },
          costs: {
            tuition: '$3,000 - $8,000 per year',
            living: '$2,000 - $4,000 per year',
            currency: 'USD'
          },
          scholarships: ['Chinese Government Scholarship', 'Confucius Institute Scholarship', 'University Scholarships'],
          isActive: true,
          featured: true
        }
      ];

      await Country.insertMany(sampleCountries);
      // Sample countries added
    }

    // If no testimonials exist, add some sample data
    if (testimonialCount === 0) {
      // Adding sample testimonials
      const sampleTestimonials = [
        {
          name: 'Rahman Ahmed',
          location: 'Dhaka, Bangladesh',
          university: 'University of Manchester, UK',
          program: 'Computer Science',
          quote: 'EduExpress International made my dream of studying in the UK come true. Their guidance was like having a personal mentor throughout the entire process.',
          rating: 5,
          image: '🇧🇩',
          country: 'United Kingdom',
          isActive: true,
          featured: true
        },
        {
          name: 'Fatima Khan',
          location: 'Chittagong, Bangladesh',
          university: 'Seoul National University, South Korea',
          program: 'Business Administration',
          quote: 'The team at EduExpress understood my goals and helped me secure a full scholarship. I couldn\'t have done it without them!',
          rating: 5,
          image: '🇧🇩',
          country: 'South Korea',
          isActive: true,
          featured: true
        }
      ];

      await Testimonial.insertMany(sampleTestimonials);
      // Sample testimonials added
    }

    // Database initialization complete
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
}
