'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { Package, MessageSquare, Images, Clock, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';

interface Stats {
  totalPackages: number;
  pendingFeedbacks: number;
  publishedFeedbacks: number;
  portfolioImages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPackages: 0,
    pendingFeedbacks: 0,
    publishedFeedbacks: 0,
    portfolioImages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const supabase = createClient();
      const [pkgs, pending, published, portfolio] = await Promise.all([
        supabase.from('tour_packages').select('id', { count: 'exact', head: true }),
        supabase.from('feedbacks').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('feedbacks').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('portfolio_images').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        totalPackages: pkgs.count ?? 0,
        pendingFeedbacks: pending.count ?? 0,
        publishedFeedbacks: published.count ?? 0,
        portfolioImages: portfolio.count ?? 0,
      });
      setLoading(false);
    };
    loadStats();
  }, []);

  const cards = [
    {
      label: 'Tour Packages',
      value: stats.totalPackages,
      icon: Package,
      color: 'from-cyan-500/20 to-cyan-600/10',
      border: 'border-cyan-500/20',
      iconColor: 'text-cyan-400',
      href: '/admin/packages',
    },
    {
      label: 'Pending Feedbacks',
      value: stats.pendingFeedbacks,
      icon: Clock,
      color: 'from-amber-500/20 to-amber-600/10',
      border: 'border-amber-500/20',
      iconColor: 'text-amber-400',
      href: '/admin/feedbacks',
      badge: stats.pendingFeedbacks > 0,
    },
    {
      label: 'Published Reviews',
      value: stats.publishedFeedbacks,
      icon: CheckCircle,
      color: 'from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/20',
      iconColor: 'text-emerald-400',
      href: '/admin/feedbacks',
    },
    {
      label: 'Portfolio Images',
      value: stats.portfolioImages,
      icon: Images,
      color: 'from-violet-500/20 to-violet-600/10',
      border: 'border-violet-500/20',
      iconColor: 'text-violet-400',
      href: '/admin/portfolio',
    },
  ];

  const quickLinks = [
    { label: 'Manage Packages', href: '/admin/packages', icon: Package, desc: 'Add, edit or remove tour packages' },
    { label: 'Review Feedbacks', href: '/admin/feedbacks', icon: MessageSquare, desc: 'Approve or reject tourist reviews' },
    { label: 'Portfolio Gallery', href: '/admin/portfolio', icon: Images, desc: 'Upload and manage gallery images' },
    { label: 'View Public Site', href: '/', icon: TrendingUp, desc: 'Preview the live site', external: true },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back — here&apos;s your site overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Link
            key={card.label}
            href={card.href}
            className={`relative bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200 group`}
          >
            {card.badge && (
              <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            )}
            <div className={`w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center mb-3 ${card.iconColor}`}>
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-current/30 border-t-current animate-spin" />
              ) : (
                <card.icon className="w-5 h-5" />
              )}
            </div>
            <p className="text-3xl font-bold text-white">{loading ? '—' : card.value}</p>
            <p className="text-xs text-slate-400 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-base font-semibold text-slate-300 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              className="flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-700/60 flex items-center justify-center shrink-0">
                <link.icon className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{link.label}</p>
                <p className="text-xs text-slate-500 truncate">{link.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
