import { tourPackages } from "@/data/packages";
import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const pkg = tourPackages.find((p) => p.id === id);

  if (!pkg) {
    return {
      title: "Package Not Found",
    };
  }

  // Gather places and activities for keyword and metadata optimizations
  const placeNames = pkg.places.map(p => p.name).join(", ");

  return {
    title: pkg.title,
    description: `${pkg.shortDescription} Explore ${placeNames} with Berty Tours. Licensed guides, private AC vehicles. Available in English & German.`,
    keywords: [
      pkg.title,
      ...pkg.highlights,
      ...pkg.places.map(p => p.name),
      "Berty Tours Sri Lanka",
      "private day trip",
      "SLTDA certified guide",
      "Sri Lanka tour package",
      "down south Sri Lanka"
    ],
    alternates: {
      canonical: `/packages/${id}`,
    },
    openGraph: {
      title: `${pkg.title} | Berty Tours`,
      description: pkg.shortDescription,
      url: `https://bertytours.com/packages/${id}`,
      images: [
        {
          url: pkg.coverImageDesktop || pkg.coverImageMobile,
          width: 1200,
          height: 630,
          alt: pkg.title,
        }
      ],
      type: "article",
    }
  };
}

export default function PackageDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
