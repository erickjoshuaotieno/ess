'use client';

import { motion } from 'framer-motion';
import { ChevronDownCircle } from "lucide-react";
import { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Users,
  Shield,
  Globe,
  School,
  BookOpen,
  GraduationCap,
  Heart
} from 'lucide-react';
import Image from 'next/image';

import Lottie from 'lottie-react';
import contactAnimation from '@/public/animations/Contact Us.json';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentName: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
const [countdownActive, setCountdownActive] = useState(false);

// Add this useEffect for the countdown timer
useEffect(() => {
  let interval: NodeJS.Timeout;

  if (countdownActive && countdown !== null) {
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev !== null ? prev - 1 : null);
      }, 1000);
    } else {
      setCountdownActive(false);
      setCountdown(null);
    }
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [countdownActive, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     // Start the 10-second countdown
    setCountdown(10);
    setCountdownActive(true);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contacts', {  // <- relative path works in production
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parent_name: formData.name,
          email: formData.email,
          student_name: formData.studentName,
          phone_number: formData.phone,
          inquiry_type: formData.inquiryType,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', studentName: '', phone: '', inquiryType: '', message: '' });
        setCountdownActive(false);  // Add this
        setCountdown(null);         // Add this
      } else {
        setSubmitError(data.error || 'An unexpected error occurred. Please try again.');
        setCountdownActive(false);  // Add this
        setCountdown(null);         // Add this
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setSubmitError('Could not connect to the server. Please check your connection and try again.');
      setCountdownActive(false);  // Add this
      setCountdown(null);         // Add this
    } finally {
      setIsSubmitting(false);
    }
  };




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const inquiryTypes = [
    'Admissions Inquiry',
    'School Fees Information',
    'Academic Programs',
    'Boarding Facilities',
    'Extracurricular Activities',
    'Spiritual Programs',
    'Schedule a Visit',
    'Transport Services',
    'General Information'
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF7F7] to-[#FFF2F2] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl shadow-[#8B0000]/10 p-12 border border-[#8B0000]/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-[#8B0000] to-[#6A0000] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Send className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Message Sent Successfully!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-700 text-lg mb-8 max-w-md mx-auto"
            >
              Thank you for contacting Emmanuel Senior School! Our admissions team will reach out to discuss your inquiry within 24 hours.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-3 bg-gradient-to-r from-[#8B0000] to-[#6A0000] text-white rounded-full font-semibold
                         shadow-lg shadow-[#8B0000]/25 hover:shadow-[#8B0000]/35
                         transition-all duration-300"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7F7] to-[#FFF2F2] pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8 overflow-hidden">

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Information & Intro Card */}
        <div className="space-y-8">
          {/* Premium Intro - Fade in from left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-[#8B0000] via-[#6A0000] to-[#000000] bg-clip-text text-transparent">
                Connect
              </span>{' '}
              with Our Admissions Team
            </h2>
            <p className="text-gray-700 text-lg">
              Reach out to our dedicated admissions and support team who are ready to guide you through the enrollment process and answer all your questions about Emmanuel Senior School.
            </p>
          </motion.div>

          {/* Contact Information with Lottie Animation - Fade in from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center overflow-hidden">

            {/* Contact Items - Left Side */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 hover:bg-[#FFE5E5] rounded-xl transition-all duration-200 cursor-pointer group">
                <div className="w-12 h-12 bg-[#FFE5E5] rounded-xl flex items-center justify-center group-hover:bg-[#FFCCCC] transition-colors duration-200">
                  <Phone className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone Numbers</p>
                  <p className="text-gray-900 font-semibold">0722 489 809</p>
                  <p className="text-gray-900 font-semibold">0723 503 918</p>
                  <p className="text-gray-900 font-semibold">0799 852 688</p>

                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 hover:bg-[#FFE5E5] rounded-xl transition-all duration-200 cursor-pointer group">
                <div className="w-12 h-12 bg-[#FFE5E5] rounded-xl flex items-center justify-center group-hover:bg-[#FFCCCC] transition-colors duration-200">
                  <Mail className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email Address</p>
                  <p className="text-gray-900 font-semibold">info@emmanuelseniorschool.co.ke</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 p-4 hover:bg-[#FFE5E5] rounded-xl transition-all duration-200 cursor-pointer group">
                <div className="w-12 h-12 bg-[#FFE5E5] rounded-xl flex items-center justify-center group-hover:bg-[#FFCCCC] transition-colors duration-200">
                  <MapPin className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Visit Our School</p>
                  <p className="text-gray-900 font-semibold">Maragua, 3 Kms off Murang&apos;a Road</p>
                </div>
              </div>
            </div>

        {/* Lottie Animation - Right Side */}
          <div className="hidden md:flex items-center justify-center h-full overflow-hidden">
            <div className="w-full max-w-[260px] md:max-w-[320px] h-56 md:h-64 overflow-hidden ml-9">
              <Lottie
                animationData={contactAnimation}
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
          </div>
          </div>
        </motion.div>

          {/* Premium Feature Card - Fade in from bottom */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="bg-gradient-to-br from-[#1a0a0a] via-[#2a0a0a] to-[#000000] rounded-3xl p-8 text-white shadow-2xl shadow-[#8B0000]/20"
          >
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Text Content */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Choose Emmanuel Senior School?</h3>
                <div className="space-y-3">
                  {[
                    { icon: School, text: 'Christ-centered holistic education' },
                    { icon: BookOpen, text: 'Academic excellence & modern facilities' },
                    { icon: Heart, text: 'Spiritual development & moral guidance' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#8B0000] to-[#6A0000] rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden max-w-full">
                <Image
                  src="/school-campus.jpg"
                  alt="Emmanuel Senior School Campus"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/50 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Contact Form - Slide in from right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl shadow-[#8B0000]/10 p-6 sm:p-8 border-[#8B0000]/30 border-[1.5px] overflow-hidden"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
          <p className="text-gray-700 mb-8">Fill out the form below and we&apos;ll get back to you shortly regarding admissions or any other inquiries.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">Parent/Guardian Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-300"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-300"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-300"
                  placeholder="Student's Name"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-300"
                  placeholder="+254 722 000 000"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-800 font-medium mb-2">Inquiry Type</label>
              <div className="relative">
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  onFocus={() => setDropdownOpen(true)}
                  onBlur={() => setDropdownOpen(false)}
                  className="appearance-none w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl
                            focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent
                            transition-all duration-300 bg-white"
                >
                  <option value="">Select inquiry type</option>
                  {inquiryTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>

                <ChevronDownCircle
                  className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#8B0000]
                              transition-transform duration-300 pointer-events-none
                              ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tell us about your inquiry or ask any questions about Emmanuel Senior School..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#8B0000] to-[#6A0000] text-white rounded-xl font-semibold shadow-lg shadow-[#8B0000]/25 hover:shadow-[#8B0000]/35 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>

{/* Countdown Timer - Compact Two Column Layout */}
{countdownActive && (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    className="mt-6 backdrop-blur-lg bg-gradient-to-r from-[#FFE5E5]/60 to-[#FFF2F2]/40 border border-[#8B0000]/20 rounded-2xl p-4 shadow-lg shadow-[#8B0000]/5"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      {/* Left Column - Timer Header */}
      <div className="text-left space-y-2">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B0000]/10 to-[#6A0000]/10 border border-[#8B0000]/30 flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-4 h-4 text-[#8B0000]" />
          </motion.div>
          <div>
            <p className="text-gray-900 font-medium text-sm">Processing Request</p>
            <p className="text-gray-600 text-xs">
              Secure submission in progress
            </p>
          </div>
        </div>

        {/* Mini progress bar for left column */}
        <div className="pt-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Time remaining</span>
            <span className="font-semibold text-[#8B0000]">{countdown}s</span>
          </div>
          <div className="h-1.5 bg-gray-200/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8B0000] to-[#6A0000]"
              initial={{ width: "0%" }}
              animate={{ width: `${((10 - (countdown || 0)) / 10) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Right Column - Timer Visual */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="relative">
          {/* Compact outer ring */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF7F7] to-[#FFE5E5] border border-[#8B0000]/20 shadow-md flex items-center justify-center">
            {/* Progress ring */}
            <svg className="absolute inset-0 w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#gradient-compact)"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray="226.08"
                strokeDashoffset={226.08 * (1 - (countdown || 0) / 10)}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient-compact" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B0000" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6A0000" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Countdown number */}
            <motion.div
              key={countdown}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-[#8B0000] to-[#6A0000] bg-clip-text text-transparent"
            >
              {countdown}
            </motion.div>
          </div>

          {/* Small pulsing dot */}
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-r from-[#8B0000] to-[#6A0000] rounded-full border border-white shadow-sm"
          />
        </div>

        {/* Compact status indicator */}
        <div className="flex items-center space-x-2">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B0000]/50 to-[#6A0000]/50"
            />
          ))}
          <span className="text-xs text-gray-600">Submitting...</span>
        </div>
      </div>
    </div>
  </motion.div>
)}

{/* Error Display - Only show when there's an error AND countdown is not active */}
{submitError && !countdownActive && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className="mt-4 p-4 rounded-2xl border border-red-200/80 bg-gradient-to-r from-red-50/90 to-red-100/50 backdrop-blur-sm shadow-lg shadow-red-200/20"
  >
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-red-900 font-semibold mb-1">Submission Error</h4>
        <p className="text-red-800 text-sm">{submitError}</p>
        {submitError.includes("Too many submissions") && (
          <div className="mt-2 pt-2 border-t border-red-200/50">
            <p className="text-red-700 text-xs">
              <span className="font-medium">Tip:</span> Please wait a few minutes before trying again.
            </p>
          </div>
        )}
      </div>
    </div>
  </motion.div>
)}
          </form>


        </motion.div>
      </div>
      </div>
    </div>
  );
}