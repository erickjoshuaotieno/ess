'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, Users, Shield } from 'lucide-react';
import PageWrapper from "@/components/PageWrapper";
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentName: '',
    relationship: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    // Handle signup logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageWrapper>
      <div className="min-h-screen relative flex items-center justify-center py-8 px-4">
        {/* Faith-Based Education Theme Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#FFF7F7]/90 via-[#FFE5E5]/70 to-[#FFF2F2]/95 backdrop-blur-3xl">
          {/* Subtle Maroon Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-[#8B0000]/5 via-transparent to-[#000000]/10"></div>

          {/* Premium Geometric Pattern - Cross Motif */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #8B0000 0.5px, transparent 0.5px),
                radial-gradient(circle at 75% 75%, #6A0000 0.5px, transparent 0.5px)
              `,
              backgroundSize: '50px 50px, 35px 35px',
              backgroundPosition: '0 0, 25px 25px'
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-sm mx-auto pt-6">
          {/* Signup Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl shadow-[#8B0000]/10 border border-[#FFE5E5]/50 p-8 py-4 font-inter"
          >
            {/* Header - School Theme */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#6A0000]">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-[#8B0000] via-[#6A0000] to-[#000000] bg-clip-text text-transparent mb-2 font-inter tracking-tight">
                Portal Registration
              </h1>
              <p className="text-slate-600 text-sm font-inter">
                Register for Emmanuel Senior School parent access
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Parent/Guardian Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-slate-700 font-medium mb-2 font-inter text-sm">
                  Parent/Guardian Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all duration-300 bg-white/80 font-inter placeholder-slate-400"
                    placeholder="Full name as per ID"
                  />
                </div>
              </motion.div>

              {/* Relationship to Student */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-slate-700 font-medium mb-2 font-inter text-sm">
                  Relationship to Student
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all duration-300 bg-white/80 font-inter appearance-none"
                  >
                    <option value="">Select relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Student Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-slate-700 font-medium mb-2 font-inter text-sm">
                  Student Name (Optional)
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all duration-300 bg-white/80 font-inter placeholder-slate-400"
                    placeholder="Student's full name"
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-slate-700 font-medium mb-2 font-inter text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all duration-300 bg-white/80 font-inter placeholder-slate-400"
                    placeholder="parent@example.com"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-slate-700 font-medium mb-2 font-inter text-sm">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all duration-300 bg-white/80 font-inter placeholder-slate-400"
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-inter">Include letters, numbers, and special characters</p>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-slate-700 font-medium mb-2 font-inter text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all duration-300 bg-white/80 font-inter placeholder-slate-400"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              {/* Terms Agreement */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-sm"
              >
                <label className="flex items-start space-x-2 font-inter">
                  <input
                    type="checkbox"
                    required
                    className="w-3.5 h-3.5 text-[#8B0000] rounded focus:ring-1 focus:ring-[#8B0000]/20 border-slate-300 mt-0.5"
                  />
                  <span className="text-slate-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-[#8B0000] hover:text-[#6A0000] font-medium transition-colors">
                      School Portal Terms
                    </Link>{' '}
                    and acknowledge that this portal is for{' '}
                    <Link href="/privacy" className="text-[#8B0000] hover:text-[#6A0000] font-medium transition-colors">
                      authorized parent/guardian access only
                    </Link>
                  </span>
                </label>
              </motion.div>

              {/* Security Notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="p-3 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5]"
              >
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-600 font-inter">
                    Your account will provide secure access to student academic records, fee statements, school announcements, and communication with teachers.
                  </p>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full py-3 bg-linear-to-r from-[#8B0000] to-[#6A0000] text-white rounded-lg font-semibold text-sm shadow-lg shadow-[#8B0000]/20 hover:shadow-[#8B0000]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed font-inter"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Register for Portal Access'
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-center mt-6 pt-5 border-t border-slate-300/40"
            >
              <p className="text-slate-600 text-sm font-inter">
                Already have a parent account?{' '}
                <Link href="/login" className="text-[#8B0000] hover:text-[#6A0000] font-semibold transition-colors font-inter">
                  Sign in here
                </Link>
              </p>
              <p className="text-slate-500 text-xs font-inter mt-2">
                Need help? Contact admissions at{' '}
                <span className="text-[#8B0000] font-medium">emmanuelseniorschool@gmail.com</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}