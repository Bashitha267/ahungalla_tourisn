'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Admin pages handle their own layout — no public nav/footer/chatbot
  const isAdmin = pathname.startsWith('/admin');
  const isFeedback = pathname.startsWith('/feedback');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>
      <Footer />
      {!isFeedback && <Chatbot />}
    </>
  );
}
