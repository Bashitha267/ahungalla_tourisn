import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages & Day Trips",
  description: "Browse private day trips and multi-day tours in Sri Lanka. Highlights include Madu River safaris, Galle Fort, Kosgoda Turtle Hatcheries, Nuwara Eliya tea hills, and Yala national park leopard safaris.",
  keywords: [
    "Sri Lanka tour packages", "Day tours Sri Lanka", "Madu River safari booking", 
    "Galle Fort day trip", "Kosgoda turtle hatchery tour", "Sigiriya Lion Rock tour", 
    "Yala leopard safari package", "Bentota water sports private taxi", "Kandy cultural tour"
  ],
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Berty Tours Sri Lanka | Tour Packages & Day Excursions",
    description: "Browse our hand-crafted, private tour catalog. Choose from half-day safaris, full-day cultural tours, or 2-day national park and tea highland safaris.",
    url: "https://bertytours.com/packages",
    type: "website",
  }
};

export default function PackagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
