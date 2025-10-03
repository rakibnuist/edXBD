import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - EduExpress International',
  description: 'Get in touch with EduExpress International for free study abroad consultation. Call +880-1983-333566 or visit our office in Dhanmondi, Dhaka. Expert guidance for your international education journey.',
  keywords: [
    'contact eduexpress international',
    'study abroad consultation bangladesh',
    'education consultant contact',
    'free consultation dhaka',
    'study abroad office bangladesh',
    'international education contact',
    'overseas education consultation'
  ],
  openGraph: {
    title: 'Contact EduExpress International - Free Study Abroad Consultation',
    description: 'Get expert study abroad guidance from our experienced consultants. Free consultation available. Located in Dhanmondi, Dhaka.',
    type: 'website',
  },
  twitter: {
    title: 'Contact EduExpress International - Free Study Abroad Consultation',
    description: 'Get expert study abroad guidance from our experienced consultants. Free consultation available. Located in Dhanmondi, Dhaka.',
  },
};

export default function Contact() {
  return <ContactClient />;
}