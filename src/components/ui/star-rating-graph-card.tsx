"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaArrowUp, FaStar } from "react-icons/fa6";
import { useAnimation } from "@/contexts/AnimationContext";

const StarRatingGraphCard: React.FC = () => {
  const [newReviews, setNewReviews] = useState(0);
  const [ratingChange, setRatingChange] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [showLast30Days, setShowLast30Days] = useState(false);
  const { shouldAnimate, triggerGraphAnimation } = useAnimation();
  const pathname = usePathname();

  // Auto-trigger animation on home page load/refresh (no delay)
  useEffect(() => {
    if (pathname === "/") {
      triggerGraphAnimation();
    }
  }, [pathname, triggerGraphAnimation]);

  useEffect(() => {
    if (!shouldAnimate) return;

    // Reset all values to 0
    setNewReviews(0);
    setRatingChange(0);
    setCurrentRating(0);
    setShowLast30Days(false);

    // Animate New Reviews from 0 to 150
    const reviewsDuration = 2000; // 2 seconds
    const reviewsSteps = 150;
    const reviewsInterval = reviewsDuration / reviewsSteps;
    let reviewsCount = 0;

    const reviewsTimer = setInterval(() => {
      reviewsCount++;
      if (reviewsCount <= reviewsSteps) {
        setNewReviews(reviewsCount);
      } else {
        clearInterval(reviewsTimer);
      }
    }, reviewsInterval);

    // Animate Rating Change from 0 to 0.2
    const ratingDuration = 2000; // 2 seconds
    const ratingSteps = 20;
    const ratingInterval = ratingDuration / ratingSteps;
    let ratingCount = 0;

    const ratingTimer = setInterval(() => {
      ratingCount++;
      if (ratingCount <= ratingSteps) {
        setRatingChange((ratingCount / ratingSteps) * 0.2);
      } else {
        clearInterval(ratingTimer);
      }
    }, ratingInterval);

    // Animate Current Rating from 0 to 4.8
    const currentRatingDuration = 2000; // 2 seconds
    const currentRatingSteps = 48;
    const currentRatingInterval = currentRatingDuration / currentRatingSteps;
    let currentRatingCount = 0;

    const currentRatingTimer = setInterval(() => {
      currentRatingCount++;
      if (currentRatingCount <= currentRatingSteps) {
        setCurrentRating((currentRatingCount / currentRatingSteps) * 4.8);
      } else {
        clearInterval(currentRatingTimer);
      }
    }, currentRatingInterval);

    // Show "Last 30 days" after a short delay
    setTimeout(() => {
      setShowLast30Days(true);
    }, 500);

    // Cleanup function
    return () => {
      clearInterval(reviewsTimer);
      clearInterval(ratingTimer);
      clearInterval(currentRatingTimer);
    };
  }, [shouldAnimate]);

  return (
    <div className="relative p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 text-white w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaArrowUp className="h-6 w-6 text-green-400" />
          Review Performance
        </h3>
        <span 
          className={`text-sm text-gray-300 transition-opacity duration-500 ${
            showLast30Days ? "opacity-100" : "opacity-0"
          }`}
        >
          Last 30 days
        </span>
      </div>

      {/* Current Rating */}
      <div className="flex items-center mb-6">
        <FaStar className="h-8 w-8 text-yellow-400 fill-yellow-400 mr-2" />
        <span className="text-5xl font-bold text-green-400">
          {currentRating.toFixed(1)}
        </span>
        <span className="text-xl text-gray-300">/ 5.0</span>
      </div>

      {/* Graph Area (Simple SVG Mockup) */}
      <div className="w-full h-24 mb-4">
        <svg viewBox="0 0 300 100" className="w-full h-full">
          {/* Grid lines (subtle horizontal guides) */}
          <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.1)" strokeDasharray="3,3" />
          <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.1)" strokeDasharray="3,3" />
          <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.1)" strokeDasharray="3,3" />
          <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.1)" strokeDasharray="3,3" />

          {/* Rising graph line - smooth upward curve from bottom-left to top-right */}
          <path
            d="M 20 85 Q 100 70, 180 50 Q 240 30, 280 15"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="300"
            strokeDashoffset={shouldAnimate ? "0" : "300"}
            style={{
              transition: shouldAnimate ? "stroke-dashoffset 2s ease-in-out" : "none",
            }}
          />
          
          {/* Highlight circle at the end (latest data point) - appears after line draws */}
          <circle 
            cx="280" 
            cy="15" 
            r="6" 
            fill="#10B981" 
            stroke="white" 
            strokeWidth="2"
            style={{
              opacity: shouldAnimate ? 1 : 0,
              transition: shouldAnimate ? "opacity 0.5s ease-in-out 2s" : "none",
            }}
          />
        </svg>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <p className="text-gray-300">New Reviews</p>
          <p className="font-bold text-lg text-white">+{newReviews}</p>
        </div>
        <div>
          <p className="text-gray-300">Rating Change</p>
          <p className="font-bold text-lg text-green-400">
            +{ratingChange.toFixed(1)} (from 4.6)
          </p>
        </div>
      </div>
    </div>
  );
};

export default StarRatingGraphCard;

