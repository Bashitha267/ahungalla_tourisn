import type { Metadata } from "next";
import { Playball, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import LiquidBackground from "@/components/LiquidBackground";
import PublicShell from "@/components/PublicShell";

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
  title: {
    default: "Berty Tours | Sri Lanka Private Day Tours & Chauffeur Guides",
    template: "%s | Berty Tours Sri Lanka"
  },
  description: "SLTDA-certified private tours in down south Sri Lanka (Ahungalla, Bentota, Galle). Explore beaches, safaris, and rainforests with our licensed chauffeur guide. Available in English & German.",
  keywords: [
    "Sri Lanka tourism", "Berty Tours", "Bentota water sports", "Galle Dutch Fort", "Yala leopard safari", 
    "Ceylon travel packages", "Sri Lanka tour guide", "Ahungalla day tours", "Private taxi Sri Lanka", 
    "Madu river safari boat", "Kosgoda turtle sanctuary", "Deutschsprachiger Reiseleiter Sri Lanka", 
    "Sri Lanka Rundreisen privat", "Chauffeur guide Sri Lanka", "Down south Sri Lanka tours"
  ],
  metadataBase: new URL("https://bertytours.com"),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/?lang=en',
      'de': '/?lang=de',
    },
  },
  openGraph: {
    title: "Berty Tours | Sri Lanka Private Day Tours & Chauffeur Guides",
    description: "Experience down south Sri Lanka in comfort. SLTDA-licensed guide, private air-conditioned vehicles, custom itineraries. Book your Ceylon adventure today.",
    url: "https://bertytours.com",
    siteName: "Berty Tours",
    images: [
      {
        url: "https://res.cloudinary.com/dnfbik3if/image/upload/w_1200,c_scale/v1782980763/pkg1_pvbouz.jpg",
        width: 1200,
        height: 630,
        alt: "Berty Tours Sri Lanka Private Expeditions",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest"
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
      <body className="min-h-full flex flex-col transition-colors duration-300 relative text-slate-100">
        <LiquidBackground />
        <ThemeProvider>
          <LanguageProvider>
            <PublicShell>
              {children}
            </PublicShell>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
