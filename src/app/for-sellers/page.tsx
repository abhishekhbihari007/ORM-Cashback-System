"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icons } from "@/lib/icons";

export default function ForSellersPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["hero"]));
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(sectionRefs.current).forEach((key) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(key));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]!);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const setSectionRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Starry Night Sky Background */}
      <div className="fixed inset-0 bg-slate-900 starry-sky z-0" />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 z-10 min-h-screen bg-white">
        {/* White Background Overlay - ensures white background */}
        <div className="absolute inset-0 bg-white z-0" />
        
        {/* Network Illustration Background - Fixed to viewport */}
        <div className="absolute inset-0 opacity-30 pointer-events-none z-[1]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
            {/* Top-left gradient circle */}
            <defs>
              <radialGradient id="gradient1" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(15,23,42,0.2)" />
                <stop offset="100%" stopColor="rgba(15,23,42,0)" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="150" r="200" fill="url(#gradient1)" />
            
            {/* Network Hand and Paper Airplane */}
            <g stroke="rgba(15,23,42,0.4)" strokeWidth="1.5" fill="none">
              {/* Hand outline - network style */}
              <g opacity="0.6">
                {/* Wrist */}
                <line x1="850" y1="600" x2="870" y2="580" />
                <line x1="870" y1="580" x2="880" y2="560" />
                <line x1="880" y1="560" x2="890" y2="540" />
                
                {/* Palm */}
                <line x1="890" y1="540" x2="900" y2="520" />
                <line x1="900" y1="520" x2="910" y2="500" />
                <line x1="910" y1="500" x2="920" y2="480" />
                <line x1="920" y1="480" x2="930" y2="460" />
                
                {/* Thumb */}
                <line x1="930" y1="460" x2="940" y2="450" />
                <line x1="940" y1="450" x2="950" y2="440" />
                <line x1="950" y1="440" x2="960" y2="430" />
                
                {/* Index finger */}
                <line x1="930" y1="460" x2="940" y2="440" />
                <line x1="940" y1="440" x2="950" y2="420" />
                <line x1="950" y1="420" x2="960" y2="400" />
                <line x1="960" y1="400" x2="970" y2="380" />
                
                {/* Middle finger */}
                <line x1="920" y1="480" x2="930" y2="450" />
                <line x1="930" y1="450" x2="940" y2="420" />
                <line x1="940" y1="420" x2="950" y2="390" />
                <line x1="950" y1="390" x2="960" y2="360" />
                
                {/* Ring finger */}
                <line x1="910" y1="500" x2="920" y2="470" />
                <line x1="920" y1="470" x2="930" y2="440" />
                <line x1="930" y1="440" x2="940" y2="410" />
                
                {/* Pinky */}
                <line x1="900" y1="520" x2="910" y2="490" />
                <line x1="910" y1="490" x2="920" y2="460" />
              </g>
              
              {/* Paper Airplane - network style */}
              <g opacity="0.6">
                {/* Airplane body */}
                <line x1="960" y1="380" x2="1000" y2="320" />
                <line x1="1000" y1="320" x2="1040" y2="260" />
                <line x1="1040" y1="260" x2="1080" y2="200" />
                
                {/* Left wing */}
                <line x1="1020" y1="290" x2="1050" y2="280" />
                <line x1="1050" y1="280" x2="1080" y2="270" />
                <line x1="1020" y1="290" x2="1040" y2="300" />
                
                {/* Right wing */}
                <line x1="1020" y1="290" x2="1050" y2="300" />
                <line x1="1050" y1="300" x2="1080" y2="310" />
                <line x1="1020" y1="290" x2="1040" y2="280" />
              </g>
            </g>
            
            {/* Network nodes (dots) */}
            <g fill="rgba(15,23,42,0.5)">
              {/* Hand nodes */}
              <circle cx="850" cy="600" r="2" />
              <circle cx="870" cy="580" r="2" />
              <circle cx="880" cy="560" r="2" />
              <circle cx="890" cy="540" r="2" />
              <circle cx="900" cy="520" r="2" />
              <circle cx="910" cy="500" r="2" />
              <circle cx="920" cy="480" r="2" />
              <circle cx="930" cy="460" r="2" />
              <circle cx="940" cy="450" r="2" />
              <circle cx="950" cy="440" r="2" />
              <circle cx="960" cy="430" r="2" />
              <circle cx="940" cy="440" r="2" />
              <circle cx="950" cy="420" r="2" />
              <circle cx="960" cy="400" r="2" />
              <circle cx="970" cy="380" r="2" />
              <circle cx="930" cy="450" r="2" />
              <circle cx="940" cy="420" r="2" />
              <circle cx="950" cy="390" r="2" />
              <circle cx="960" cy="360" r="2" />
              <circle cx="920" cy="470" r="2" />
              <circle cx="930" cy="440" r="2" />
              <circle cx="940" cy="410" r="2" />
              <circle cx="910" cy="490" r="2" />
              <circle cx="920" cy="460" r="2" />
              
              {/* Airplane nodes */}
              <circle cx="1000" cy="320" r="2" />
              <circle cx="1040" cy="260" r="2" />
              <circle cx="1080" cy="200" r="2" />
              <circle cx="1020" cy="290" r="2.5" />
              <circle cx="1050" cy="280" r="2" />
              <circle cx="1080" cy="270" r="2" />
              <circle cx="1040" cy="300" r="2" />
              <circle cx="1050" cy="300" r="2" />
              <circle cx="1080" cy="310" r="2" />
              <circle cx="1040" cy="280" r="2" />
            </g>
            
            {/* City Skyline at bottom - network style */}
            <g stroke="rgba(15,23,42,0.3)" strokeWidth="1" fill="none" opacity="0.4">
              {/* Building 1 */}
              <line x1="50" y1="750" x2="50" y2="700" />
              <line x1="50" y1="700" x2="80" y2="680" />
              <line x1="80" y1="680" x2="80" y2="750" />
              
              {/* Building 2 */}
              <line x1="100" y1="750" x2="100" y2="650" />
              <line x1="100" y1="650" x2="150" y2="630" />
              <line x1="150" y1="630" x2="150" y2="750" />
              
              {/* Building 3 */}
              <line x1="180" y1="750" x2="180" y2="720" />
              <line x1="180" y1="720" x2="220" y2="710" />
              <line x1="220" y1="710" x2="220" y2="750" />
              
              {/* Building 4 */}
              <line x1="250" y1="750" x2="250" y2="680" />
              <line x1="250" y1="680" x2="300" y2="660" />
              <line x1="300" y1="660" x2="300" y2="750" />
              
              {/* Building 5 */}
              <line x1="330" y1="750" x2="330" y2="700" />
              <line x1="330" y1="700" x2="380" y2="690" />
              <line x1="380" y1="690" x2="380" y2="750" />
              
              {/* More buildings */}
              <line x1="410" y1="750" x2="410" y2="720" />
              <line x1="410" y1="720" x2="450" y2="710" />
              <line x1="450" y1="710" x2="450" y2="750" />
              
              <line x1="480" y1="750" x2="480" y2="680" />
              <line x1="480" y1="680" x2="530" y2="670" />
              <line x1="530" y1="670" x2="530" y2="750" />
            </g>
            
            {/* City skyline nodes */}
            <g fill="rgba(15,23,42,0.3)">
              <circle cx="50" cy="750" r="1.5" />
              <circle cx="50" cy="700" r="1.5" />
              <circle cx="80" cy="680" r="1.5" />
              <circle cx="80" cy="750" r="1.5" />
              <circle cx="100" cy="750" r="1.5" />
              <circle cx="100" cy="650" r="1.5" />
              <circle cx="150" cy="630" r="1.5" />
              <circle cx="150" cy="750" r="1.5" />
              <circle cx="180" cy="750" r="1.5" />
              <circle cx="180" cy="720" r="1.5" />
              <circle cx="220" cy="710" r="1.5" />
              <circle cx="220" cy="750" r="1.5" />
              <circle cx="250" cy="750" r="1.5" />
              <circle cx="250" cy="680" r="1.5" />
              <circle cx="300" cy="660" r="1.5" />
              <circle cx="300" cy="750" r="1.5" />
              <circle cx="330" cy="750" r="1.5" />
              <circle cx="330" cy="700" r="1.5" />
              <circle cx="380" cy="690" r="1.5" />
              <circle cx="380" cy="750" r="1.5" />
              <circle cx="410" cy="750" r="1.5" />
              <circle cx="410" cy="720" r="1.5" />
              <circle cx="450" cy="710" r="1.5" />
              <circle cx="450" cy="750" r="1.5" />
              <circle cx="480" cy="750" r="1.5" />
              <circle cx="480" cy="680" r="1.5" />
              <circle cx="530" cy="670" r="1.5" />
              <circle cx="530" cy="750" r="1.5" />
            </g>
          </svg>
        </div>
        
        <div className="container-responsive py-24 md:py-32 relative z-20">
          <div className="mx-auto max-w-4xl text-center relative z-10">
            <h1 className="text-5xl font-black leading-tight text-slate-900 md:text-7xl">
              The Operating System
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                for Reviews
              </span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 md:text-2xl">
              Scale authentic reviews across Amazon, Flipkart, and 25+ marketplaces.
              <br />
              Built for brands that take compliance seriously.
            </p>
          </div>
        </div>
        
        {/* Arrow Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <Image 
            src="/arrow-bottom1.png" 
            alt="" 
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            style={{ maxHeight: '250px' }}
          />
        </div>
      </section>

      {/* Compliance Block */}
      <section className="border-b border-slate-700/50 relative z-10">
        <div 
          ref={setSectionRef("compliance")}
          className={`container-responsive py-12 transition-all duration-1000 ease-out ${
            visibleSections.has("compliance")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl shadow-black/20">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <Icons.Shield className="h-12 w-12 text-indigo-400" />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">100% TOS Compliant / No Bots</h2>
                <p className="mt-2 text-slate-300">
                  Every review comes from verified, real shoppers. We guarantee marketplace policy compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section className="py-20 relative z-10">
        <div className="container-responsive">
          <div 
            ref={setSectionRef("features-header")}
            className={`mb-12 text-center transition-all duration-1000 ease-out delay-100 ${
              visibleSections.has("features-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-white">Everything You Need</h2>
            <p className="mt-4 text-xl text-slate-300">Powerful tools to manage your reputation at scale</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Review Generation */}
            <div 
              ref={setSectionRef("feature-1")}
              className={`group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl shadow-black/20 transition-all duration-1000 ease-out delay-200 hover:shadow-2xl hover:border-indigo-500/50 ${
                visibleSections.has("feature-1")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-500/20">
                  <Icons.Star className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">Review Generation</h3>
                <p className="text-slate-300">
                  Automated campaign creation, slot management, and real-time tracking of review submissions across all
                  marketplaces.
                </p>
              </div>
            </div>

            {/* Sentiment AI */}
            <div 
              ref={setSectionRef("feature-2")}
              className={`group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl shadow-black/20 transition-all duration-1000 ease-out delay-300 hover:shadow-2xl hover:border-indigo-500/50 ${
                visibleSections.has("feature-2")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-500/20">
                  <Icons.Comment className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">Sentiment AI</h3>
                <p className="text-slate-300">
                  Advanced AI analyzes review sentiment, detects policy violations, and ensures brand safety before
                  reviews go live.
                </p>
              </div>
            </div>

            {/* Multi-Channel Tracking */}
            <div 
              ref={setSectionRef("feature-3")}
              className={`group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl shadow-black/20 transition-all duration-1000 ease-out delay-400 hover:shadow-2xl hover:border-indigo-500/50 ${
                visibleSections.has("feature-3")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-500/20">
                  <Icons.Globe className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">Multi-Channel Tracking</h3>
                <p className="text-slate-300">
                  Unified dashboard for Amazon, Flipkart, Nykaa, Meesho, and 25+ marketplaces. One platform, complete
                  control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-slate-700/50 relative z-10">
        <div className="container-responsive py-20">
          <div 
            ref={setSectionRef("pricing-header")}
            className={`mb-12 text-center transition-all duration-1000 ease-out delay-100 ${
              visibleSections.has("pricing-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-slate-300">Choose the plan that fits your scale</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            {/* Starter */}
            <div 
              ref={setSectionRef("pricing-1")}
              className={`rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl shadow-black/20 transition-all duration-1000 ease-out delay-200 ${
                visibleSections.has("pricing-1")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="mb-2 text-2xl font-bold text-white">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">₹50K</span>
                <span className="text-slate-300">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>Up to 100 reviews/month</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>2 Marketplaces</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>Basic Analytics</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>Email Support</span>
                </li>
              </ul>
              <button className="mt-8 w-full rounded-xl border border-indigo-500/50 bg-slate-800/50 text-indigo-400 px-6 py-3 font-semibold transition hover:bg-indigo-500/20 hover:border-indigo-400">
                Get Started
              </button>
            </div>

            {/* Pro - Highlighted */}
            <div 
              ref={setSectionRef("pricing-2")}
              className={`relative md:scale-110 transition-all duration-1000 ease-out delay-300 ${
                visibleSections.has("pricing-2")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Gradient Border Wrapper */}
              <div className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                <div className="relative rounded-2xl bg-slate-800/90 backdrop-blur-sm p-8">
                  {/* Most Popular Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    Most Popular
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Pro</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-white">₹2L</span>
                    <span className="text-slate-300">/month</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-slate-300">
                      <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                      <span>Up to 500 reviews/month</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                      <span>5 Marketplaces</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                      <span>Advanced Analytics</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                      <span>Priority Support</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                      <span>Sentiment AI</span>
                    </li>
                  </ul>
                  <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-indigo-500/25">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* Enterprise */}
            <div 
              ref={setSectionRef("pricing-3")}
              className={`rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl shadow-black/20 transition-all duration-1000 ease-out delay-400 ${
                visibleSections.has("pricing-3")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="mb-2 text-2xl font-bold text-white">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">Custom</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>Unlimited reviews</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>All Marketplaces</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>Custom Analytics</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Icons.CircleCheck className="h-5 w-5 text-indigo-400" />
                  <span>API Access</span>
                </li>
              </ul>
              <button className="mt-8 w-full rounded-xl border border-indigo-500/50 bg-slate-800/50 text-indigo-400 px-6 py-3 font-semibold transition hover:bg-indigo-500/20 hover:border-indigo-400">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

