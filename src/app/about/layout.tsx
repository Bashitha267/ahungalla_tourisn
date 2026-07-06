import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Our Team",
  description: "Meet Berty (D. D. A. De Silva), your SLTDA-certified tourist guide lecturer (Licence A587) in Sri Lanka. Learn about our private air-conditioned fleet and our mission to support local communities.",
  keywords: [
    "About Berty Tours", "D. D. A. De Silva guide", "Tourist guide lecturer license A587", 
    "Sri Lanka tour guide about", "local community tourism Sri Lanka", "private chauffeur team", 
    "Ahungalla tour agency history", "licensed tourist guide lecturer"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Berty Tours | Certified Sri Lanka Tour Guides",
    description: "Learn about Berty's background, SLTDA certifications, private fleet, and dedication to showcasing the authentic culture and beauty of Sri Lanka.",
    url: "https://bertytours.com/about",
    type: "website",
  }
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
