'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, ArrowRight, Handshake } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { trackConsultationRequest, trackPhoneClick } from '@/lib/analytics';
import { fadeInDown, slideInFromLeft, slideInFromRight, iconBounce } from '@/lib/animations';
import { countryNames } from '@/lib/countries';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const countries = countryNames;

  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { name: 'Destinations', href: '/destinations', current: pathname.startsWith('/destinations') },
    { name: 'Services', href: '/services', current: pathname === '/services' },
    { name: 'Updates', href: '/updates', current: pathname === '/updates' },
    { name: 'About', href: '/about', current: pathname === '/about' },
    { name: 'Contact', href: '/contact', current: pathname === '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Dropdown delay functions
  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown('destinations');
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay
    setDropdownTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
      }`} 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      initial="initial"
      animate="animate"
      variants={fadeInDown}
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="font-montserrat-bold text-white text-xs sm:text-sm">✨ Your Gateway to Global Education</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a
              href="tel:+8801983333566"
              onClick={() => trackPhoneClick('+880 1983-333566')}
              className="flex items-center space-x-1 sm:space-x-2 text-blue-100 hover:text-white transition-colors font-open-sans-semibold text-xs sm:text-sm min-h-[44px] px-2 py-1 rounded-lg hover:bg-white/10"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">+880 1983-333566</span>
              <span className="sm:hidden">Call</span>
            </a>
            <div className="text-white/60 hidden sm:block">|</div>
            <a
              href="/partnership"
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-300 text-gray-800 font-montserrat-bold text-xs sm:text-sm transition-all duration-300 min-h-[44px] px-4 py-2 rounded-full shadow-lg hover:shadow-xl border border-yellow-200 hover:border-yellow-100"
            >
              <Handshake className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Be our Partner</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={slideInFromLeft}
          >
            <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 min-h-[44px]">
              <div className="relative h-10 sm:h-12 md:h-14 w-auto">
                <Image
                  src="/logo.png"
                  alt="EduExpress International Logo"
                  width={84}
                  height={56}
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center space-x-8"
            initial="initial"
            animate="animate"
            variants={slideInFromRight}
          >
            {navigation.map((item, index) => (
              <motion.div 
                key={item.name} 
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name === 'Destinations' ? (
                  <div
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`flex items-center text-lg transition-colors font-montserrat ${
                        item.current 
                          ? 'text-blue-600 font-montserrat-bold' 
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === 'destinations' && (
                        <motion.div 
                          className="absolute left-1/2 transform -translate-x-1/2 top-full pt-1 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-4 z-10 border border-gray-200"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          {countries.map((country, index) => (
                            <motion.div
                              key={country}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={country === 'China' ? '/destinations/china' : country === 'United Kingdom' ? '/destinations/uk' : `/destinations/${country.toLowerCase().replace(' ', '-')}`}
                                className="block px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 font-open-sans-semibold text-center"
                              >
                                {country}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-lg transition-colors font-montserrat ${
                      item.current 
                        ? 'text-blue-600 font-montserrat-bold' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.button
              onClick={() => {
                trackConsultationRequest('header');
                window.dispatchEvent(new CustomEvent('openQuickForm'));
              }}
              className="btn-primary flex items-center space-x-2 font-primary-semibold hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>FREE CONSULTATION</span>
              <motion.div
                variants={iconBounce}
                whileHover="hover"
                whileTap="tap"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 text-gray-700 hover:text-blue-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden mt-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-4 border border-gray-200 mx-2"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-1 px-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.name === 'Destinations' ? (
                      <div>
                        <button 
                          className="flex items-center justify-between w-full text-lg py-4 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 min-h-[48px] font-montserrat"
                          onClick={() => setActiveDropdown(activeDropdown === 'destinations' ? null : 'destinations')}
                        >
                          {item.name}
                          <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform ${
                            activeDropdown === 'destinations' ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {activeDropdown === 'destinations' && (
                          <div className="pl-4 pb-2 space-y-1">
                            {countries.map((country) => (
                              <Link
                                key={country}
                                href={country === 'China' ? '/destinations/china' : country === 'United Kingdom' ? '/destinations/uk' : `/destinations/${country.toLowerCase().replace(' ', '-')}`}
                                className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-open-sans-semibold transition-all duration-200 py-3 px-3 rounded-lg min-h-[44px] flex items-center"
                              >
                                {country}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`text-lg transition-all duration-200 py-4 px-3 rounded-lg min-h-[48px] flex items-center font-montserrat ${
                          item.current 
                            ? 'text-blue-600 font-montserrat-bold bg-blue-50' 
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Partnership Button for Mobile */}
                <a
                  href="/partnership"
                  className="w-full mt-4 flex items-center justify-center space-x-2 py-4 min-h-[48px] text-base font-montserrat-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-300 text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-200"
                >
                  <Handshake className="w-5 h-5" />
                  <span>Be our Partner</span>
                </a>
                
                <button
                  onClick={() => {
                    trackConsultationRequest('mobile_menu');
                    window.dispatchEvent(new CustomEvent('openQuickForm'));
                  }}
                  className="btn-primary w-full mt-3 flex items-center justify-center space-x-2 py-4 min-h-[48px] text-base font-montserrat-bold"
                >
                  <span>FREE CONSULTATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;