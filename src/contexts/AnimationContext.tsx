"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AnimationContextType {
  triggerGraphAnimation: () => void;
  shouldAnimate: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const triggerGraphAnimation = () => {
    // Only allow animation if it hasn't been triggered yet, or reset for new trigger
    setShouldAnimate(false);
    // Small delay to ensure state reset before starting new animation
    setTimeout(() => {
      setShouldAnimate(true);
    }, 100);
  };

  return (
    <AnimationContext.Provider value={{ triggerGraphAnimation, shouldAnimate }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within AnimationProvider");
  }
  return context;
}

