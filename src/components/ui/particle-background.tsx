"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// Type for the engine parameter
type Engine = Parameters<typeof loadSlim>[0];

export function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-0"
      style={{ zIndex: -1 }}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 25,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: ["#ffffff", "#e0f2fe", "#bae6fd", "#cbd5e1"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.25,
            random: true,
            anim: {
              enable: true,
              speed: 0.3,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 1.5,
            random: {
              enable: true,
              minimumValue: 0.5,
            },
            anim: {
              enable: true,
              speed: 0.8,
              size_min: 0.5,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: false,
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.25,
              },
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

