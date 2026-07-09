'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Images,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/feedbacks', label: 'Feedbacks', icon: MessageSquare },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Images },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shrink-0 shadow-lg">
          <span className="text-white font-black text-xs">BT</span>
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-tight">Berty Tours</p>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            title={collapsed ? label : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive(href, exact)
                ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              } ${collapsed ? 'justify-center' : ''}`}
          >
            <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive(href, exact) ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
            {!collapsed && <span>{label}</span>}
            {isActive(href, exact) && !collapsed && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="px-2 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          title={collapsed ? 'View Site' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!collapsed && <span>View Site</span>}
        </Link>
        <button
          onClick={handleLogout}
          title={collapsed ? 'Sign Out' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button (top bar) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl bg-slate-800/90 backdrop-blur border border-white/10 flex items-center justify-center text-white shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div className={`lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-slate-900 border-r border-white/10 transform transition-transform duration-300 ease-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:flex flex-col h-screen sticky top-0 bg-slate-900 border-r border-white/10 transition-all duration-300 ease-out shrink-0
        ${collapsed ? 'w-16' : 'w-60'}`}>
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-700 border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all shadow-md z-10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </div>
    </>
  );
}
