'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';
import { useNavigation } from '@/components/NavigationContext';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Target,
  Users,
  Heart,
  Award,
  Phone,
  Star,
  Cpu,
  TrendingUp,
  HeartHandshake,
  CircleCheckBig,
  Quote,
  UserCircle,
  ChevronDown,
  HelpCircle,
  DollarSign,
  Home
} from 'lucide-react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import animationData from '@/public/animations/Books.json';

/* ----------------------------
   Animation Variants
-----------------------------*/
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
};

const textLineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageVariantsPrimary = {
  hidden: { opacity: 0, x: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageVariantsSecondary = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const imageVariantsTertiary = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};


const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const featuresContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};


/* ----------------------------
   FAQs Section
-----------------------------*/
const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What grade levels does Emmanuel Senior School offer?",
      answer: "Emmanuel Senior School specializes in Grade 10 education as part of our senior school curriculum. We offer a comprehensive mixed boarding program specifically designed for Grade 10 students.",
      icon: BookOpen,
      category: "Academics"
    },
    {
      question: "What are the school fees structure and payment options?",
      answer: "Our fees are structured as follows: Term 1 - KSh. 24,000, Term 2 - KSh. 22,000, Term 3 - KSh. 19,000. We offer flexible payment plans and accept payments through Cooperative Bank and Equity Bank. Financial assistance options are available for qualifying students.",
      icon: DollarSign,
      category: "Fees"
    },
    {
      question: "What subjects and programs are offered?",
      answer: "We offer a comprehensive cluster including STEM subjects (Mathematics, Physics, Biology, Chemistry, Computer Science), Social Sciences (Geography, History, Business Studies), Arts (Music, Dance, Fine Arts), and Sports Science. Plus specialized programs in ICT, Agriculture, and Community Service Learning.",
      icon: Cpu,
      category: "Curriculum"
    },
    {
      question: "What boarding facilities are available?",
      answer: "We provide clean, spacious, and modern dormitories with 24/7 supervision. Our boarding facilities include study areas, recreational spaces, laundry services, and nutritious meals prepared in our school kitchen. Separate dormitories for boys and girls are available.",
      icon: Home,
      category: "Boarding"
    },
    {
      question: "How do you support students' spiritual development?",
      answer: "As a Christ-centered institution, we integrate Catholic values throughout our curriculum. Daily prayers, weekly Mass, CRE classes, and spiritual guidance sessions are part of our program. We nurture students to become morally upright individuals who transform society through faith and service.",
      icon: Heart,
      category: "Spiritual"
    },
    {
      question: "What extracurricular activities are available?",
      answer: "We offer diverse clubs including Drama Club, Debate Club, Mathematics Club, and St. John Club. Sports include volleyball, table tennis, soccer, chess, badminton, basketball, and netball. We also have music, dance, and fine arts programs for creative development.",
      icon: Users,
      category: "Activities"
    },
    {
      question: "What is the admission process?",
      answer: "Admission involves submitting an application form, previous academic records, and attending an interview. Applications are accepted throughout the year. Visit our Admissions page for detailed requirements or contact our office for guidance through the process.",
      icon: GraduationCap,
      category: "Admissions"
    },
    {
      question: "How do you identify and nurture student talents?",
      answer: "Through our comprehensive guidance and counseling program, we assess each student's strengths and interests. We provide specialized coaching, mentorship, and opportunities in sports, arts, academics, and leadership to help every student discover and develop their God-given talents.",
      icon: Target,
      category: "Development"
    },
    {
      question: "What makes Emmanuel Senior School different?",
      answer: "Our unique combination of academic excellence, spiritual foundation, affordable fees, modern facilities, and dedicated teachers sets us apart. We focus on holistic development - nurturing not just academic success but also character, values, and leadership skills for life.",
      icon: HelpCircle,
      category: "General"
    },
    {
      question: "Is transportation available for day students?",
      answer: "Yes, we provide reliable transport services for day students. Our school buses operate on designated routes in Maragua and surrounding areas. Transport fees are separate and details are available during admission. Safety and punctuality are our priorities.",
      icon: Users,
      category: "Transport"
    },
  ];

  // Split FAQs into two columns
  const column1Faqs = faqs.slice(0, 5);
  const column2Faqs = faqs.slice(5, 10);

  const accordionVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-linear-to-b from-white to-[#FFF7F7]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(#8B0000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/30"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className="w-4 h-4" />
            FREQUENTLY ASKED QUESTIONS
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          >
            <span className="block bg-linear-to-r from-[#8B0000] to-[#000000] bg-clip-text text-transparent">
              Get Answers to
            </span>
            <span className="block bg-linear-to-r from-[#000000] to-[#8B0000] bg-clip-text text-transparent">
              Common Questions
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Find quick answers to the most common questions about Emmanuel Senior School.
            Can&apos;t find what you&apos;re looking for? Contact our admissions office.
          </motion.p>
        </motion.div>

        {/* FAQs Grid - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-4">
            {column1Faqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  <motion.button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                    whileHover={{ backgroundColor: "#FFF5F5" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${isOpen ? 'bg-[#8B0000]' : 'bg-[#8B0000]/10'} group-hover:bg-[#8B0000] transition-colors duration-300`}>
                        <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-[#8B0000]'} group-hover:text-white transition-colors duration-300`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-[#8B0000] bg-[#FFE5E5] px-2 py-1 rounded-full">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#8B0000] transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      variants={iconVariants}
                      animate={isOpen ? "open" : "closed"}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-[#8B0000] group-hover:text-[#A50000] transition-colors duration-300" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={accordionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 ml-14 border-l-2 border-[#8B0000]/20">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                          <motion.div
                            className="h-0.5 bg-linear-to-r from-[#8B0000]/20 to-transparent mt-4"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {column2Faqs.map((faq, index) => {
              const Icon = faq.icon;
              const adjustedIndex = index + 5; // Offset for column 2
              const isOpen = openIndex === adjustedIndex;

              return (
                <motion.div
                  key={adjustedIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: (index + 5) * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  <motion.button
                    onClick={() => setOpenIndex(isOpen ? null : adjustedIndex)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                    whileHover={{ backgroundColor: "#FFF5F5" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${isOpen ? 'bg-[#8B0000]' : 'bg-[#8B0000]/10'} group-hover:bg-[#8B0000] transition-colors duration-300`}>
                        <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-[#8B0000]'} group-hover:text-white transition-colors duration-300`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-[#8B0000] bg-[#FFE5E5] px-2 py-1 rounded-full">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#8B0000] transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      variants={iconVariants}
                      animate={isOpen ? "open" : "closed"}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-[#8B0000] group-hover:text-[#A50000] transition-colors duration-300" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={accordionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 ml-14 border-l-2 border-[#8B0000]/20">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                          <motion.div
                            className="h-0.5 bg-linear-to-r from-[#8B0000]/20 to-transparent mt-4"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-2 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900">Still Have Questions?</h3>
              <p className="text-gray-600 mt-2">Our admissions team is ready to help you</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/contact"
                className="px-8 py-3 bg-linear-to-r from-[#8B0000] to-[#6A0000] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Admissions
              </motion.a>
              <motion.a
                href="/admissions#application-form"
                className="px-8 py-3 bg-white text-[#8B0000] border-2 border-[#8B0000] font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Prospectus
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ----------------------------
   CTA Section
-----------------------------*/

const CTASection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const animationVariants = {
    hidden: { opacity: 0, x: 30, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + (i * 0.1),
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const
      }
    })
  };

  return (
    <section className="relative py-20 overflow-hidden bg-linear-to-b from-white to-[#FFF7F7]" ref={containerRef}>


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#8B0000]/20"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          {/* Thin maroon border glow effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#8B0000]/10 rounded-3xl transition-all duration-300 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Content */}
            <motion.div
              className="p-8 pb-0 lg:p-12 lg:pr-6 flex flex-col justify-center"
              variants={contentVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >


              {/* Title */}
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="block bg-linear-to-r from-[#8B0000] to-[#000000] bg-clip-text text-transparent">
                  Shape Your Future
                </span>
                <span className="block bg-linear-to-r from-[#000000] to-[#8B0000] bg-clip-text text-transparent">
                  With Us Today
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-lg text-gray-700 mb-8 max-w-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Join Emmanuel Senior School and embark on a transformative educational journey.
                Experience academic excellence, spiritual growth, and holistic development in
                a Christ-centered environment that nurtures future leaders.
              </motion.p>

              {/* Key Points */}
              <motion.div
                className="grid grid-cols-2 gap-4 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {[
                  "✓ Grade 10 Excellence",
                  "✓ Affordable Quality Education",
                  "✓ Modern Facilities",
                  "✓ Spiritual Development"
                ].map((point, index) => (
                  <motion.div
                    key={point}
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1), duration: 0.4 }}
                  >
                    <GraduationCap className="w-4 h-4 text-[#8B0000] shrink-0" />
                    <span>{point}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Primary Button */}
                <motion.a
                  href="/admissions#application-form"
                  className="group relative overflow-hidden px-8 py-4 bg-linear-to-r from-[#8B0000] to-[#6A0000] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  variants={buttonVariants}
                  custom={0}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center gap-3 relative z-10">
                    <span>Apply Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {/* Shine effect */}
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
                </motion.a>

                {/* Secondary Button */}
                <motion.a
                  href="/contact"
                  className="group px-8 py-4 bg-white text-[#8B0000] border-2 border-[#8B0000] font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3"
                  variants={buttonVariants}
                  custom={1}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Contact Admissions</span>
                </motion.a>
              </div>


            </motion.div>

            {/* Right Animation */}
            <motion.div
              className="relative lg:p-8 flex items-center justify-center"
              variants={animationVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="relative w-full h-[300px] lg:h-full">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};



