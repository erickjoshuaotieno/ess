"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { usePathname } from "next/navigation";
import { useNavigation } from "./NavigationContext";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);
  const { isNavigating } = useNavigation();
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>(pathname);
  const [isPathnameChanging, setIsPathnameChanging] = useState(false);

  // Check if pathname changed (compute in render for immediate detection)
  const pathnameChanged = pathname !== previousPathnameRef.current && !isLoading;

  // Use useLayoutEffect to update ref and state synchronously (before paint)
  useLayoutEffect(() => {
    if (pathnameChanged) {
      // Pathname changed - show loading immediately
      setIsPathnameChanging(true);
      previousPathnameRef.current = pathname;
    }
  }, [pathname, pathnameChanged]);

  // Reset pathname changing flag when navigation completes
  useEffect(() => {
    if (isPathnameChanging && !isNavigating) {
      // Navigation completed, reset the flag after a brief delay
      const timer = setTimeout(() => {
        setIsPathnameChanging(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isNavigating, isPathnameChanging]);

  useEffect(() => {
    // Load Lottie animation
    import("@/public/animations/Book Loader.json")
      .then((data) => {
        setAnimationData(data.default);
      })
      .catch((error) => {
        console.error("Failed to load Lottie animation:", error);
      });

    const handleReady = () => {
      // Small delay so animation looks smooth
      setTimeout(() => setIsLoading(false), 1500);
    };

    // Wait until everything (scripts, css, images) is loaded
    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }

    return () => {
      window.removeEventListener("load", handleReady);
    };
  }, []);

  // Show loading screen if initial load, navigating, pathname is changing, or pathname just changed
  const showLoading = isLoading || isNavigating || isPathnameChanging || pathnameChanged;

  return (
    <div className="relative">
      <AnimatePresence>
        {showLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Background with subtle maroon corners */}
            <div className="absolute inset-0 bg-white">
              {/* Top-right corner maroon tint */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#FFE5E5]/20 via-[#FFF2F2]/10 to-transparent" />

              {/* Bottom-left corner maroon tint */}
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#FFE5E5]/20 via-[#FFF2F2]/10 to-transparent" />

              {/* White center area (circular fade) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-white via-white to-white/90 rounded-full" />
            </div>

            {/* Lottie Animation - Floating in center */}
            {animationData && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 z-10"
              >
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                />
              </motion.div>
            )}

            {/* Gradient Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-24 z-10"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#8B0000] via-[#FF9999] to-[#8B0000] bg-clip-text text-transparent">
                Loading...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Hide immediately when loading/navigating/pathname changing */}
      <div className={showLoading ? "hidden" : "block"}>
        {children}
      </div>
    </div>
  );
}