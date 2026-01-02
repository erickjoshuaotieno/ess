"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigation } from "./NavigationContext";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const { navigationComplete } = useNavigation();

  useEffect(() => {
    // Increased delay to match slower animations
    const timer = setTimeout(() => {
      navigationComplete();
    }, 500); // Increased from 300

    return () => clearTimeout(timer);
  }, [navigationComplete]);

 return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.4
    }}
    onAnimationComplete={navigationComplete}
  >
    {children}
  </motion.div>
);
}