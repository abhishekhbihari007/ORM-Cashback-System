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
    logoHeight = 'h-20';
    logoWidth = 180;
    logoHeightPx = 80;
  } else if (isLarger) {
    logoHeight = 'h-16';
    logoWidth = 140;
    logoHeightPx = 64;
  } else {
    logoHeight = 'h-12';
    logoWidth = 100;
    logoHeightPx = 48;
  }
  
  return (
    <div className="relative h-16 w-full flex items-center justify-center p-2">
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
      className="border-y border-slate-200 min-h-[600px] bg-cover bg-center bg-no-repeat py-20 flex items-center relative overflow-hidden" 
      id="partners"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2129&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay with gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-slate-900/60 to-black/70 pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-pink-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '0.75s' }} />
      
      <div className="container-responsive space-y-6 w-full relative z-10">
        <div className="flex justify-center mb-12">
          <div className="group relative rounded-2xl border border-white/40 bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-2xl shadow-2xl px-8 py-4 inline-block max-w-2xl transition-all duration-500 hover:scale-105 hover:shadow-white/30">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500 blur-xl" />
            <p className="relative z-10 text-center text-lg md:text-xl font-black uppercase tracking-[0.3em] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent animate-fade-in-up opacity-0 whitespace-nowrap" style={{ 
              fontFamily: 'var(--font-poppins), "Poppins", "Inter", system-ui, -apple-system, sans-serif',
              letterSpacing: '0.3em',
              fontWeight: 900,
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
              fontVariant: 'small-caps'
            }}>
              Trusted by omnichannel D2C brands
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div 
              key={brand.name} 
              className="group relative rounded-2xl border border-slate-200 bg-white shadow-lg w-full flex items-center justify-center min-h-[90px] transition-all duration-500 hover:scale-105 hover:border-slate-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10">
                <BrandLogo brand={brand} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

