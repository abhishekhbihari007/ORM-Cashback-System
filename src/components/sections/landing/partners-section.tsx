"use client";

import Image from "next/image";
import { useState } from "react";

const brands = [
  { name: "Amazon", url: "/logos/Amazon_logo.svg.png" },
  { name: "Flipkart", url: "/logos/Flipkart-Logo.wine.png" },
  { name: "Nykaa", url: "/logos/nykalogo.png" },
  { name: "Myntra", url: "/logos/myntra.jpg" },
  { name: "Ajio", url: "/logos/ajio.png" },
  { name: "Meesho", url: "/logos/meesho.png" },
  { name: "Sephora", url: "/logos/saphora.png" },
  { name: "Noon", url: "/logos/noon.png" },
];

function BrandLogo({ brand }: { brand: typeof brands[0] }) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    // Fallback: Show brand name with brand color
    const brandColors: Record<string, string> = {
      Amazon: "#000000",
      Flipkart: "#2874F0",
      Nykaa: "#FF6B9D",
      Meesho: "#FF6B9D",
      Myntra: "#FF0050",
      Ajio: "#000000",
      Noon: "#FFB800",
      Sephora: "#000000",
    };
    
    return (
      <div 
        className="text-lg font-bold opacity-100 hover:opacity-100 transition-all duration-300"
        style={{ color: brandColors[brand.name] || "#000000" }}
      >
        {brand.name}
      </div>
    );
  }

  // Brands that need larger logos
  const extraLargeLogos = ["Flipkart", "Myntra"];
  const largerLogos = ["Meesho", "Noon", "Ajio", "Sephora"];
  const isExtraLarge = extraLargeLogos.includes(brand.name);
  const isLarger = largerLogos.includes(brand.name);
  
  let logoHeight, logoWidth, logoHeightPx;
  if (isExtraLarge) {
    logoHeight = 'h-28';
    logoWidth = 260;
    logoHeightPx = 112;
  } else if (isLarger) {
    logoHeight = 'h-20';
    logoWidth = 180;
    logoHeightPx = 80;
  } else {
    logoHeight = 'h-14';
    logoWidth = 140;
    logoHeightPx = 56;
  }
  
  return (
    <div className="relative h-24 w-full flex items-center justify-center p-4">
      <Image
        src={brand.url}
        alt={`${brand.name} logo`}
        width={logoWidth}
        height={logoHeightPx}
        className={`${logoHeight} w-auto max-w-full object-contain object-center opacity-100 hover:scale-110 transition-all duration-300`}
        onError={handleError}
        unoptimized
      />
    </div>
  );
}

export function PartnersSection() {
  return (
    <section 
      className="border-y border-slate-200 py-10 min-h-[600px] flex items-center relative overflow-hidden" 
      id="partners"
      style={{
        backgroundImage: 'url(/simple-background-backgrounds-passion-simple-1-5c9b95d2b9dfb.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container-responsive space-y-6 w-full relative z-10">
        <div className="flex justify-center mb-12">
          <div className="rounded-2xl border border-white/30 bg-white/95 backdrop-blur-sm shadow-lg px-20 py-8 inline-block max-w-5xl w-full">
            <p className="text-center text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-slate-900 animate-fade-in-up opacity-0 whitespace-nowrap" style={{ 
              fontFamily: 'var(--font-poppins), "Poppins", "Inter", system-ui, -apple-system, sans-serif',
              letterSpacing: '0.3em',
              fontWeight: 900,
              textShadow: '0 2px 6px rgba(0,0,0,0.15)',
              fontVariant: 'small-caps'
            }}>
              Trusted by omnichannel D2C brands
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-16 items-center justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="rounded-2xl border border-white/30 bg-white/95 backdrop-blur-sm shadow-lg w-full flex items-center justify-center min-h-[120px] hover:scale-105 transition-transform duration-300"
            >
              <BrandLogo brand={brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

