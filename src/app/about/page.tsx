'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, Car, Users, Star, Quote, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const feedbacks = [
    {
      name: "Sarah Jenkins",
      country: "United Kingdom",
      text: "An absolute dream vacation! Scaling the Sigiriya Rock Fortress at sunrise was unforgettable. Our guide shared rich history at every corner.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "David & Lea Rossi",
      country: "Italy",
      text: "The blue train ride from Nuwara Eliya to Ella was the absolute highlight of our honeymoon. Berty Tours curated the perfect trip for us!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Kenji Sato",
      country: "Japan",
      text: "Spotting a leopard lounging on a tree branch in Yala was magical. Our private 4x4 driver tracker had eagle eyes.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Amara Lopez",
      country: "Australia",
      text: "Strolling along the cobblestone streets of Galle Fort was like traveling back in time. The seafood by the ocean was spectacular.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="w-full min-h-screen py-12 bg-slate-50/30 dark:bg-slate-950/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <span className="text-xs font-bold text-cyan-600 dark:text-amber-500 uppercase tracking-widest">
              {t('about.vision.tag')}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
              {t('about.vision.title')}
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {t('about.vision.p1')}
            </p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t('about.vision.p2')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <Image
              src="https://res.cloudinary.com/dnfbik3if/image/upload/v1782982543/images_1_z1crso.jpg"
              alt="Madu River Safari Sri Lanka"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </section>

        {/* Founder & Lead Guide Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white dark:bg-slate-900/40 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-600/5 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-600/5 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 flex flex-col items-center text-center space-y-4"
          >
            <div className="relative h-60 w-60 sm:h-64 sm:w-64 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-800 ring-2 ring-cyan-600/10 dark:ring-amber-500/15">
              <Image
                src="/owner.jpeg"
                alt="D. D. A. De Silva - Berty"
                fill
                className="object-cover"
              />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-amber-500/10 text-cyan-700 dark:text-amber-400 border border-cyan-100 dark:border-amber-500/20">
              SLTDA Licensed Guide
            </span>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-600 dark:text-amber-500 uppercase tracking-widest block">
                {t('about.berty.tag')}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                {t('about.berty.title')}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-650 dark:text-slate-300">
                <span>{t('about.berty.role')}</span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
                <span className="text-cyan-600 dark:text-amber-400 font-bold">{t('about.berty.licence')}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {t('about.berty.bio')}
            </p>

            {/* Grid for Contact Info and Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {t('about.berty.contact_title')}
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-650 dark:text-slate-350">
                  <a href="tel:+94776920730" className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-amber-400 transition-colors font-medium">
                    <Phone className="h-4 w-4 text-cyan-600 dark:text-amber-400 shrink-0" />
                    <span>+94 77 692 0730</span>
                  </a>
                  <a href="mailto:bertyssr@gmail.com" className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-amber-400 transition-colors font-medium">
                    <Mail className="h-4 w-4 text-cyan-600 dark:text-amber-400 shrink-0" />
                    <span>bertyssr@gmail.com</span>
                  </a>
                  <div className="flex items-start gap-2 font-medium">
                    <MapPin className="h-4 w-4 text-cyan-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Sunshine Restaurant, Thotawatta Road, Ahungalla, Sri Lanka</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {t('about.berty.services_title')}
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-650 dark:text-slate-355">
                  <div className="flex items-center gap-2 font-medium">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{t('about.berty.service_insurance')}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Car className="h-4 w-4 text-cyan-600 dark:text-amber-400 shrink-0" />
                    <span>{t('about.berty.service_taxi')}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>{t('about.berty.service_tuktuk')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Meet the Service & Fleet Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">{t('about.services.title')}</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t('about.services.sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Fleet */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-56 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                  alt="Berty Tours Private AC Fleet"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-cyan-600 dark:text-amber-400">
                  <Car className="h-5 w-5" />
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{t('about.services.fleet.title')}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('about.services.fleet.desc')}
                </p>
              </div>
            </motion.div>

            {/* Card 2: Guides */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-56 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
                  alt="Berty Tours Licensed Guides"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-cyan-600 dark:text-amber-400">
                  <Users className="h-5 w-5" />
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{t('about.services.guides.title')}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('about.services.guides.desc')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">{t('about.pillars.title')}</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t('about.pillars.sub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: t('about.pillars.p1.title'), text: t('about.pillars.p1.desc') },
              { icon: Heart, title: t('about.pillars.p2.title'), text: t('about.pillars.p2.desc') },
              { icon: Sparkles, title: t('about.pillars.p3.title'), text: t('about.pillars.p3.desc') }
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-600/10 text-cyan-600 dark:bg-amber-500/10 dark:text-amber-400 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feedback Section with Images */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-cyan-600 dark:text-amber-500 uppercase tracking-widest">
              {t('about.testimonials.tag')}
            </span>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">{t('about.testimonials.title')}</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t('about.testimonials.sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbacks.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-cyan-600/5 dark:text-amber-500/5 pointer-events-none">
                  <Quote className="h-14 w-14 scale-y-[-1]" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`h-4 w-4 ${
                          starIdx < Math.round(f.rating)
                            ? "text-amber-500 fill-amber-500"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{f.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-cyan-600/30 dark:border-amber-500/30">
                    <Image
                      src={f.avatar}
                      alt={f.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">{f.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{f.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
