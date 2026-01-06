// components/Footer.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  School,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  BookOpen,
  GraduationCap,
  Users,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { amount: 0.1 });
  const controls = useAnimation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      setShowBackToTop(scrollTop > scrollHeight * 0.05);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      // Reset animations when out of view to trigger again
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const footerLinks = {
    academics: [
      { label: 'Grade 10 Curriculum', href: '#' },
      { label: 'STEM Programs', href: '#' },
      { label: 'Arts & Sports', href: '#' },
      { label: 'Subjects Offered', href: '#' },
      { label: 'Development Clubs', href: '#' },
    ],
    admissions: [
      { label: 'Requirements', href: '#' },
      { label: 'School Fees', href: '#' },
      { label: 'Uniform', href: '#' },
      { label: 'Apply Online', href: '#' },
      { label: 'Virtual Tour', href: '#' },
    ],
    about: [
      { label: 'Our Vision', href: '#' },
      { label: 'Our Mission', href: '#' },
      { label: 'Why Choose Us', href: '#' },
      { label: 'Leadership', href: '#' },
      { label: 'School History', href: '#' },
    ],
    contact: [
      { label: 'Admissions Office', href: 'tel:+254722489809' },
      { label: 'Email Us', href: 'mailto:info@emmanuelseniorschool.co.ke' },
      { label: 'Visit Campus', href: '#' },
      { label: 'Emergency Contact', href: 'tel:+254722489809' },
      { label: 'Parent Portal', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/emmanuelsenior' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/emmanuelsenior' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/emmanuelsenior' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/emmanuelsenior' },
  ];

  return (
    <footer className="relative overflow-hidden" ref={footerRef}>
      {/* Main Footer with Gradient */}
      <div className="bg-gradient-to-br from-[#1a0a0a] via-[#2a0a0a] to-[#000000] text-white">
        {/* Decorative Top Border with Animation */}
        <motion.div
          className="h-1 bg-gradient-to-r from-[#8B0000] via-[#6A0000] to-[#000000]"
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1 }
          }}
          initial="hidden"
          animate={controls}
          custom={0}
          transition={{ duration: 0.8, delay: 0.1 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* School Info - Animate from left */}
            <motion.div
              className="lg:col-span-1"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="flex items-center gap-3 mb-6"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#8B0000] to-[#000000] rounded-xl blur-md opacity-50"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-[#8B0000] to-[#000000] rounded-xl flex items-center justify-center shadow-lg">
                    <School className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <div>
                  <motion.h2
                    className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    EMMANUEL
                  </motion.h2>
                  <motion.p
                    className="text-sm text-gray-400"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Senior School
                  </motion.p>
                </div>
              </motion.div>
              <motion.p
                className="text-gray-300 mb-6 leading-relaxed"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                A Christ-centered center of excellence nurturing holistic, competent,
                and morally upright learners who transform society through faith,
                knowledge, and service.
              </motion.p>

              {/* School Motto */}
              <motion.div
                className="flex items-center gap-2 text-sm text-[#FF9999] italic mb-6"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span>Learn to love, love to learn</span>
              </motion.div>

              {/* Contact Info */}
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: 'Maragua, Kenya', subtext: '3 Kms off Murang\'a Road' },
                  { icon: Phone, text: '0722 489 809', subtext: null, isLink: true },
                  { icon: Mail, text: 'info@emmanuelseniorschool.co.ke', subtext: null, isLink: true },
                  { icon: Clock, text: 'Mon - Fri: 8:00 AM - 5:00 PM', subtext: null }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <item.icon className="w-5 h-5 text-[#FF9999] flex-shrink-0 mt-1" />
                    <div>
                      {item.isLink ? (
                        <a
                          href={item.icon === Phone ? 'tel:+254722489809' : 'mailto:info@emmanuelseniorschool.co.ke'}
                          className="hover:text-[#FF9999] transition-colors block"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p className="font-medium">{item.text}</p>
                      )}
                      {item.subtext && (
                        <p className="text-sm text-gray-400">{item.subtext}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Academics - Animate from bottom */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h3
                className="text-lg font-semibold mb-6 flex items-center gap-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookOpen className="w-5 h-5 text-[#FF9999]" />
                </motion.div>
                Academics
              </motion.h3>
              <ul className="space-y-3">
                {footerLinks.academics.map((link, index) => (
                  <motion.li
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#FF9999] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <motion.div
                        className="w-1 h-1 bg-[#FF9999] rounded-full"
                        initial={{ scale: 0 }}
                        animate={controls}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Admissions - Animate from bottom */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.h3
                className="text-lg font-semibold mb-6 flex items-center gap-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <GraduationCap className="w-5 h-5 text-[#FF9999]" />
                </motion.div>
                Admissions
              </motion.h3>
              <ul className="space-y-3">
                {footerLinks.admissions.map((link, index) => (
                  <motion.li
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#FF9999] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <motion.div
                        className="w-1 h-1 bg-[#FF9999] rounded-full"
                        initial={{ scale: 0 }}
                        animate={controls}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* About & Contact - Animate from right */}
            <motion.div
              className="space-y-8"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div>
                <motion.h3
                  className="text-lg font-semibold mb-6 flex items-center gap-2"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  initial="hidden"
                  animate={controls}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Users className="w-5 h-5 text-[#FF9999]" />
                  </motion.div>
                  About School
                </motion.h3>
                <ul className="space-y-3">
                  {footerLinks.about.map((link, index) => (
                    <motion.li
                      key={link.label}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      initial="hidden"
                      animate={controls}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-[#FF9999] transition-colors text-sm flex items-center gap-2 group"
                      >
                        <motion.div
                          className="w-1 h-1 bg-[#FF9999] rounded-full"
                          initial={{ scale: 0 }}
                          animate={controls}
                          transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                          whileHover={{ scale: 1.5 }}
                        />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

{/* Social Media - Animate from right */}
<motion.div
  variants={{
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  }}
  initial="hidden"
  animate={controls}
  transition={{ duration: 0.6, delay: 1.0 }}
>
  <motion.h3
    className="text-lg font-semibold mb-4"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }}
    initial="hidden"
    animate={controls}
    transition={{ duration: 0.5, delay: 1.1 }}
  >
    Connect With Us
  </motion.h3>
  <div className="flex gap-3">
    {socialLinks.map((social, index) => {
      const Icon = social.icon;
      return (
        <motion.button
          key={social.label}
          type="button"
          onClick={(e) => e.preventDefault()}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a0a0a] to-[#1a0a0a] border border-[#8B0000]/30 flex items-center justify-center cursor-default"
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
        >
          <Icon className="w-5 h-5 text-gray-400" />
        </motion.button>
      );
    })}
  </div>
</motion.div>
            </motion.div>
          </div>

          {/* Divider with Animation */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[#8B0000]/30 to-transparent my-8"
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: 1.5 }}
          />

          {/* Bottom Section with Staggered Animations */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <motion.div
              className="text-center md:text-left"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} Emmanuel Senior School. All rights reserved.
              </p>
              <motion.p
                className="text-gray-500 text-xs mt-1"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                A CDM Emmanuel Schools Institution | Maragua, Kenya
              </motion.p>
            </motion.div>

            {/* Policy Links with Stagger */}
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Code of Conduct', href: '#' },
                { label: 'Careers', href: '#' }
              ].map((link, index) => (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  initial="hidden"
                  animate={controls}
                  transition={{ duration: 0.4, delay: 1.9 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#FF9999] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Accreditation Badge with Animation */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#8B0000]/10 to-[#000000]/10 border border-[#8B0000]/20"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5, delay: 2.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 bg-[#FF9999] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-xs text-gray-300">Ministry of Education Accredited</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button with Floating Animation */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-[#8B0000] to-[#000000] rounded-full shadow-2xl flex items-center justify-center z-40 group"
        initial={{ opacity: 0, y: 20, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
          y: showBackToTop ? [0, -8, 0] : 20,
          pointerEvents: showBackToTop ? 'auto' : 'none',
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 },
          y: showBackToTop ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          } : { duration: 0.3 }
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          className="w-5 h-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </motion.svg>
      </motion.button>
    </footer>
  );
};

export default Footer;