/* ----------------------------
   Hero Section
-----------------------------*/
const HeroSection = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const { isNavigating } = useNavigation();

  // Use a ref to track mounting state (doesn't trigger re-renders)
  const hasMountedRef = useRef(false);
  const [delayComplete, setDelayComplete] = useState(false);

  // Derive isReady
  const isReady = !isNavigating && isInView && delayComplete;


  const slides = [
    {
      key: 'excellence',
      icon: Award,
      eyebrow: 'Academic Excellence & Spiritual Growth',
      titleA: 'Learn to Love.',
      titleB: 'Love to Learn.',
      description: 'Emmanuel Senior School is a Christ-centered center of excellence that nurtures holistic, competent, and morally upright learners who transform society through faith, knowledge, and service.',
      bullets: [
        'Grade 10 Senior School Curriculum with mixed boarding',
        'State-of-the-art Science & Computer Laboratories',
        'Guided by Catholic values and spiritual development',
      ],
      image: '/hero-academics.png',
      imageVariants: imageVariantsPrimary,
    },
    {
      key: 'academics',
      icon: BookOpen,
      eyebrow: 'Comprehensive Educational Programs',
      titleA: 'STEM, Arts &',
      titleB: 'Sports Excellence.',
      description: 'We offer a comprehensive cluster of STEM programs, social sciences, arts, and sports science to help every student discover their God-given talents and purpose.',
      bullets: [
        'Subjects: Mathematics, Sciences, ICT, Business Studies',
        'Arts: Music, Dance, Fine Arts, Drama',
        'Sports: Basketball, Soccer, Volleyball, Athletics',
      ],
      image: '/hero-classroom.png',
      imageVariants: imageVariantsSecondary,
    },
    {
      key: 'community',
      icon: Users,
      eyebrow: 'Inclusive Community & Development',
      titleA: 'Building Future',
      titleB: 'Leaders Together.',
      description: 'Join our inclusive community that provides guidance, counseling, talent identification, and development opportunities through various clubs and extracurricular activities.',
      bullets: [
        'Drama Club, Debate Club, Mathematics Club, St. John Club',
        'Clean, spacious modern dormitories and facilities',
        'Transport services and affordable school fees structure',
      ],
      image: '/hero-community.png',
      imageVariants: imageVariantsTertiary,
    },
  ];

  const features = [
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Consistently achieving outstanding academic results with comprehensive Grade 10 curriculum and personalized learning approaches.",
      points: ["Top-performing students", "Individualized attention", "Proven track record"],
      color: "bg-gradient-to-r from-[#8B0000] to-[#A50000]",
    },
    {
      icon: TrendingUp,
      title: "Affordable Excellence",
      description: "Quality education at competitive rates with flexible payment options and transparent fee structure.",
      points: ["Competitive school fees", "Flexible payment plans", "No hidden costs"],
      color: "bg-gradient-to-r from-[#6A0000] to-[#8B0000]",
    },
    {
      icon: Users,
      title: "Dedicated Faculty",
      description: "Passionate, qualified teachers committed to student success through mentorship and professional guidance.",
      points: ["Certified educators", "Low student-teacher ratio", "Continuous training"],
      color: "bg-gradient-to-r from-[#4A0000] to-[#6A0000]",
    },
    {
      icon: Cpu,
      title: "Modern Facilities",
      description: "State-of-the-art Science & Computer Labs equipped with latest technology for hands-on learning experience.",
      points: ["Advanced laboratories", "Computer science programs", "Digital learning tools"],
      color: "bg-gradient-to-r from-[#8B0000] to-[#000000]",
    },
    {
      icon: HeartHandshake,
      title: "Inclusive Community",
      description: "A supportive environment that fosters spiritual growth, guidance, counseling, and talent development.",
      points: ["Spiritual activities", "Guidance & counseling", "Talent nurturing"],
      color: "bg-gradient-to-r from-[#6A0000] to-[#000000]",
    },
    {
      icon: Sparkles,
      title: "Holistic Development",
      description: "Comprehensive cluster of STEM, Social Sciences, Arts, Sports, and extracurricular activities.",
      points: ["STEM programs", "Arts & sports", "Clubs & societies"],
      color: "bg-gradient-to-r from-[#4A0000] to-[#8B0000]",
    },
  ];




  // Wait for loading screen to finish before starting animations
  useEffect(() => {
    if (isInView && !hasMountedRef.current) {
      hasMountedRef.current = true;
      const timer = setTimeout(() => {
        setDelayComplete(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[activeIndex];
  const Icon = slide.icon;

  // Maroon gradient colors from navbar
  const maroonGradient = "from-[#8B0000] via-[#6A0000] to-[#000000]";
  const maroonLight = "from-[#8B0000] to-[#A50000]";

  return (
    <main className="w-full">
      <div className="group relative min-h-screen w-full overflow-hidden bg-linear-to-b from-[#FFF7F7] via-[#FFF2F2] to-[#FFE5E5] lg:flex lg:flex-col lg:justify-center">
     {/* Geometric Overlay - Maroon-Black Theme */}
      <div className="absolute inset-0 opacity-[0.15] pt-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,20 L100,80 L0,100 Z" fill="url(#maroonRhombusGradient)" />
          <defs>
            <linearGradient id="maroonRhombusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B0000" />      {/* Dark Maroon */}
              <stop offset="50%" stopColor="#4A0000" />     {/* Darker Maroon */}
              <stop offset="100%" stopColor="#000000" />    {/* Black */}
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Depth Overlay - Maroon Tints */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#8B0000]/10 to-[#FFE5E5]/30" />

      {/* Top Fade - Matching Background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-[#FFF7F7] via-[#FFF7F7]/70 to-transparent" />


      {/* Arrow Controls */}
      <button
        onClick={() =>
          setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm group-hover:flex transition-all duration-300 hover:bg-white hover:scale-110 border border-[#8B0000]/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-[#8B0000]" />
      </button>

      <button
        onClick={() =>
          setActiveIndex((prev) => (prev + 1) % slides.length)
        }
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm group-hover:flex transition-all duration-300 hover:bg-white hover:scale-110 border border-[#8B0000]/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-[#8B0000]" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? `w-6 bg-linear-to-r ${maroonLight}`
                : 'w-1.5 bg-[#8B0000]/30 hover:bg-[#8B0000]/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* ----------------------------
          HERO CONTENT
      -----------------------------*/}
      <section
  ref={heroRef}
  className="group relative min-h-screen w-full overflow-hidden  pt-16"
>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* LEFT: TEXT */}
            <motion.div
              key={`content-${slide.key}`}
              variants={containerVariants}
              initial="hidden"
              animate={isReady ? "visible" : "hidden"}
              className="flex flex-col gap-6"
            >
              <motion.div
                variants={textLineVariants}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000]"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-4 h-4 text-[#8B0000]" />
                </motion.div>
                {slide.eyebrow}
              </motion.div>

              <motion.h1
                variants={textLineVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
              >
                <span className={`block bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                  {slide.titleA}
                </span>
                <span className={`block bg-linear-to-r from-[#000000] via-[#6A0000] to-[#8B0000] bg-clip-text text-transparent`}>
                  {slide.titleB}
                </span>
              </motion.h1>

              <motion.p
                variants={textLineVariants}
                className="max-w-xl text-base sm:text-lg text-gray-800 leading-relaxed"
              >
                {slide.description}
              </motion.p>

              <motion.div
                variants={textLineVariants}
                className="flex flex-col gap-3 text-sm text-gray-800"
              >
                {slide.bullets.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <Sparkles className="w-4 h-4 text-[#8B0000]" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={textLineVariants}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <motion.a
                  href="/admissions#application-form"
                  className={`inline-flex items-center gap-2 bg-linear-to-r ${maroonGradient} text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 relative overflow-hidden group`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <GraduationCap className="w-4 h-4" />
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
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
                </motion.a>

                <motion.a
                  href="#why-choose-us"
                  className="inline-flex items-center gap-2 bg-white text-[#8B0000] hover:bg-gray-50 border border-[#8B0000]/30 px-6 py-3 rounded-lg font-semibold shadow-sm transition-all duration-300 hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star className="w-4 h-4" />
                  Why Choose Us
                </motion.a>
              </motion.div>
            </motion.div>

            {/* RIGHT: IMAGE */}
            <motion.div
              key={`image-${slide.key}`}
              variants={slide.imageVariants}
              initial="hidden"
              animate={isReady ? "visible" : "hidden"}
              className="flex justify-center lg:justify-end mt-8 lg:mt-0"
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 0.5, -0.5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative w-full max-w-[500px] sm:w-[420px] lg:w-[520px] h-[400px] sm:h-[450px] lg:h-[480px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(139,0,0,0.12)]"
              >
                {/* Decorative border matching navbar */}
                <div className={`absolute inset-0 bg-linear-to-br ${maroonGradient} opacity-10 z-0`} />
                <div className="absolute inset-px rounded-3xl bg-white z-10" />

                {/* Image Container with Maroon Accents */}
                <div className="absolute inset-[2px] rounded-3xl overflow-hidden z-20">
                  <div className="absolute inset-0 bg-linear-to-br from-[#8B0000]/5 to-[#000000]/5 z-10" />

                  <Image
                    src={slide.image}
                    alt={`${slide.titleA} ${slide.titleB}`}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>
      </div>

      <section id="why-choose-us" className="relative py-8 overflow-hidden bg-linear-to-b from-[#FFE5E5]/20 via-[#FFF2F2]/10 to-[#FFF7F7] scroll-mt-32">
      {/* Subtle background pattern matching hero section */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,20 L100,80 L0,100 Z" fill="url(#whyChoosePattern)" />
          <defs>
            <linearGradient id="whyChoosePattern" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B0000" />
              <stop offset="50%" stopColor="#4A0000" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating decorative elements */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${10 + i * 15}%`,
            left: `${5 + i * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BookOpen className="w-6 h-6 text-[#8B0000]/10" />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <Target className="w-4 h-4" />
            WHY EMMANUEL SENIOR SCHOOL
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className={`bg-linear-to-r from-[#8B0000] via-[#6A0000] to-[#000000] bg-clip-text text-transparent`}>
              Excellence in Education,
            </span>
            <br />
            <span className={`bg-linear-to-r from-[#000000] via-[#6A0000] to-[#8B0000] bg-clip-text text-transparent`}>
              Excellence in Character
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            At Emmanuel Senior School, we don&apos;t just educate students - we nurture future leaders.
            Our Christ-centered approach combines academic rigor with spiritual growth, creating
            well-rounded individuals ready to transform society.
          </motion.p>
        </motion.div>

        {/* Features Grid with 6 cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={featuresContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative group"
              >
                {/* Card Container */}
                <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Animated left accent bar */}
                  <motion.div
                    className={`absolute top-0 left-0 w-1.5 h-full ${feature.color}`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  />

                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 w-14 h-14 ${feature.color} rounded-xl blur-md opacity-20`} />
                    <div className={`relative w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8B0000] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Points list */}
                  <ul className="space-y-2">
                    {feature.points.map((point, idx) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CircleCheckBig className="w-4 h-4 text-[#8B0000] shrink-0" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-transparent to-[#8B0000]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>

                {/* Floating decoration */}
                <motion.div
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    rotate: [0, 360],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-6 h-6 text-[#8B0000]/40" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </section>

    {/* Parent Testimonials Section */}
<section className="relative py-12 overflow-hidden">
  {/* Subtle maroon gradient background */}
  <div className="absolute inset-0 bg-linear-to-b from-[#FFE5E5]/20 via-[#FFF2F2]/10 to-[#FFE5E5]/5" />

  {/* Decorative subtle pattern */}
  <div className="absolute inset-0 opacity-[0.03]">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(#8B0000 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }} />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/30"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <Heart className="w-4 h-4" />
        PARENT TESTIMONIALS
      </motion.div>

      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        <span className="block bg-linear-to-r from-[#8B0000] via-[#6A0000] to-[#000000] bg-clip-text text-transparent">
          What Parents Say
        </span>
        <span className="block bg-linear-to-r from-[#000000] via-[#6A0000] to-[#8B0000] bg-clip-text text-transparent">
          About Our School
        </span>
      </motion.h2>

      <motion.p
        className="text-lg text-gray-700 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Hear from families who have experienced the Emmanuel Senior School difference firsthand.
      </motion.p>
    </motion.div>

    {/* Testimonials Grid - Using unique variant names */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Testimonial 1 */}
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -10,
          transition: { duration: 0.3 }
        }}
        className="relative group"
      >
        <div className="relative h-full p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
          {/* Quote icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.4 }}
            className="absolute -top-4 left-8"
          >
            <div className="w-12 h-12 bg-linear-to-br from-[#8B0000] to-[#A50000] rounded-xl flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Rating stars */}
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: [0, 1.2, 1], opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 + 0.6, duration: 0.4, times: [0, 0.6, 1] }}
              >
                <Star className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              </motion.div>
            ))}
          </div>

          <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
            &quot;Emmanuel Senior School has transformed my daughter both academically and spiritually. The attention to individual growth is exceptional.&quot;
          </blockquote>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#8B0000]/20">
                <div className="w-full h-full bg-linear-to-br from-[#8B0000]/10 to-[#000000]/10 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-[#8B0000]/40" />
                </div>
              </div>
            </motion.div>

            <div>
              <h4 className="font-bold text-gray-900">Mrs. Wanjiku Mwangi</h4>
              <p className="text-sm text-gray-600">Parent of Grade 10 Student</p>
              <p className="text-sm text-[#8B0000] font-medium mt-1">
                Sarah Mwangi - STEM Program
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonial 2 */}
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -10,
          transition: { duration: 0.3 }
        }}
        className="relative group"
      >
        <div className="relative h-full p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.5 }}
            className="absolute -top-4 left-8"
          >
            <div className="w-12 h-12 bg-linear-to-br from-[#8B0000] to-[#A50000] rounded-xl flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: [0, 1.2, 1], opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 + 0.7, duration: 0.4, times: [0, 0.6, 1] }}
              >
                <Star className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              </motion.div>
            ))}
          </div>

          <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
            &quot;The balance between academic excellence and character building is remarkable. My son has discovered his passion for computer science.&quot;
          </blockquote>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#8B0000]/20">
                <div className="w-full h-full bg-linear-to-br from-[#8B0000]/10 to-[#000000]/10 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-[#8B0000]/40" />
                </div>
              </div>
            </motion.div>

            <div>
              <h4 className="font-bold text-gray-900">Mr. David Ochieng</h4>
              <p className="text-sm text-gray-600">Business Owner & Parent</p>
              <p className="text-sm text-[#8B0000] font-medium mt-1">
                Kevin Ochieng - Computer Science
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonial 3 */}
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -10,
          transition: { duration: 0.3 }
        }}
        className="relative group"
      >
        <div className="relative h-full p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.6 }}
            className="absolute -top-4 left-8"
          >
            <div className="w-12 h-12 bg-linear-to-br from-[#8B0000] to-[#A50000] rounded-xl flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: [0, 1.2, 1], opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 + 0.8, duration: 0.4, times: [0, 0.6, 1] }}
              >
                <Star className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              </motion.div>
            ))}
          </div>

          <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
            &quot;As a working parent, the boarding facilities and 24/7 guidance give me peace of mind. The teachers go above and beyond.&quot;
          </blockquote>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.7 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#8B0000]/20">
                <div className="w-full h-full bg-linear-to-br from-[#8B0000]/10 to-[#000000]/10 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-[#8B0000]/40" />
                </div>
              </div>
            </motion.div>

            <div>
              <h4 className="font-bold text-gray-900">Dr. Amina Hassan</h4>
              <p className="text-sm text-gray-600">Medical Doctor & Parent</p>
              <p className="text-sm text-[#8B0000] font-medium mt-1">
                Fatima Hassan - Biology Club
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>

  </div>
</section>

<FAQsSection />
<CTASection/>

    </main>
  );
};

export default HeroSection;
