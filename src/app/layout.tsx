import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk, Outfit, DM_Sans, Caveat, Dancing_Script, Kalam, Amatic_SC } from "next/font/google";
import Analytics from "@/components/Analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickContactForm from "@/components/QuickContactForm";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const amaticSC = Amatic_SC({
  variable: "--font-amatic-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.eduexpressint.com'),
  title: {
    default: "EduExpress International - Study Abroad Consultancy | Free Scholarship Assistance",
    template: "%s | EduExpress International"
  },
  description: "Transform your education journey with EduExpress International. Expert study abroad consultancy with FREE scholarship assistance. 97% success rate. Study in UK, China, South Korea, Hungary & more. Free consultation available.",
  keywords: [
    "study abroad",
    "education consultancy",
    "scholarship assistance",
    "UK universities",
    "China universities", 
    "South Korea education",
    "Hungary study",
    "visa assistance",
    "international education",
    "Bangladesh students",
    "EduExpress International",
    "free consultation",
    "study abroad Bangladesh",
    "overseas education",
    "university admission",
    "student visa",
    "education consultant"
  ],
  authors: [{ name: "EduExpress International", url: "https://www.eduexpressint.com" }],
  creator: "EduExpress International",
  publisher: "EduExpress International",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.eduexpressint.com",
    siteName: "EduExpress International",
    title: "EduExpress International - Study Abroad Consultancy | Free Scholarship Assistance",
    description: "Transform your education journey with expert study abroad consultancy. FREE scholarship assistance with 97% success rate. Study in UK, China, South Korea, Hungary & more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EduExpress International - Study Abroad Consultancy with Free Scholarship Assistance",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EduExpress International - Study Abroad Consultancy | Free Scholarship Assistance",
    description: "Transform your education journey with expert study abroad consultancy. FREE scholarship assistance with 97% success rate.",
    images: ["/og-image.jpg"],
    creator: "@eduexpressint",
    site: "@eduexpressint",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://www.eduexpressint.com",
    languages: {
      'en-US': 'https://www.eduexpressint.com',
      'bn-BD': 'https://www.eduexpressint.com/bn',
    },
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "alternateName": "EduExpress",
    "description": "Leading study abroad consultancy in Bangladesh providing expert guidance and FREE scholarship assistance for international education. 97% success rate with 10,000+ students helped.",
    "url": "https://www.eduexpressint.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.eduexpressint.com/logo.png",
      "width": 200,
      "height": 200
    },
    "image": "https://www.eduexpressint.com/og-image.jpg",
    "foundingDate": "2005",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House: 12/1, Ground Floor, Road: 4/A",
      "addressLocality": "Dhanmondi",
      "addressRegion": "Dhaka",
      "postalCode": "1209",
      "addressCountry": "BD"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+880-1983-333566",
        "contactType": "customer service",
        "availableLanguage": ["English", "Bengali"],
        "areaServed": "BD",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "+880-1329-6663505",
        "contactType": "customer service",
        "availableLanguage": ["English", "Bengali"],
        "areaServed": "BD"
      }
    ],
    "email": "info@eduexpressint.com",
    "sameAs": [
      "https://www.facebook.com/eduexpressint",
      "https://www.linkedin.com/company/eduexpress-international",
      "https://www.instagram.com/eduexpressint",
      "https://twitter.com/eduexpressint"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Study Abroad Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Study Abroad Consultation",
            "description": "Free consultation for study abroad opportunities"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Scholarship Assistance",
            "description": "Free scholarship application assistance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Visa Application Support",
            "description": "Complete visa application guidance"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "Free consultation available"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://www.eduexpressint.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="geo.region" content="BD-DH" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        <meta name="language" content="en-US" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${outfit.variable} ${dmSans.variable} ${caveat.variable} ${dancingScript.variable} ${kalam.variable} ${amaticSC.variable} antialiased`}
      >
        <Analytics />
        <Header />
        <main className="pt-16 sm:pt-20 md:pt-24">
          {children}
        </main>
        <Footer />
        <QuickContactForm />
      </body>
    </html>
  );
}
