import { Metadata } from 'next';
import UpdatesClient from './UpdatesClient';

export const metadata: Metadata = {
  title: 'Latest Study Abroad Updates & News | EduExpress International',
  description: 'Stay updated with the latest study abroad news, scholarship opportunities, visa updates, and university announcements. Get expert guidance for your international education journey.',
  keywords: [
    'study abroad updates',
    'scholarship news',
    'visa updates',
    'university announcements',
    'study abroad opportunities',
    'education news',
    'study abroad Bangladesh',
    'international education updates'
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
    title: 'Latest Study Abroad Updates & News',
    description: 'Stay updated with the latest study abroad news, scholarship opportunities, visa updates, and university announcements.',
    type: 'website',
    url: 'https://www.eduexpressint.com/updates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Study Abroad Updates & News',
    description: 'Stay updated with the latest study abroad news, scholarship opportunities, visa updates, and university announcements.',
  },
  alternates: {
    canonical: 'https://www.eduexpressint.com/updates',
  },
  other: {
    'geo.region': 'BD-DH',
    'geo.placename': 'Dhaka',
    'geo.position': '23.8103;90.4125',
    'ICBM': '23.8103, 90.4125',
    'language': 'en-US',
    'revisit-after': '1 days',
    'distribution': 'global',
    'rating': 'general',
  },
};

export default function UpdatesPage() {
  return <UpdatesClient />;
}
