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
        className="text-sm font-semibold grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        style={{ color: brandColors[brand.name] || "#000000" }}
      >
        {brand.name}
      </div>
    );
  }
  
  const extraLargeLogo = brand.name === "Flipkart";
  const largeLogo = brand.name === "Myntra";
  const baseWidth = extraLargeLogo ? 384 : largeLogo ? 240 : 160;
  const baseHeight = extraLargeLogo ? 144 : largeLogo ? 92 : 60;

  return (
    <Image
      src={brand.url}
      alt={`${brand.name} logo`}
      width={baseWidth}
      height={baseHeight}
        className={`w-auto object-contain transition-transform duration-300 hover:scale-105 ${
          extraLargeLogo
            ? "h-16 sm:h-20 md:h-24 lg:h-30"
            : largeLogo
            ? "h-11 sm:h-14 md:h-17 lg:h-21"
            : "h-8 sm:h-10 md:h-12 lg:h-16"
        }`}
      onError={handleError}
      unoptimized
    />
  );
}

export function PartnersSection() {
  return (
    <section 
      className="relative overflow-hidden py-20 sm:py-24 md:py-28 min-h-[450px] sm:min-h-[550px] bg-white" 
      id="partners"
      style={{ backgroundImage: "none" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-center mb-10 sm:mb-12 md:mb-14">
          <p className="text-base sm:text-lg md:text-xl font-semibold tracking-[0.7em] uppercase text-slate-800 text-center px-8 sm:px-10 md:px-12">
            Trusted by omnichannel D2C brands
          </p>
        </div>
        
        {/* Logos Grid - Clean and minimal */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 sm:gap-16 md:gap-20 lg:gap-24 items-center justify-items-center">
          {brands.map((brand) => (
            <BrandLogo key={brand.name} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}

