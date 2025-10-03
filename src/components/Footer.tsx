'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const destinations = [
    'China', 'South Korea', 'UK', 'Netherlands', 'Finland', 
    'Hungary', 'Cyprus', 'Croatia', 'Georgia'
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Updates', href: '/updates' },
    { name: 'Partnership', href: '/partnership' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/eduexpressint', icon: Facebook },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/eduexpress-international', icon: Linkedin },
    { name: 'Instagram', href: 'https://www.instagram.com/eduexpressint', icon: Instagram },
    { name: 'Twitter', href: 'https://twitter.com/eduexpressint', icon: Twitter },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-12 w-auto">
                <Image
                  src="/white-logo.png"
                  alt="EduExpress International Logo"
                  width={72}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              Your trusted partner for study abroad opportunities with <span className="text-yellow-400 font-semibold">FREE scholarship assistance</span>. 
              Helping students achieve their international education dreams since 2018.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all duration-300 border border-white/20"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Quick Links */}
            <div className="min-w-0">
              <h3 className="text-lg font-bold mb-4 text-gray-100 relative z-10 tracking-wide drop-shadow-sm">
                Quick Links
                <div className="absolute -bottom-1 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full shadow-sm"></div>
              </h3>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div className="min-w-0">
              <h3 className="text-lg font-bold mb-4 text-gray-100 relative z-10 tracking-wide drop-shadow-sm">
                Destinations
                <div className="absolute -bottom-1 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full shadow-sm"></div>
              </h3>
              <div className="space-y-3">
                {destinations.slice(0, 6).map((country) => (
                  <Link
                    key={country}
                    href={`/destinations/${country.toLowerCase().replace(' ', '-')}`}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform text-sm"
                  >
                    {country}
                  </Link>
                ))}
                {destinations.length > 6 && (
                  <Link
                    href="/destinations"
                    className="block text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-sm"
                  >
                    View All →
                  </Link>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="min-w-0 md:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-gray-100 relative z-10 tracking-wide drop-shadow-sm">
                Contact Us
                <div className="absolute -bottom-1 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full shadow-sm"></div>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      House: 12/1, Ground Floor<br />
                      Road: 4/A, Dhanmondi<br />
                      Dhaka - 1209, Bangladesh
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <a href="tel:+8801983333566" className="text-gray-300 hover:text-blue-400 transition-colors text-xs block truncate">
                        +880 1983-333566
                      </a>
                    </div>
                    <a 
                      href="https://wa.me/8801983333566" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-7 h-7 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group flex-shrink-0"
                      aria-label="WhatsApp +880 1983-333566"
                    >
                      <MessageCircle className="w-3 h-3 text-white group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <a href="tel:+88013296663505" className="text-gray-300 hover:text-blue-400 transition-colors text-xs block truncate">
                        +880 1329-6663505
                      </a>
                    </div>
                    <a 
                      href="https://wa.me/88013296663505" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-7 h-7 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group flex-shrink-0"
                      aria-label="WhatsApp +880 1329-6663505"
                    >
                      <MessageCircle className="w-3 h-3 text-white group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href="mailto:info@eduexpressint.com" className="text-gray-300 hover:text-blue-400 transition-colors text-xs truncate">
                    info@eduexpressint.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} EduExpress International. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Bangladesh</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

