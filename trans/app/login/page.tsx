'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, GraduationCap, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    // Handle login logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
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

        <div className="relative z-10 w-full max-w-sm mx-auto pt-2">
          {/* Login Card */}
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
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-[#8B0000] via-[#6A0000] to-[#000000] bg-clip-text text-transparent mb-2 font-inter tracking-tight">
                Emmanuel Senior School
              </h1>
              <p className="text-slate-600 text-sm font-inter">
                Parent & Student Portal Access
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
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
                transition={{ delay: 0.3 }}
              >
                <label className="block text-slate-700 font-medium mb-2 font-inter text-sm">
                  Password
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
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center space-x-2 font-inter">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 text-[#8B0000] rounded focus:ring-1 focus:ring-[#8B0000]/20 border-slate-300"
                  />
                  <span className="text-slate-700">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-[#8B0000] hover:text-[#6A0000] font-medium transition-colors font-inter">
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full py-3 bg-linear-to-r from-[#8B0000] to-[#6A0000] text-white rounded-lg font-semibold text-sm shadow-lg shadow-[#8B0000]/20 hover:shadow-[#8B0000]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed font-inter"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Access Portal'
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center my-6"
            >
              <div className="flex-1 h-px bg-slate-300/60"></div>
              <span className="px-3 text-slate-500 text-xs font-inter">Secure login options</span>
              <div className="flex-1 h-px bg-slate-300/60"></div>
            </motion.div>

            {/* Alternative Login Options */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              <button className="w-full flex items-center justify-center space-x-2 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50/50 transition-all duration-300 group font-inter text-sm">
                <BookOpen className="w-4 h-4 text-[#8B0000]" />
                <span className="text-slate-700 font-medium group-hover:text-slate-800 transition-colors">
                  Parent Access Code
                </span>
              </button>

              <button className="w-full flex items-center justify-center space-x-2 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50/50 transition-all duration-300 group font-inter text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-slate-700 font-medium group-hover:text-slate-800 transition-colors">
                  School Google Account
                </span>
              </button>
            </motion.div>

            {/* Help & Registration Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-6 pt-5 border-t border-slate-300/40"
            >
              <p className="text-slate-600 text-sm font-inter mb-2">
                Need access?{' '}
                <Link href="/signup" className="text-[#8B0000] hover:text-[#6A0000] font-semibold transition-colors font-inter">
                  Register for Portal
                </Link>
              </p>
              <p className="text-slate-500 text-xs font-inter">
                Technical support?{' '}
                <Link href="/support" className="text-[#8B0000] hover:text-[#6A0000] font-medium transition-colors font-inter">
                  Contact IT Department
                </Link>
              </p>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 p-3 bg-[#FFF7F7] rounded-lg border border-[#FFE5E5]"
            >
              <p className="text-xs text-slate-600 text-center font-inter">
                <Lock className="w-3 h-3 inline mr-1 text-[#8B0000]" />
                Secure access to academic records, fee statements, and school communications
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
  );
}