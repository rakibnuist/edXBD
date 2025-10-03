'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { trackConsultationRequest, trackPhoneClick } from '@/lib/analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { countryNames } from '@/lib/countries';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
    }`}>
      {/* Top Announcement Bar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-2 px-4"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm space-y-1 sm:space-y-0">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="font-bold text-white text-xs sm:text-sm">✨ Your Gateway to Global Education</span>
          </motion.div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+8801983333566"
              onClick={() => trackPhoneClick('+880 1983-333566')}
              className="flex items-center space-x-1 sm:space-x-2 text-blue-100 hover:text-white transition-colors font-medium text-xs sm:text-sm min-h-[44px] px-2 py-1 rounded-lg hover:bg-white/10"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">+880 1983-333566</span>
              <span className="sm:hidden">Call Now</span>
            </motion.a>
            <div className="text-white/60 hidden sm:block">|</div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/partnership"
              className="font-bold text-yellow-300 hover:text-yellow-200 text-xs sm:text-sm transition-colors min-h-[44px] px-2 py-1 rounded-lg hover:bg-white/10"
            >
              Be our Partner
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 min-h-[44px]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative h-10 sm:h-12 md:h-14 w-auto"
            >
              <Image
                src="/logo.png"
                alt="EduExpress International Logo"
                width={84}
                height={56}
                className="h-full w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.name === 'Destinations' ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('destinations')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.button
                      whileHover={{ y: -2 }}
                      className={`flex items-center font-body text-lg transition-colors ${
                        item.current 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </motion.button>
                    <AnimatePresence>
                      {activeDropdown === 'destinations' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-4 z-10 border border-gray-200"
                        >
                          {countries.map((country, index) => (
                            <motion.div
                              key={country}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                              <Link
                                href={country === 'China' ? '/destinations/china' : `/destinations/${country.toLowerCase().replace(' ', '-')}`}
                                className="block px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 font-medium text-center"
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
                  <motion.div whileHover={{ y: -2 }}>
                    <Link
                      href={item.href}
                      className={`font-body text-lg transition-colors ${
                        item.current 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                trackConsultationRequest('header');
                window.dispatchEvent(new CustomEvent('openQuickForm'));
              }}
              className="btn-primary flex items-center space-x-2"
            >
              <span>FREE CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-3 text-gray-700 hover:text-blue-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-4 border border-gray-200 mx-2"
            >
              <div className="flex flex-col space-y-1 px-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.name === 'Destinations' ? (
                      <div>
                        <button 
                          className="flex items-center justify-between w-full font-body text-lg py-4 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 min-h-[48px]"
                          onClick={() => setActiveDropdown(activeDropdown === 'destinations' ? null : 'destinations')}
                        >
                          {item.name}
                          <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform ${
                            activeDropdown === 'destinations' ? 'rotate-180' : ''
                          }`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === 'destinations' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 pb-2 space-y-1"
                            >
                              {countries.map((country) => (
                                <Link
                                  key={country}
                                  href={country === 'China' ? '/destinations/china' : `/destinations/${country.toLowerCase().replace(' ', '-')}`}
                                  className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 py-3 px-3 rounded-lg min-h-[44px] flex items-center"
                                >
                                  {country}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          href={item.href}
                          className={`font-body text-lg transition-all duration-200 py-4 px-3 rounded-lg min-h-[48px] flex items-center ${
                            item.current 
                              ? 'text-blue-600 font-semibold bg-blue-50' 
                              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    trackConsultationRequest('mobile_menu');
                    window.dispatchEvent(new CustomEvent('openQuickForm'));
                  }}
                  className="btn-primary w-full mt-4 flex items-center justify-center space-x-2 py-4 min-h-[48px] text-base font-semibold"
                >
                  <span>FREE CONSULTATION</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;