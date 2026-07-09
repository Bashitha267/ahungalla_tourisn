'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Skip auth check on the login page itself
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }

    fetch('/api/admin/verify')
      .then(res => {
        if (!res.ok) {
          router.replace('/admin/login');
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        router.replace('/admin/login');
      });
  }, [pathname, router]);

  // Login page has its own layout (no sidebar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
          <p className="text-slate-400 text-sm">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {/* Mobile top padding to avoid hamburger overlap */}
        <div className="lg:hidden h-16" />
        {children}
      </main>
    </div>
  );
}
