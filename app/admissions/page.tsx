'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Download,
  FileText,
  BookOpen,
  GraduationCap,
  Scale,
  CreditCard,
  User,
  Users,
  Heart,
  Church,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Banknote,
  BookCheck,
  CheckCircle,
  ChevronRight,
  FileCheck,
  Shield,
  Award,
  FileSpreadsheet,
  FileDown
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

/* ----------------------------
   Animation Variants
-----------------------------*/
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

/* ----------------------------
   Data Configurations
-----------------------------*/
const requirements = {
  boys: [
    "Two pyjamas (warm materials)",
    "One large towel",
    "5 new innerwears",
    "3 cotton handkerchiefs",
    "One pair of black leather shoes – Bata Shoes",
    "One pair of black sport shoes for P.E and bathroom slippers",
    "One storage box with pad-lock key",
    "Two extra pad-locks",
    "Two washing buckets",
    "Tooth brush, tooth-paste, bathing soap and laundry soap",
    "A Pillow",
    "A pair of Black Gumboots",
    "Umbrella or black rain coat",
    "Toilet papers for full term",
    "2 blankets",
    "2 sets of pegs",
    "White and black sewing threads and 2 needles",
    "Simple black sandals (plain colour without decorations)",
    "Hand brush",
    "A copy of signed School rules and regulations"
  ],
  girls: [
    "Two night dresses (warm materials)",
    "Two large towels",
    "5 new panties, 5 bras and 5 baikas",
    "3 cotton handkerchiefs",
    "One pair of black leather shoes (not high heels) – Bata Shoes",
    "One pair of black sport shoes for P.E and bathroom slippers",
    "One storage box with pad-lock key",
    "Two extra pad-locks",
    "Two washing buckets",
    "Tooth brush, tooth-paste, bathing soap, laundry soap and sanitary towels",
    "A Pillow",
    "A pair of Black Gumboots",
    "Umbrella or black rain coat",
    "Toilet papers for full term",
    "2 blankets",
    "2 sets of pegs",
    "White and black sewing threads and 2 needles",
    "Simple black sandals (plain colour without decorations)",
    "Hand brush",
    "A copy of signed School rules and regulations"
  ],
  books: [
    "Revised Standard Version Bible",
    "Comprehensive Secondary School Atlas",
    "Pens",
    "School Geometrical set",
    "Oxford/Cambridge Advanced Learner's Dictionary",
    "Kamusi ya Kiswahili Sanifu by Taasisi ya Uchunguzi wa Kiswahili",
    "K.N.E.C Mathematics Table – 7th Edition",
    "Fani ya Fasihi Simulizi Oxford by A. Matel",
    "Electronic Calculator (Scientific)",
    "5 graph exercise books (A4 Size)",
    "2 squared exercise books 200 pages (A4 Size)",
    "13 ruled exercise books 200 pages (A4 Size)"
  ],
  documents: [
    "Copy of KJSEA Results Slip",
    "Copy of Birth certificate",
    "One passport size photograph of the student",
    "Copy of Parent/Guardian identity card (ID)",
    "Medical certificate from Catholic/Government Hospital"
  ]
};

const uniformItems = [
  "2 Black Skirts/Trousers",
  "2 Blue Shirts",
  "1 Black with Red Stripe Pullover",
  "1 Black with Red Stripe Sleeveless Pullover",
  "1 T-shirt with School Name",
  "1 Red Acrylic Bedcover",
  "1 Red Tie",
  "3 Pairs White Socks",
  "1 Track Suit",
  "1 PC Mattress 3''x 2.5'' (High Density)",
  "Utensils (Cup, Spoon & Plate)",
  "1 Jumper",
  "1 Sport Kit",
  "2 Pairs of Bed Sheets (Light Blue)",
  "1 Red Blazer",
  "Uniform Branding",
  "School ID"
];

