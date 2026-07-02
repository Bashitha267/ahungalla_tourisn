import type { Metadata } from "next";
import { Playball, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playball = Playball({
  variable: "--font-cursive",
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Berty Tours | Sri Lanka Tourism & Day Tour Packages",
  description: "Experience the ultimate tropical getaway. Explore Sri Lanka's pristine beaches, ancient temples, tea plantations, and leopard safaris with Berty Tours.",
  keywords: "Sri Lanka tourism, Berty Tours, Bentota water sports, Galle Dutch Fort, Yala leopard safari, Ceylon travel packages, Sri Lanka tour guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playball.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow flex flex-col w-full">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
