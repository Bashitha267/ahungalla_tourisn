'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Compass, MapPin, Award } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection hook
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Check initial scroll
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/', icon: Compass },
    { name: t('nav.packages'), href: '/packages', icon: MapPin },
    { name: 'Portfolio', href: '/portfolio', icon: Award },
    { name: t('nav.about'), href: '/about', icon: Award },
  ];

  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`z-50 w-full transition-all duration-300 ${
          isTransparent
            ? 'absolute top-0 left-0 right-0 bg-transparent border-transparent'
            : 'sticky top-0 custom-navbar shadow-lg'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3 group py-1">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-md border border-white/10 shrink-0">
                <Image
                  src="/BERTY TOURS.png"
                  alt="Berty Tours Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-base sm:text-lg font-extrabold tracking-widest text-white uppercase select-none">
                Berty Tours
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200"
                  >
                    {isActive ? (
                      /* Active item with outline border pill */
                      <span className="border border-white/60 dark:border-teal-400/60 rounded-full px-4 py-2 text-white dark:text-teal-400">
                        {link.name}
                      </span>
                    ) : (
                      /* Inactive item */
                      <span className="text-slate-200 hover:text-white dark:text-slate-300 dark:hover:text-teal-400">
                        {link.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Buttons: Language Selector & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher (Desktop) */}
              <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full p-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 shrink-0">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-full transition-all duration-255 ${
                    language === 'en' ? 'bg-cyan-600 dark:bg-teal-400 text-white dark:text-slate-900 shadow-md' : 'hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('de')}
                  className={`px-2.5 py-1 rounded-full transition-all duration-255 ${
                    language === 'de' ? 'bg-cyan-600 dark:bg-teal-400 text-white dark:text-slate-900 shadow-md' : 'hover:text-white'
                  }`}
                >
                  DE
                </button>
              </div>

              {/* Hamburger Menu Toggle (Mobile) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-200 hover:bg-slate-800/40 dark:text-slate-300 md:hidden focus:outline-none transition-colors duration-200"
                aria-label="Main menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (Right Slide-in) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/60 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[80] w-72 max-w-sm glass shadow-2xl p-6 flex flex-col md:hidden border-l border-slate-200/50 dark:border-slate-800/80 bg-slate-900/95 dark:bg-slate-950/95"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 group">
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-md border border-slate-350 dark:border-slate-700 shrink-0">
                    <Image
                      src="/BERTY TOURS.png"
                      alt="Berty Tours Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-base font-extrabold tracking-widest text-slate-200 dark:text-slate-100 uppercase select-none">
                    Berty Tours
                  </span>
                </Link>

                <div className="flex items-center space-x-3">
                  {/* Mobile Language Switcher */}
                  <div className="flex items-center bg-slate-800 border border-slate-700 rounded-full p-0.5 text-[9px] font-bold tracking-wider">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
                        language === 'en' ? 'bg-cyan-600 dark:bg-teal-400 text-white dark:text-slate-900' : 'text-slate-405'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage('de')}
                      className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
                        language === 'de' ? 'bg-cyan-600 dark:bg-teal-400 text-white dark:text-slate-900' : 'text-slate-405'
                      }`}
                    >
                      DE
                    </button>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 py-8 space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                        isActive
                           ? 'bg-cyan-600/10 text-cyan-700 dark:bg-teal-400/10 dark:text-teal-400 font-semibold border-l-4 border-cyan-600 dark:border-teal-400'
                          : 'text-slate-350 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-base font-medium">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-450">
                © {new Date().getFullYear()} Berty Tours. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