const feeStructure = [
  { term: "TERM 1", boarding: "13,000.00", tuition: "11,000.00", special: "0.00", total: "24,000.00" },
  { term: "TERM 2", boarding: "11,000.00", tuition: "9,000.00", special: "2,000.00", total: "22,000.00" },
  { term: "TERM 3", boarding: "10,000.00", tuition: "7,000.00", special: "2,000.00", total: "19,000.00" }
];

const bankAccounts = [
  {
    bank: "Cooperative Bank",
    branch: "Murang'a Branch",
    name: "CDM Emmanuel Senior School",
    number: "01128489997700"
  },
  {
    bank: "Equity Bank",
    branch: "Murang'a Branch",
    name: "CDM Emmanuel Senior School",
    number: "0220266323999"
  },
  {
    bank: "Equity Bank",
    branch: "Uniform Account",
    name: "CDM Emmanuel Uniform",
    number: "0220269528184",
    purpose: "Uniform Payment - Ksh. 22,000"
  }
];

const contactInfo = [
  { icon: Phone, label: "Phone Numbers", value: ["0722 489 809", "0723 503 918", "0799 852 688"] },
  { icon: Mail, label: "Email", value: ["cdmemmanuelseniorschool@gmail.com"] },
  { icon: MapPin, label: "Location", value: ["Maragua, 3 Kms off Murang'a Road"] }
];

