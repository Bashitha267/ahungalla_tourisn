'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, MessageSquare } from 'lucide-react';
import FeedbackModal from '@/components/FeedbackModal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Packages list for the feedback modal dropdown
  const packages = [
    { id: 'half-day-tour', title: 'Half-Day Tour Excursions' },
    { id: '1-day-tour', title: '01 Day Tour Excursions' },
    { id: '2-days-tour', title: '02 Days Tour Expeditions' },
  ];

  return (
    <>
      <footer className="relative w-full overflow-hidden border-t border-slate-200/50 dark:border-slate-800/80 text-slate-300">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnfbik3if/image/upload/v1782982543/images_1_z1crso.jpg"
            alt="Scenic Sri Lanka Coast Road"
            fill
            className="object-cover opacity-50 dark:opacity-30 pointer-events-none"
          />
          <div className="absolute inset-0 bg-slate-900/65 dark:bg-slate-950/75 backdrop-blur-[3px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand Col */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-md border border-white/10 shrink-0">
                  <Image
                    src="/BERTY TOURS.png"
                    alt="Berty Tours Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-lg font-extrabold tracking-widest text-white uppercase select-none">
                  Berty Tours
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                Discover the wonder of Sri Lanka. We specialize in curating boutique travel experiences across beautiful beaches, ancient ruins, misty tea hills, and tropical safaris.
              </p>

              {/* Social Icons */}
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://www.facebook.com/share/1Ac8PcPVMC/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 dark:hover:text-teal-400 text-slate-400 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <img
                    src="https://img.icons8.com/windows/96/facebook-new.png"
                    alt="Facebook"
                    className="h-5 w-5 object-contain brightness-0 invert"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@bertytours?_r=1&_t=ZS-97uNUvwLHWh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 dark:hover:text-teal-400 text-slate-400 transition-colors duration-200"
                  aria-label="TikTok"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=vXmXtbBOhqh2&format=png&color=000000"
                    alt="TikTok"
                    className="h-5 w-5 object-contain brightness-0 invert"
                  />
                </a>
                <a
                  href="https://www.instagram.com/bertytours"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 dark:hover:text-teal-400 text-slate-400 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://wa.me/94776920730" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 dark:hover:text-teal-400 text-slate-400 transition-colors duration-200" aria-label="WhatsApp">
                  <img
                    src="https://img.icons8.com/windows/96/whatsapp--v1.png"
                    alt="WhatsApp"
                    className="h-5 w-5 object-contain brightness-0 invert"
                  />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className="text-sm hover:text-white transition-colors duration-200">
                    Home Page
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className="text-sm hover:text-white transition-colors duration-200">
                    Tour Packages
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-sm hover:text-white transition-colors duration-200">
                    Photo Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured Packages (3 Links) */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">Signature Tours</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/packages/half-day-tour" className="text-sm hover:text-white transition-colors duration-200">
                    Half-Day Tour Excursions
                  </Link>
                </li>
                <li>
                  <Link href="/packages/1-day-tour" className="text-sm hover:text-white transition-colors duration-200">
                    01 Day Tour Excursions
                  </Link>
                </li>
                <li>
                  <Link href="/packages/2-days-tour" className="text-sm hover:text-white transition-colors duration-200">
                    02 Days Tour Expeditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">Contact Us</h3>
              <ul className="mt-4 space-y-2.5">
                <li className="flex items-center space-x-2 text-sm">
                  <a
                    href="https://maps.app.goo.gl/tTZPvknzLy2iVU9NA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:text-cyan-400 dark:hover:text-teal-400 transition-colors duration-200"
                    aria-label="View our location on Google Maps"
                  >
                    <MapPin className="h-4.5 w-4.5 text-cyan-400 dark:text-teal-400 shrink-0" />
                    <span>Galle Road, Ahungalla, Sri Lanka</span>
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <a href="tel:+94776920730" className="flex items-center space-x-2 hover:text-cyan-400 dark:hover:text-teal-400 transition-colors duration-200">
                    <Phone className="h-4.5 w-4.5 text-cyan-400 dark:text-teal-400" />
                    <span>+94 77 692 0730</span>
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4.5 w-4.5 text-cyan-400 dark:text-teal-400" />
                  <span>hello@bertytours.com</span>
                </li>
              </ul>

              {/* Leave Feedback Button */}
              <button
                onClick={() => setFeedbackOpen(true)}
                id="footer-feedback-btn"
                className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 rounded-xl text-sm font-medium transition-all duration-200 group"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Leave a Feedback
              </button>
            </div>

          </div>

          {/* Copyright */}
          <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {currentYear} Berty Tours. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-cyan-500 dark:text-teal-400" />
                <span>SLTDA Certified License #84729</span>
              </div>
              {/* Visible Admin Login link */}
              <Link
                href="/admin/login"
                id="footer-admin-link"
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200 border border-slate-700 hover:border-slate-500 px-2.5 py-1 rounded-lg"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        packages={packages}
      />
    </>
  );
}
