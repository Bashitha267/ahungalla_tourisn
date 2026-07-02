'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, Car, Users, Star, Quote } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {


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
              Our Vision & Roots
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
              Ayubowan & Welcome to Berty Tours
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              Founded on the golden coast of Ahungalla, Berty Tours is a boutique Sri Lankan travel agency run by passionate local experts. We believe travel should leave a positive trace. That's why we coordinate directly with remote communities, organic spice gardens, and local wildlife rangers.
            </p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Whether you want to climb the historic Sigiriya Rock Fortress, cruise through the mangrove tunnels of the Madu River, or relax on the golden shores of Bentota, our mission is to deliver authentic, custom, and safe island expeditions.
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
            />
          </motion.div>
        </section>

        {/* Meet the Service & Fleet Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">Our Premium Services</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">What makes traveling with Berty Tours a first-class adventure</p>
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
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Premium Private AC Fleet</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Travel across Sri Lanka in total comfort. Our fleet of modern cars, luxury vans, and SUVs are equipped with dual air-conditioning, passenger safety insurance, and baby seats on request.
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
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Licensed Guide Lecturers</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our tours are guided by Berty and our team of SLTDA-licensed English-speaking chauffeur guides. Deeply knowledgeable about local history, wildlife, culture, and folklore, they show you the true heart of Ceylon.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">Our Foundational Pillars</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">The rules that guide how we organize our travel experiences</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Licensed & Secure", text: "Registered under the Sri Lanka Tourism Development Authority (SLTDA). Premium private AC vehicles and expert drivers." },
              { icon: Heart, title: "Community First", text: "60% of all tour bookings go directly to small family-owned guesthouses, local boat rowers, and rural guides." },
              { icon: Sparkles, title: "Bespoke Customization", text: "No two travelers are alike. We fine-tune every package to match your dates, physical capacities, and dietary needs." }
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-600/10 text-cyan-600 dark:bg-amber-500/10 dark:text-amber-400 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-405 leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feedback Section with Images */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-cyan-600 dark:text-amber-500 uppercase tracking-widest">
              Guest Testimonials
            </span>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">Loved by Travelers</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Read real feedback and stories from guests who explored Sri Lanka with Berty Tours
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
                            : "text-slate-350"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{f.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 pt-3 border-t border-slate-205/50 dark:border-slate-800/50">
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
