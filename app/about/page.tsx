'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen,
  Target,
  Heart,
  Users,
  Award,
  Cpu,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Trophy,
  Building,
  Microscope,
  Music,
  Palette,
  Calculator,
  Globe,
  History,
  Church,
  Briefcase,
  Dumbbell,
  Home,
  Coffee,
  Shield,
  HeartHandshake,
  Brain,
  ChevronRight,
  CheckCircle,
  Globe2,
  Phone,
  MapPin,
  TargetIcon,
  Users2,
  FlaskConical,
  Computer,
  Quote,
  Info
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Lottie from 'lottie-react';
import animationData from '@/public/animations/sports.json';

/* ----------------------------
   Animation Variants
-----------------------------*/
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
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
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

/* ----------------------------
   Data Configurations
-----------------------------*/
const subjects = [
  { icon: Calculator, name: "Mathematics", category: "Core" },
  { icon: BookOpen, name: "English & Literature", category: "Languages" },
  { icon: Globe, name: "Kiswahili & Fasihi", category: "Languages" },
  { icon: Microscope, name: "Physics", category: "Sciences" },
  { icon: FlaskConical, name: "Biology", category: "Sciences" },
  { icon: FlaskConical, name: "Chemistry", category: "Sciences" },
  { icon: Computer, name: "Computer Science", category: "Technology" },
  { icon: Cpu, name: "ICT", category: "Technology" },
  { icon: Coffee, name: "Agriculture", category: "Applied Sciences" },
  { icon: HeartHandshake, name: "Community Service Learning", category: "Service" },
  { icon: Globe2, name: "Geography", category: "Humanities" },
  { icon: History, name: "History & Citizenship", category: "Humanities" },
  { icon: Church, name: "CRE", category: "Religious Studies" },
  { icon: Briefcase, name: "Business Studies", category: "Commerce" },
  { icon: Trophy, name: "Sports & Recreation", category: "Physical" },
  { icon: Music, name: "Music & Dance", category: "Arts" },
  { icon: Dumbbell, name: "Physical Education", category: "Physical" },
  { icon: Palette, name: "Fine Arts", category: "Arts" },
  { icon: Home, name: "Home Science", category: "Applied Sciences" },
];

const developmentOpportunities = [
  {
    category: "Clubs & Societies",
    items: [
      { icon: Award, name: "Drama Club", description: "Creative expression through theater" },
      { icon: Brain, name: "Debate Club", description: "Critical thinking & public speaking" },
      { icon: Shield, name: "St. John Club", description: "First aid & community service" },
      { icon: Calculator, name: "Mathematics Club", description: "Problem solving & competitions" },
    ]
  },
  {
    category: "Sports Programs",
    items: [
      { icon: Trophy, name: "Volleyball", description: "Team sports & competition" },
      { icon: Trophy, name: "Table Tennis", description: "Individual skill development" },
      { icon: Trophy, name: "Soccer", description: "Football excellence & teamwork" },
      { icon: Trophy, name: "Chess", description: "Strategic thinking & tournaments" },
      { icon: Trophy, name: "Badminton", description: "Racket skills & fitness" },
      { icon: Trophy, name: "Basketball", description: "Court sports & coordination" },
      { icon: Trophy, name: "Netball", description: "Team strategy & athletics" },
    ]
  }
];

const facilities = [
  {
    image: "/facilities/transport.png",
    title: "Transport Services",
    description: "Safe & reliable transportation for authorized school trips and off-school actives",
    features: ["GPS tracked buses", "Certified drivers", "Regular maintenance"]
  },
  {
    image: "/facilities/classroom.jpg",
    title: "Modern Classrooms",
    description: "Digital classrooms with interactive learning technology",
    features: ["Smart boards", "Audiovisual equipment", "Ergonomic furniture"]
  },
  {
    image: "/facilities/labs.png",
    title: "Science & Computer Labs",
    description: "State-of-the-art laboratories for practical learning",
    features: ["Modern equipment", "Safety certified", "Internet connectivity"]
  },
  {
    image: "/facilities/library.jpg",
    title: "Well-equipped Library",
    description: "Comprehensive digital & physical learning resource center",
    features: ["E-books access", "Quiet study zones", "Research databases"]
  },
  {
    image: "/facilities/counseling.jpg",
    title: "Counselling Services",
    description: "Professional guidance and psychological support",
    features: ["Career counseling", "Academic support", "Personal development"]
  },
  {
    image: "/facilities/dormitory.png",
    title: "Modern Dormitories",
    description: "Clean, spacious boarding facilities with 24/7 supervision",
    features: ["HVAC enabled", "Study areas", "Recreational spaces"]
  }
];

