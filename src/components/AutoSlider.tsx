import React from 'react';
import Image from 'next/image';

const line1Images = [
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357661/WhatsApp_Image_2026-07-06_at_12.40.25_1_yczm5v.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357660/WhatsApp_Image_2026-07-06_at_12.40.24_1_xoc4rb.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357660/WhatsApp_Image_2026-07-06_at_12.40.24_hry7y9.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357659/WhatsApp_Image_2026-07-06_at_12.40.24_2_cxra4a.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357658/WhatsApp_Image_2026-07-06_at_12.40.22_2_xyh5lh.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357657/WhatsApp_Image_2026-07-06_at_12.40.23_asdk3l.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357657/WhatsApp_Image_2026-07-06_at_12.40.20_2_p7i7ek.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357655/WhatsApp_Image_2026-07-06_at_12.40.23_1_bmki4f.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357653/WhatsApp_Image_2026-07-06_at_12.40.22_afszjl.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357652/WhatsApp_Image_2026-07-06_at_12.40.22_1_jfozql.jpg"
];

const line2Images = [
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357650/WhatsApp_Image_2026-07-06_at_12.40.21_fft4gv.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357648/WhatsApp_Image_2026-07-06_at_12.40.20_yh7qus.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357646/WhatsApp_Image_2026-07-06_at_12.40.20_1_cdge5u.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357645/WhatsApp_Image_2026-07-06_at_12.40.19_1_zrnm5x.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357644/WhatsApp_Image_2026-07-06_at_12.40.17_kcbz35.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357643/WhatsApp_Image_2026-07-06_at_12.40.19_ewpwiv.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357643/WhatsApp_Image_2026-07-06_at_12.40.16_vkaeef.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357638/WhatsApp_Image_2026-07-06_at_12.40.18_2_iyfgmx.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357637/WhatsApp_Image_2026-07-06_at_12.40.16_1_rt8v6a.jpg",
  "https://res.cloudinary.com/dnfbik3if/image/upload/v1783357637/WhatsApp_Image_2026-07-06_at_12.40.25_k8tncf.jpg"
];

export default function AutoSlider() {
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
            {line1Images.map((url, idx) => (
              <div key={`r1-${idx}`} className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                <Image
                  src={url}
                  alt="Ceylon Moment"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
            {/* Duplicated content for infinite loop */}
            {line1Images.map((url, idx) => (
              <div key={`r1-dup-${idx}`} className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                <Image
                  src={url}
                  alt="Ceylon Moment"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="relative flex w-full overflow-hidden">
          <div className="flex w-max animate-scroll-right space-x-4 pr-4">
            {/* Original content */}
            {line2Images.map((url, idx) => (
              <div key={`r2-${idx}`} className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                <Image
                  src={url}
                  alt="Ceylon Moment"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
            {/* Duplicated content for infinite loop */}
            {line2Images.map((url, idx) => (
              <div key={`r2-dup-${idx}`} className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                <Image
                  src={url}
                  alt="Ceylon Moment"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