/* ----------------------------
   Main Admissions Page Component
-----------------------------*/
export default function AdmissionsPage() {
  const maroonGradient = "bg-linear-to-r from-[#8B0000] via-[#6A0000] to-[#000000]";
  const maroonLight = "from-[#8B0000] to-[#A50000]";
  const maroonDark = "from-[#6A0000] to-[#000000]";

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/documents/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Check for hash in URL and scroll to it after loading screen finishes
    if (window.location.hash) {
      // First, scroll to top immediately to reset any inherited scroll position
      window.scrollTo(0, 0);

      const scrollToElement = () => {
        const element = document.querySelector(window.location.hash);
        if (!element) return;

        // Wait for multiple frames to ensure layout is complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Dynamically get navbar height - try multiple selectors
              const navbarContainer = document.querySelector('[class*="fixed"][class*="top-0"]') as HTMLElement;
              const navbar = navbarContainer?.querySelector('nav');
              const navbarHeight = navbar ? navbar.getBoundingClientRect().height : (navbarContainer ? navbarContainer.getBoundingClientRect().height : 120);

              // Get the actual position of the element relative to document
              const rect = element.getBoundingClientRect();
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const elementTop = rect.top + scrollTop;

              // Calculate offset to position title well below navbar with more spacing
              // Add extra offset to ensure hero section is completely hidden
              const offset = navbarHeight + 50; // Increased spacing for better visibility
              const targetPosition = elementTop - offset;

              window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
              });

              // Double-check after a short delay and adjust if needed
              setTimeout(() => {
                const currentRect = element.getBoundingClientRect();
                const currentNavbarContainer = document.querySelector('[class*="fixed"][class*="top-0"]') as HTMLElement;
                const currentNavbar = currentNavbarContainer?.querySelector('nav');
                const currentNavbarHeight = currentNavbar ? currentNavbar.getBoundingClientRect().height : (currentNavbarContainer ? currentNavbarContainer.getBoundingClientRect().height : 120);
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const currentElementTop = currentRect.top + currentScrollTop;
                const currentTargetPosition = currentElementTop - currentNavbarHeight - 50;

                // If element is still too high (hero section visible), scroll again
                if (currentRect.top < currentNavbarHeight + 80) {
                  window.scrollTo({
                    top: Math.max(0, currentTargetPosition),
                    behavior: 'smooth'
                  });
                }
              }, 600);
            });
          });
        });
      };

      // Wait for loading screen to finish, then wait for page to be fully rendered
      const timer = setTimeout(() => {
        scrollToElement();
      }, 2000); // Increased delay to ensure page is fully rendered

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#FFF7F7] to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:min-h-[70vh] flex items-center overflow-hidden bg-linear-to-b from-[#FFF7F7] via-[#FFF2F2] to-[#FFE5E5]">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,20 L100,80 L0,100 Z" fill="url(#admissionsGradient)" />
            <defs>
              <linearGradient id="admissionsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B0000" />
                <stop offset="50%" stopColor="#4A0000" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-3 text-sm font-semibold text-[#8B0000] mb-2 px-5 py-2 rounded-full bg-[#FFE5E5]/40"
              >
                <GraduationCap className="w-5 h-5" />
                ADMISSIONS 2026
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="block bg-linear-to-r from-[#8B0000] via-[#6A0000] to-[#000000] bg-clip-text text-transparent">
                  Begin Your Journey
                </span>
                <span className="block bg-linear-to-r from-[#000000] via-[#6A0000] to-[#8B0000] bg-clip-text text-transparent">
                  at Emmanuel Senior School
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative pl-6 mt-8"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-[#8B0000] to-[#000000] rounded-full" />
                <blockquote className="italic text-gray-700 text-lg">
                  &quot;Welcome to a new and exciting chapter of your journey! As you step into Grade 10,
                  may you embrace learning with curiosity, love to learn and learn to love...&quot;
                  <footer className="mt-4 text-gray-900 font-semibold">
                    — Fr. Martin
                  </footer>
                </blockquote>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50"
              >
                <Image
                  src="/hero.png"
                  alt="Emmanuel Senior School Campus"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#8B0000]/20 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Application Form Section */}
      <section id="application-form" className="py-20 bg-linear-to-b from-white to-[#FFF7F7] scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <FileText className="w-4 h-4" />
              ADMISSION PROCESS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                Application Form
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Complete your admission process by downloading and submitting the official application form
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#8B0000] to-[#A50000]">
                      <FileCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Reporting Dates</h3>
                      <p className="text-gray-600">12th – 14th January 2026</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5]">
                      <h4 className="font-semibold text-gray-900 mb-2">Important Notes:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Admission Fee (Payable Once): <strong>KSh. 5,000</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">All banking slips must be brought on opening day</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Late reporting requires parental accompaniment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#6A0000] to-[#8B0000]">
                      <FileSpreadsheet className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Required Documents</h3>
                  </div>
                  <div className="space-y-2">
                    {requirements.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#8B0000]" />
                        <span className="text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="border-0 shadow-2xl overflow-hidden h-full">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-linear-to-r from-[#8B0000] to-[#6A0000] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileDown className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Application Form</h3>
                    <p className="text-gray-600">Complete and submit the official admission form</p>
                  </div>

                  <div className="space-y-6">
                    <Button
                      onClick={() => handleDownload('admission-form.pdf')}
                      className={`w-full py-6 ${maroonGradient} text-white hover:shadow-xl transition-all duration-300 cursor-pointer`}
                      size="lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Admission Form (PDF)
                    </Button>

                    <div className="p-4 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5]">
                      <h4 className="font-semibold text-gray-900 mb-3">Form Includes:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#8B0000]" />
                          <span className="text-sm text-gray-700">Student Details</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#8B0000]" />
                          <span className="text-sm text-gray-700">Parent Information</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookCheck className="w-4 h-4 text-[#8B0000]" />
                          <span className="text-sm text-gray-700">Academic History</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-[#8B0000]" />
                          <span className="text-sm text-gray-700">Medical Certificate</span>
                        </div>
                      </div>
                    </div>
                    <div>
                                          <div className="text-center mb-8">

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Rules Document</h3>
                    <p className="text-gray-600">Download the full school rules and regulations</p>
                  </div>

                  <div className="space-y-6">
                    <Button
                      onClick={() => handleDownload('school-rules.pdf')}
                      className={`w-full py-6 ${maroonGradient} text-white hover:shadow-xl transition-all duration-300 cursor-pointer`}
                      size="lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download School Rules (PDF)
                    </Button>

                    <div className="p-4 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5] -mb-8 -mt-2">
                      <h4 className="font-semibold text-gray-900 ">Important Notes:</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>• Make <strong>two copies</strong> of the signed rules</p>

                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-linear-to-b from-[#FFF7F7] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <CheckCircle className="w-4 h-4" />
              ADMISSION REQUIREMENTS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                Required Items
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Boys Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#8B0000] to-[#A50000]">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">For Boys</h3>
                  </div>
                  <div className="space-y-3">
                    {requirements.boys.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#8B0000] mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Girls Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#6A0000] to-[#8B0000]">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">For Girls</h3>
                  </div>
                  <div className="space-y-3">
                    {requirements.girls.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#8B0000] mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5]">
                    <p className="text-sm text-gray-700 font-medium">
                      <strong>Note:</strong> Girls should plait black braids tied at center back or keep hair short
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Books & Documents */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#000000] to-[#6A0000]">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Books & Documents</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Required Books:</h4>
                      <div className="space-y-2">
                        {requirements.books.map((book, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <BookOpen className="w-4 h-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{book}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-5 h-5 text-[#8B0000]" />
                        <h4 className="font-semibold text-gray-900">Additional Notes:</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Annual book fund covers recommended textbooks</li>
                        <li>• Branded exercise books purchased from school secretary</li>
                        <li>• All items must be clearly labeled (preferably embroidered)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Uniform Section */}
      <section className="py-20 bg-linear-to-b from-white to-[#FFF7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <Award className="w-4 h-4" />
              SCHOOL UNIFORM
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                Official School Attire
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              All school uniforms are purchased directly from the school to ensure quality and standardization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Uniform Images */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-8">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                  <Image
                    src="/uniform/boys-uniform.jpeg"
                    alt="Boys School Uniform"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white font-semibold">
                    Boys Uniform
                  </div>
                </div>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                  <Image
                    src="/uniform/girls-uniform.jpeg"
                    alt="Girls School Uniform"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white font-semibold">
                    Girls Uniform
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Uniform Details */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Uniform Package Includes:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {uniformItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-[#8B0000] flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl overflow-hidden bg-linear-to-br from-[#1a0a0a] via-[#2a0a0a] to-[#000000] text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#8B0000] to-[#6A0000]">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Uniform Payment</h3>
                      <p className="text-gray-300">Ksh. 22,000 payable separately</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300"><strong>Bank:</strong> Equity Bank</p>
                    <p className="text-gray-300"><strong>Account Name:</strong> CDM Emmanuel Uniform</p>
                    <p className="text-gray-300"><strong>Account Number:</strong> 0220269528184</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Fees Section */}
      <section className="py-20 bg-linear-to-b from-[#FFF7F7] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <Banknote className="w-4 h-4" />
              FEE STRUCTURE 2026
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                School Fees
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Fee Table */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-[#FFF7F7]">VOTEHEAD</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-[#FFF7F7]">TERM 1</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-[#FFF7F7]">TERM 2</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-[#FFF7F7]">TERM 3</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">Boarding Facilities & Stores</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">13,000.00</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">11,000.00</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">10,000.00</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">Tuition</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">11,000.00</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">9,000.00</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">7,000.00</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">Special Academic Program</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">0.00</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">2,000.00</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">2,000.00</td>
                        </tr>
                        <tr className="bg-linear-to-r from-[#8B0000]/5 to-[#000000]/5">
                          <td className="py-3 px-4 font-bold text-gray-900">TOTAL</td>
                          <td className="py-3 px-4 font-bold text-[#8B0000]">24,000.00</td>
                          <td className="py-3 px-4 font-bold text-[#8B0000]">22,000.00</td>
                          <td className="py-3 px-4 font-bold text-[#8B0000]">19,000.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5]">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Admission Fee (Payable Once) – KSh. 5,000
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Banking Information */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#8B0000] to-[#A50000]">
                      <Banknote className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Payment Instructions</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Make direct deposits of school fees and admission fees into either of the school accounts and bring the bank slip to school.
                    </p>
                    <div className="space-y-4">
                      {bankAccounts.map((account, index) => (
                        <div key={index} className="p-4 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5]">
                          <h4 className="font-semibold text-gray-900 mb-2">{account.bank}</h4>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p><strong>Branch:</strong> {account.branch}</p>
                            <p><strong>Account Name:</strong> {account.name}</p>
                            <p><strong>Account Number:</strong> {account.number}</p>
                            {account.purpose && (
                              <p className="text-[#8B0000] font-medium">{account.purpose}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Rules Section */}
      <section className="py-20 bg-linear-to-b from-white to-[#FFF7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <Scale className="w-4 h-4" />
              SCHOOL REGULATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                Rules & Regulations
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our comprehensive rules ensure a disciplined, safe, and conducive learning environment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Rules Categories */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl overflow-hidden h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Key Regulations</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#8B0000]" />
                        Attendance & Punctuality
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• School schedule strictly observed</li>
                        <li>• Maximum reporting time: 4:00 PM on opening days</li>
                        <li>• Late reporting requires parental accompaniment</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#8B0000]" />
                        Uniform & Cleanliness
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Full school uniform required at all times</li>
                        <li>• No modifications to uniform allowed</li>
                        <li>• No bangles, necklaces, makeup, or tattoos</li>
                        <li>• Hair must be simple and well-maintained</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <BookCheck className="w-5 h-5 text-[#8B0000]" />
                        Academic Atmosphere
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Silence during prep and class periods</li>
                        <li>• Class attendance is compulsory</li>
                        <li>• No cheating in examinations</li>
                        <li>• High discipline and performance expected</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rules Download */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-linear-to-r from-[#8B0000] to-[#6A0000] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileDown className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Rules Document</h3>
                    <p className="text-gray-600">Download the full school rules and regulations</p>
                  </div>

                  <div className="space-y-6">
                    <Button
                      onClick={() => handleDownload('school-rules.pdf')}
                      className={`w-full py-6 ${maroonGradient} text-white hover:shadow-xl transition-all duration-300`}
                      size="lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download School Rules (PDF)
                    </Button>

                    <div className="p-4 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5]">
                      <h4 className="font-semibold text-gray-900 mb-3">Important Notes:</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>• Make <strong>two copies</strong> of the signed rules</p>
                        <p>• One copy for parent, one for student, one for school office</p>
                        <p>• Both parent and student must sign the rules</p>
                        <p>• Rules cover general behavior, restricted areas, and parent responsibilities</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#8B0000]/5 via-transparent to-[#000000]/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-white to-[#FFF5F5] rounded-3xl shadow-2xl overflow-hidden border border-[#8B0000]/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                    Ready to Apply?
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Begin your educational journey at Emmanuel Senior School. Download the application form today and take the first step towards academic excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => handleDownload('admission-form.pdf')}
                    className={`${maroonGradient} text-white px-8 py-6 text-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Application Form
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="px-8 py-6 text-lg border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10"
                  >
                    <Link href="/contact">
                      <Phone className="w-5 h-5 mr-2" />
                      Contact Admissions
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[300px] lg:min-h-0 bg-linear-to-br from-[#8B0000]/10 to-[#000000]/10">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <GraduationCap className="w-16 h-16 text-[#8B0000]/30 mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-gray-900">Reporting Dates</p>
                      <p className="text-gray-600">12th – 14th January 2026</p>
                      <p className="text-sm text-gray-500 mt-4">Emmanuel Senior School</p>
                      <p className="text-sm text-gray-500">A Christ-centered center of excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}