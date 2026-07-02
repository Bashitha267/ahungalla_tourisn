import React from 'react';
import Image from 'next/image';
import { tourPackages } from '@/data/packages';

export default function AutoSlider() {
  // Extract all non-cover images from the packages
  const allImages = tourPackages.flatMap((pkg) => pkg.images);

  const getTitle = (url: string) => {
    if (url.includes('1590001155093')) return "Galle Dutch Fort";
    if (url.includes('1545229765')) return "Madu River Safari";
    if (url.includes('1552596880')) return "Nuwara Eliya Tea Fields";
    if (url.includes('1547721064')) return "Yala Leopard Safari";
    return "";
  };

  const sliderItems = allImages.map((url) => ({
    url,
    title: getTitle(url),
  }));

  // Create two rows with different orderings for visual diversity
  const row1 = [...sliderItems, ...sliderItems];
  const row2 = [...sliderItems].reverse().concat(sliderItems);
  return (
    <div className="w-full overflow-hidden py-12 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-3xl">
          Captivating Moments in Ceylon
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          A glimpse into the stunning sights, nature, and cultural highlights of Sri Lanka
        </p>
      </div>

      <div className="space-y-6">
        {/* Row 1: Scrolling Left */}
        <div className="relative flex w-full overflow-hidden">
          <div className="flex w-max animate-scroll-left space-x-4 pr-4">
            {/* Original content */}
            {row1.map((img, idx) => (
              <div key={`r1-${idx}`} className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                <Image
                  src={img.url}
                  alt={img.title || "Ceylon Moment"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {img.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-sm font-semibold text-white">{img.title}</span>
                  </div>
                )}
              </div>
            ))}
            {/* Duplicated content */}
            {row1.map((img, idx) => (
              <div key={`r1-dup-${idx}`} className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                <Image
                  src={img.url}
                  alt={img.title || "Ceylon Moment"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {img.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-sm font-semibold text-white">{img.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="relative flex w-full overflow-hidden">
          <div className="flex w-max animate-scroll-right space-x-4 pr-4">
            {/* Original content */}
            {row2.map((img, idx) => (
              <div key={`r2-${idx}`} className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                <Image
                  src={img.url}
                  alt={img.title || "Ceylon Moment"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {img.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-sm font-semibold text-white">{img.title}</span>
                  </div>
                )}
              </div>
            ))}
            {/* Duplicated content */}
            {row2.map((img, idx) => (
              <div key={`r2-dup-${idx}`} className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                <Image
                  src={img.url}
                  alt={img.title || "Ceylon Moment"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {img.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-sm font-semibold text-white">{img.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