const schoolLeadership = [
  {
    name: "Bishop",
    role: "Rev. James Wainaina",
    description: "\"We nurture children to become what God intends, supporting their academia in a Christian way.\"",
    image: "/bishop.png"
  },
  {
    name: "School Director",
    role: "Father Martin",
    description: "\"We provide strategic leadership that fosters disciplined learning, strong values, and academic growth rooted in faith.\""
  },
  {
    name: "Principal SSS",
    role: "Madam Minslet",
    description: "\"Our focus is academic excellence, character development, and preparing students to become responsible, confident lifelong learners.\""
  },
  {
    name: "Principal JSS",
    role: "Sir James",
    description: "\"We guide students through a supportive learning environment that builds curiosity, discipline, and a strong foundation for future success.\""
  },
  {
    name: "BOM Chair",
    role: "Dr. Ruth Wambui",
    description: "\"Our duty is to guide students to their destiny, moulding character and spirituality through personalized education.\""
  }
];


const LeaderAvatar = ({ name, image }: { name: string; image?: string }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {image && !imgError ? (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-[#8B0000]/20 to-[#000000]/20 flex items-center justify-center">
          <GraduationCap className="w-16 h-16 text-[#8B0000]/40" />
        </div>
      )}
    </>
  );
};

/* ----------------------------
   Main About Page Component
-----------------------------*/
export default function AboutPage() {
  const maroonGradient = "bg-gradient-to-r from-[#8B0000] via-[#6A0000] to-[#000000]";
  const maroonLight = "from-[#8B0000] to-[#A50000]";
  const maroonDark = "from-[#6A0000] to-[#000000]";
  const leaderImageSize = "w-38 h-38"; // Control the leadership image size here

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-[#FFF7F7] to-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 lg:min-h-screen flex items-center overflow-hidden bg-linear-to-b from-[#FFF7F7] via-[#FFF2F2] to-[#FFE5E5]"
      >
        {/* Geometric Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,15 L100,85 L0,100 Z" fill="url(#aboutGradient)" />
            <defs>
              <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B0000" />
                <stop offset="50%" stopColor="#4A0000" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#8B0000] mb-2 px-5 py-2 rounded-full bg-[#FFE5E5]/40"
            >
              <Church className="w-5 h-5" />
              ABOUT EMMANUEL SENIOR SCHOOL
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block bg-linear-to-r from-[#8B0000] via-[#6A0000] to-[#000000] bg-clip-text text-transparent">
                A Faithful Center
              </span>
              <span className="block bg-linear-to-r from-[#000000] via-[#6A0000] to-[#8B0000] bg-clip-text text-transparent">
                of Educational Excellence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-700 max-w-xl leading-relaxed"
            >
              Emmanuel Senior School is an extension of CDM Emmanuel Schools, proudly established in Maragua, Kenya,
              as a fully-fledged mixed boarding institution dedicated to Grade 10 senior school education.
              Led by a dedicated Principal and supported by highly trained teachers under the visionary management
              of the Emmanuel Schools Director.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-linear-to-r from-[#8B0000] to-[#6A0000] text-white hover:shadow-xl"
              >
                <Link href="/admissions#application-form" className="flex items-center gap-2">
                  Apply Now
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#8B0000] text-[#8B0000]">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative block"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-[300px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50"
            >
              <Image
                src="/hero-community.png"
                alt="Emmanuel Senior School Students"
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

      {/* Vision & Mission Section */}
      <section className="py-20 bg-linear-to-b from-white to-[#FFF7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <Card className="h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden bg-linear-to-br from-white to-[#FFF5F5]">
                <CardContent className="p-8 lg:p-10">
                  <div className="absolute top-6 right-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <TargetIcon className="w-12 h-12 text-[#8B0000]/20" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#8B0000] to-[#A50000]">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-[#8B0000] via-[#6A0000] to-[#000000] rounded-full" />
                    <blockquote className="pl-6">
                      <p className="text-xl text-gray-800 leading-relaxed italic">
                        &quot;To be a Christ-centered center of excellence nurturing holistic, competent, and morally upright learners who transform society through faith, knowledge, and service.&quot;
                      </p>
                    </blockquote>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-[#8B0000]" />
                        <span className="text-sm font-medium text-gray-700">Christ-centered Excellence</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#8B0000]" />
                        <span className="text-sm font-medium text-gray-700">Moral Integrity</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-[#8B0000]" />
                        <span className="text-sm font-medium text-gray-700">Holistic Development</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HeartHandshake className="w-5 h-5 text-[#8B0000]" />
                        <span className="text-sm font-medium text-gray-700">Service to Society</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <Card className="h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden bg-linear-to-br from-white to-[#FFF5F5]">
                <CardContent className="p-8 lg:p-10">
                  <div className="absolute top-6 right-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Heart className="w-12 h-12 text-[#8B0000]/20" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-linear-to-r from-[#6A0000] to-[#8B0000]">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-[#000000] via-[#6A0000] to-[#8B0000] rounded-full" />
                    <blockquote className="pl-6">
                      <p className="text-xl text-gray-800 leading-relaxed">
                        &quot;Emmanuel Senior School, guided by Catholic values, is committed to providing quality education through empowering learners to discover their God-given talents, uphold integrity, and serve humanity with purpose and compassion.&quot;
                      </p>
                    </blockquote>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#8B0000]" />
                        <span className="text-sm text-gray-600">Catholic Values</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#8B0000]" />
                        <span className="text-sm text-gray-600">Talent Discovery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#8B0000]" />
                        <span className="text-sm text-gray-600">Integrity & Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#8B0000]" />
                        <span className="text-sm text-gray-600">Quality Education</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Offered Section */}
      <section className="py-6 bg-linear-to-b from-[#FFF7F7] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <BookOpen className="w-4 h-4" />
              COMPREHENSIVE CURRICULUM
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                Subjects Offered
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our diverse curriculum is designed to provide a balanced education that prepares students for academic success and personal growth.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <motion.div
                  key={subject.name}
                  variants={scaleIn}
                  className="group"
                >
                  <Card className="h-full border border-gray-200 hover:border-[#8B0000]/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-linear-to-br from-[#8B0000]/10 to-[#000000]/10 group-hover:from-[#8B0000] group-hover:to-[#6A0000] transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#8B0000] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-[#8B0000] bg-[#FFE5E5] px-2 py-1 rounded-full">
                              {subject.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#8B0000] transition-colors duration-300">
                            {subject.name}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Development Opportunities Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <Trophy className="w-4 h-4" />
              BEYOND THE CLASSROOM
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                Development Opportunities
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We provide diverse platforms for students to explore their interests, develop talents, and build leadership skills.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {developmentOpportunities.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: categoryIndex * 0.2 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-linear-to-br from-[#8B0000]/5 to-transparent rounded-full blur-xl" />

                <Card className="relative h-full border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`p-2 rounded-lg bg-linear-to-r ${
                        categoryIndex === 0 ? maroonLight : maroonDark
                      }`}>
                        {categoryIndex === 0 ? (
                          <Users className="w-6 h-6 text-white" />
                        ) : (
                          <Trophy className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {category.category}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {category.items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="p-2 rounded-lg bg-linear-to-br from-[#8B0000]/10 to-[#000000]/10">
                              <Icon className="w-5 h-5 text-[#8B0000]" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        );
                      })}
                    </div>
                   {category.category === "Clubs & Societies" && (
                    <div className="mt-14 flex justify-center items-center">
                      {/* Desktop & Tablet (unchanged) */}
                      <div className="hidden sm:block w-90 h-32">
                        <Lottie animationData={animationData} loop />
                      </div>

                      {/* Mobile only (taller to prevent clipping) */}
                      <div className="block sm:hidden w-90 h-44">
                        <Lottie
                          animationData={animationData}
                          loop
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                  )}

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Resources Section */}
      <section className="py-20 bg-linear-to-b from-white to-[#FFF7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <Building className="w-4 h-4" />
              WORLD-CLASS INFRASTRUCTURE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                Facilities & Resources
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We invest in modern infrastructure to create an optimal learning environment for our students.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {facilities.map((facility) => {
              return (
                <motion.div
                  key={facility.title}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <CardContent className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-[#8B0000] mb-3 group-hover:text-gray-900 transition-colors duration-300 -mt-10">
                        {facility.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                        {facility.description}
                      </p>
                      <div className="space-y-2 mt-auto">
                        {facility.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#8B0000] shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* School Leadership Section */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] mb-4 px-4 py-2 rounded-full bg-[#FFE5E5]/50">
              <Users2 className="w-4 h-4" />
              MEET OUR LEADERSHIP
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
                Guided by Excellence
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our school is led by experienced professionals committed to educational excellence and student success.
            </p>
          </motion.div>

          {/* Improved Grid Layout - All cards same height */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {schoolLeadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                variants={fadeInUp}
                custom={index}
                className="group h-full w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
              >
                <Card className="h-[460px] border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                  <CardContent className="p-8 text-center flex flex-col flex-grow">

                    {/* Image/Icon Container */}
                    <div className={`relative mx-auto mb-6 ${leaderImageSize}`}>
                      {leader.image ? (
                        <>
                          <div className="absolute inset-0 bg-linear-to-br from-[#8B0000] to-[#000000] rounded-full opacity-10" />
                          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <LeaderAvatar name={leader.name} image={leader.image} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/10 to-[#000000]/10 rounded-full" />
                          <div className="relative w-full h-full rounded-full flex items-center justify-center">
                            <div className="w-26 h-26 rounded-full bg-linear-to-br from-[#8B0000] to-[#6A0000] flex items-center justify-center shadow-lg">
                              <Quote className="w-14 h-14 text-white" />
                            </div>
                          </div>
                          {/* Decorative elements */}
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFE5E5] rounded-full" />
                          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-[#FFE5E5] rounded-full" />
                        </>
                      )}
                    </div>

                    {/* Leader Info - Flex column with consistent spacing */}
                    <div className="flex-grow flex flex-col">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                      </div>

                      <div className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#8B0000] bg-[#FFE5E5] px-4 py-2 rounded-full mb-4 mx-auto">
                        {leader.role}
                      </div>

                      <div className="flex-grow flex items-center">
                        <p className="text-gray-600 leading-relaxed italic text-base mx-auto">
                          {leader.description}
                        </p>
                      </div>


                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>

{/* CTA Section */}
<section className="relative py-20 overflow-hidden">
  <div className="absolute inset-0 bg-linear-to-br from-[#8B0000]/5 via-transparent to-[#000000]/5" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      className="bg-linear-to-br from-white to-[#FFF5F5] rounded-3xl shadow-2xl overflow-hidden border border-[#8B0000]/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="p-12 lg:p-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className={`bg-linear-to-r ${maroonGradient} bg-clip-text text-transparent`}>
              Ready to Join Our Community?
            </span>
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Discover how Emmanuel Senior School can help your child achieve academic excellence, personal growth, and spiritual development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className={`${maroonGradient} text-white px-8 py-6 text-lg hover:shadow-xl transition-all duration-300`}
            >
              <Link href="/admissions#application-form">
                <GraduationCap className="w-5 h-5 mr-2" />
                Apply for Admission
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 py-6 text-lg border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10"
            >
              <Link href="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Schedule a Visit
              </Link>
            </Button>
          </div>
        </div>

        {/* Google Maps Embed with your preferred design */}
        <div className="relative min-h-[300px] lg:min-h-0">
          <div className="absolute inset-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.199749241805!2d37.1596715757216!3d-0.8259480999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828a50c661c54f1%3A0xeb3eb9cbb710f5a0!2sBeatitudes%20Girls%20Secondary%20School!5e0!3m2!1sen!2ske!4v1736207200000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Emmanuel Senior School Location"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>

          {/* Map Overlay Info */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg w-[260px] max-w-[210px]">

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#8B0000] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Our Location</p>
                <p className="text-xs text-gray-600">Emmanuel Senior School</p>
                <p className="text-xs text-gray-600 italic">(formerly Beatitude Girls)</p>

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