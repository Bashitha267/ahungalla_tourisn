'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroVideo() {
  const { t } = useLanguage();
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideos = async () => {
      try {
        if (desktopVideoRef.current) {
          await desktopVideoRef.current.play();
        }
      } catch (err) {
        console.warn("Desktop video autoplay failed, retrying on interaction:", err);
      }
      try {
        if (mobileVideoRef.current) {
          await mobileVideoRef.current.play();
        }
      } catch (err) {
        console.warn("Mobile video autoplay failed, retrying on interaction:", err);
      }
    };

    playVideos();
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Video (Landscape) */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-screen h-screen object-cover "
          poster="https://res.cloudinary.com/dnfbik3if/image/upload/v1782327437/gLle_qhep0k.jpg"
        >
          <source
            src="https://res.cloudinary.com/dnfbik3if/video/upload/v1783237844/portrait_a8baae.mp4"
            type="video/mp4"
          />
        </video>

        {/* Mobile Video (Portrait) */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover scale-[1.03]"
          poster="https://res.cloudinary.com/dnfbik3if/image/upload/v1782327437/gLle_qhep0k.jpg"
        >
          <source
            src="https://res.cloudinary.com/dnfbik3if/video/upload/v1783237844/portrait_a8baae.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay matching the Maldives style */}
        <div className="absolute inset-0 bg-slate-950/30 mix-blend-multiply" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 flex flex-col items-center"
        >
          {/* Cursive Slogan Hashtag (Playball Font) */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl text-white font-cursive select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {t('hero.slogan')}
          </h1>

          {/* Clean letter-spaced subtext */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-slate-100 uppercase select-none filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {t('hero.subtext')}
          </p>

          {/* Outlined Pill CTA Button */}
          <div className="pt-6">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/5 px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg hover:bg-white hover:text-slate-900 active:scale-95 transition-all duration-300 backdrop-blur-sm"
            >
              {t('hero.cta')}
            </Link>
          </div>
        </motion.div>
      </div>
      {/* License Number overlay in the bottom right corner */}
      <div className="absolute bottom-6 right-6 z-20 text-[10px] sm:text-xs font-bold tracking-widest text-white/60 uppercase select-none pointer-events-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        SLTDA License #84729
      </div>
    </section>
  );
}
