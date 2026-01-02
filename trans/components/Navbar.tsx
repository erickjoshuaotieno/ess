// components/navbar/Navbar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation } from "./NavigationContext";
import {
  Menu,
  X,
  Home,
  GraduationCap,
  Phone,
  ChevronDown,
  School,
  Sparkles,
  UserCircle,
} from "lucide-react";

const MotionLink = motion(Link);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mounted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { isNavigating } = useNavigation();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  // Wait for loading screen to finish before starting animations
  // Also trigger on page navigation
  useEffect(() => {
    const pathnameChanged = previousPathnameRef.current !== pathname;

    if (pathnameChanged) {
      previousPathnameRef.current = pathname;
      // Reset animation state when pathname changes (using setTimeout to avoid sync setState)
      const resetTimer = setTimeout(() => {
        setIsReady(false);
      }, 0);

      // Start animations after navigation completes
      if (!isNavigating) {
        const timer = setTimeout(() => {
          setIsReady(true);
        }, 1600);
        return () => {
          clearTimeout(resetTimer);
          clearTimeout(timer);
        };
      }

      return () => clearTimeout(resetTimer);
    }

    // Start animations on initial mount or when navigation completes
    if (!isNavigating) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [pathname, isNavigating]);

  // Transform values for floating effect (only on desktop)
  const navPadding = useTransform(scrollY, [0, 100], isDesktop ? [0, 16] : [0, 0]);
  const navMarginTop = useTransform(scrollY, [0, 100], isDesktop ? [0, 16] : [0, 0]);
  const borderRadius = useTransform(scrollY, [0, 100], isDesktop ? [0, 24] : [0, 0]);
  const navScale = useTransform(scrollY, [0, 100], isDesktop ? [1, 0.98] : [1, 1]);

  const navItems: Array<{
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    dropdown?: Array<{ label: string; href: string; icon: React.ComponentType<{ className?: string }> }>;
  }> = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "About",
      href: "/about",
      icon: School,
    },
    {
      label: "Admissions",
      href: "/admissions",
      icon: GraduationCap,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: Phone,
    },
    {
      label: "Login",
      href: "/login",
      icon: UserCircle,
    },
  ];

  // Generate random positions for sparkles (using useState to avoid render-time Math.random)
  const [sparklePositions] = useState(() => {
    return Array.from({ length: 3 }, () => ({
      top: `${Math.random() * 30}%`,
      left: `${Math.random() * 30}%`,
    }));
  });

  const [buttonSparklePositions] = useState(() => {
    return Array.from({ length: 5 }, () => ({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 100}%`,
    }));
  });

  // Premium maroon-black gradient colors
  const maroonGradient = "from-[#8B0000] via-[#6A0000] to-[#000000]";
  const maroonLight = "from-[#8B0000] to-[#A50000]";
  const maroonDark = "from-[#6A0000] to-[#000000]";

  // Animation variants from previous navbar
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.9
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: i * 0.2 + 0.6,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const logoVariants: Variants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 2.5,
        delay: 0.3
      }
    }
  };

  const sparkleVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 1.5,
        delay: i * 0.2 + 2,
        repeat: Infinity,
        repeatDelay: 3
      }
    })
  };

  const schoolLogoVariants: Variants = {
    initial: {
      scale: 1,
      rotate: 0
    },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.3,
      rotate: 360,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const sparkleTrailVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0],
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const applyButtonVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 1.4
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const starVariants: Variants = {
    animate: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  const mobileMenuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const mobileItemVariants: Variants = {
    closed: {
      opacity: 0,
      x: 100,
      scale: 0.8
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay: i * 0.25
      }
    })
  };

  const dropdownVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (!mounted) return null;

  return (
    <>
      {/* Navbar Container with Floating Effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingLeft: navPadding,
          paddingRight: navPadding,
          paddingTop: navMarginTop,
        }}
      >
        <motion.nav
          className={`transition-all duration-500 ${
            scrolled
            ? "bg-linear-to-b from-white/95 via-[#FFF7F7]/80 to-[#FFF2F2]/75 backdrop-blur-xl shadow-2xl py-2 border border-[#8B0000]/70"
            : "bg-linear-to-b from-white/95 via-[#FFF7F7]/80 to-[#FFF2F2]/75 py-4 border-2 border-transparent"
          }`}
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
          style={{
            borderRadius: borderRadius,
            scale: navScale,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Premium Logo with Enhanced Animations */}
              <motion.div
                className="flex items-center space-x-3 cursor-pointer group"
                variants={logoVariants}
                initial="hidden"
                animate={isReady ? "visible" : "hidden"}
              >
                <Link href="/" className="flex items-center space-x-3">
                  <motion.div
                    className="relative"
                    variants={schoolLogoVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-br from-[#8B0000] to-[#4A0000] rounded-2xl blur-lg"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <div className={`relative w-14 h-14 bg-linear-to-br ${maroonGradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                      <Sparkles className="w-7 h-7 text-white" />

                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-[#FF6B6B] rounded-full"
                          style={{
                            top: sparklePositions[i]?.top || '0%',
                            left: sparklePositions[i]?.left || '0%',
                          }}
                          variants={sparkleTrailVariants}
                          animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.4,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                  <div className="flex flex-col">
                    <motion.div
                      className="font-bold text-2xl tracking-tight"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                        EMMANUEL
                      </span>
                    </motion.div>
                    <div className="text-xs font-semibold text-gray-600 tracking-widest uppercase">
                      SENIOR SCHOOL
                    </div>
                    <div className="text-[10px] text-gray-500 italic mt-0.5">
                      Learn to love, love to learn
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Desktop Navigation with Staggered Animations */}
              <div className="hidden lg:flex items-center space-x-1 justify-center flex-1 px-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isReady ? "visible" : "hidden"}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown ? (
                      <motion.div
                        className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-gray-800 hover:text-[#8B0000] hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 cursor-default"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                        <motion.div
                          animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <MotionLink
                        href={item.href}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                          pathname === item.href
                            ? `text-white bg-linear-to-r ${maroonLight} shadow-xl`
                            : `text-gray-800 hover:text-[#8B0000] hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100`
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </MotionLink>
                    )}

                    {/* Premium Dropdown with Animation */}
                    {item.dropdown && (
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                          >
                            <div className="p-2">
                              {item.dropdown.map((dropdownItem, dIndex) => (
                                <motion.div
                                  key={dropdownItem.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: dIndex * 0.05 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <Link
                                    href={dropdownItem.href}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-linear-to-r hover:from-[#FFF5F5] hover:to-[#FFE5E5] text-gray-700 hover:text-[#8B0000] transition-all duration-200 group"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <dropdownItem.icon className="w-4 h-4 text-[#8B0000] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200" />
                                    <span className="font-medium text-sm flex-1">
                                      {dropdownItem.label}
                                    </span>
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileHover={{ width: 20 }}
                                      className="h-0.5 bg-linear-to-r from-[#8B0000] to-[#000000]"
                                    />
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {/* Premium CTA Button with Shine Effect */}
                <div className="hidden lg:block">
                <motion.div
                  variants={applyButtonVariants}
                  initial="hidden"
                  animate={isReady ? "visible" : "hidden"}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: buttonSparklePositions[i]?.top || '0%',
                        left: buttonSparklePositions[i]?.left || '0%',
                      }}
                      custom={i}
                      variants={sparkleVariants}
                      initial="hidden"
                      animate={isReady ? "visible" : "hidden"}
                    >
                      <Sparkles className="w-2 h-2 text-[#FF9999]" />
                    </motion.div>
                  ))}

                  <Link
                    href="/admissions#application-form"
                    className="ml-4 flex items-center whitespace-nowrap px-8 py-3 bg-linear-to-r from-[#8B0000] via-[#6A0000] to-black text-white font-bold rounded-full shadow-2xl hover:shadow-3xl relative overflow-hidden group"
                  >
                    <span className="flex items-center space-x-2 relative z-10">
                      <motion.span
                        variants={starVariants}
                        animate="animate"
                      >
                        <GraduationCap className="w-5 h-5" fill="currentColor" />
                      </motion.span>
                      <span>Apply Now</span>
                    </span>

                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transform: "skewX(-20deg)"
                      }}
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      }}
                    />
                  </Link>
                </motion.div>
                </div>

              {/* Mobile Menu Button with Animation */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                variants={itemVariants}
                custom={navItems.length}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-6 h-6 text-gray-800" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-6 h-6 text-gray-800" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              </div>
            </div>

            {/* Mobile Navigation with Slide Animation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="lg:hidden fixed right-0 w-3/4 bg-linear-to-b from-white/95 via-[#FFF5F5]/95 to-[#FFE5E5]/95 backdrop-blur-xl border-l border-[#8B0000]/20 shadow-2xl overflow-y-auto z-40"
                  style={{
                    top: scrolled ? "73px" : "90px",
                    height: scrolled ? "calc(100vh - 73px)" : "calc(100vh - 90px)"
                  }}
                >
                  <div className="flex flex-col items-start justify-start min-h-full gap-6 px-6 py-8 pb-20">
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href;

                      return (
                        <div key={item.label} className="w-full">
                          <motion.div
                            custom={index + 1}
                            variants={mobileItemVariants}
                          >
                            <div className="flex items-center justify-between w-full">
                              {item.dropdown ? (
                                <motion.div
                                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                                  className="relative text-lg font-semibold transition-colors flex items-center justify-between w-full gap-3 cursor-pointer text-gray-800 hover:text-[#8B0000] hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 px-4 py-3 rounded-2xl"
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                  </div>
                                  <ChevronDown
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                                      mobileExpanded === item.label ? "rotate-180 text-[#8B0000]" : ""
                                    }`}
                                  />
                                </motion.div>
                              ) : (
                                <MotionLink
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`relative text-lg font-semibold transition-colors flex items-center gap-3 flex-1 ${
                                    isActive
                                      ? 'text-white bg-linear-to-r from-[#8B0000] to-[#A50000] shadow-lg px-4 py-3 rounded-2xl'
                                      : 'text-gray-800 hover:text-[#8B0000] hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 px-4 py-3 rounded-2xl'
                                  }`}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <item.icon className="w-5 h-5" />
                                  {item.label}
                                </MotionLink>
                              )}
                            </div>

                            {/* Mobile dropdown items */}
                            <AnimatePresence>
                              {item.dropdown && mobileExpanded === item.label && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-4 mt-2 space-y-2 border-l-2 border-gray-100 pl-4">
                                {item.dropdown.map((dropdownItem, dIndex) => (
                                  <motion.a
                                    key={dropdownItem.label}
                                    href={dropdownItem.href}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-[#8B0000] hover:bg-linear-to-r hover:from-[#FFF5F5] hover:to-[#FFE5E5] transition-all duration-200"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (index + 1) * 0.25 + dIndex * 0.1 }}
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <dropdownItem.icon className="w-4 h-4" />
                                    <span>{dropdownItem.label}</span>
                                  </motion.a>
                                ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </div>
                      );
                    })}

                    {/* Mobile CTA Button */}
                    <motion.div
                      custom={navItems.length + 1}
                      variants={mobileItemVariants}
                      className="pt-6 w-full"
                    >
                      <Link
                        href="/admissions#application-form"
                        onClick={() => setIsOpen(false)}
                        className={`block w-full px-6 py-4 bg-linear-to-r ${maroonDark} text-white font-bold text-center rounded-2xl shadow-xl hover:shadow-2xl relative overflow-hidden group`}
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                            transform: "skewX(-20deg)"
                          }}
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                          }}
                        />
                        <span className="flex items-center justify-center space-x-3 relative z-10">
                          <GraduationCap className="w-5 h-5" />
                          <span>Apply Now</span>
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Decorative gradient line with Sparkles */}
          <motion.div
            className="relative overflow-hidden"
            animate={{ opacity: scrolled ? 0 : 1, height: scrolled ? 0 : "auto" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              key={pathname}
              className={`h-1 bg-linear-to-r ${maroonGradient}`}
              initial={{ scaleX: 0 }}
              animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 2.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute bottom-0.5"
                style={{
                  left: `${25 * (i + 1)}%`,
                }}
                animate={{
                  y: [0, -6, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF9999]" />
              </motion.div>
            ))}
          </motion.div>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;