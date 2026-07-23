'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { motion } from 'framer-motion';
import { Lock, Mail, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, loading, error: authError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Vui lòng nhập đầy đủ thông tin đăng nhập.');
      return;
    }

    try {
      await signIn(email, password);
      // Đăng nhập thành công chuyển hướng về /welcome đúng theo quy tắc
      router.push('/welcome');
    } catch (err) {
      // Đã được xử lý bởi store
    }
  };

  const displayedError = localError || authError;

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[#FFF9F8] dark:bg-[#161313] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/70 dark:bg-[#1F1A1A]/70 backdrop-blur-md border border-[#FAF6F0] dark:border-[#292222] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(61,43,39,0.03)]"
      >
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#FFF9F8] dark:bg-[#292222] border border-[#FAF6F0] dark:border-[#292222] flex items-center justify-center mb-4 text-[#E96A87]">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h1 className="font-display text-3xl font-medium text-[#2B2B2B] dark:text-[#F0E6E4] tracking-wide mb-2">
            Chào mừng trở lại
          </h1>
          <p className="text-xs text-gray-400 dark:text-[#B5A8A6] max-w-[280px]">
            Đăng nhập để tiếp tục tạo dựng những kỷ niệm đáng nhớ.
          </p>
        </div>

        {/* Error Message Panel */}
        {displayedError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-xs text-red-500 dark:text-red-400 text-left"
            role="alert"
            aria-live="polite"
          >
            {displayedError}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] tracking-widest uppercase font-bold text-gray-400 dark:text-[#7A6D6B] px-1">
              Email của bạn
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-[#7A6D6B]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ten-cua-ban@email.com"
                className="w-full bg-white/40 dark:bg-[#292222]/40 border border-[#FAF6F0] dark:border-[#292222] rounded-xl pl-11 pr-4 py-3 text-sm text-[#2B2B2B] dark:text-[#F0E6E4] outline-none transition-all focus:border-[#E96A87] focus:ring-0 placeholder-gray-300 dark:placeholder-[#7A6D6B]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] tracking-widest uppercase font-bold text-gray-400 dark:text-[#7A6D6B]">
                Mật khẩu
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-[9px] font-sans tracking-wide text-gray-400 dark:text-[#7A6D6B] hover:text-[#E96A87]"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-[#7A6D6B]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/40 dark:bg-[#292222]/40 border border-[#FAF6F0] dark:border-[#292222] rounded-xl pl-11 pr-4 py-3 text-sm text-[#2B2B2B] dark:text-[#F0E6E4] outline-none transition-all focus:border-[#E96A87] focus:ring-0 placeholder-gray-300 dark:placeholder-[#7A6D6B]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E96A87] hover:bg-[#E96A87]/90 active:scale-[0.98] disabled:opacity-50 text-white font-medium text-sm py-3.5 rounded-xl shadow-[0_10px_20px_rgba(233,106,135,0.15)] flex items-center justify-center gap-2 mt-2 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        {/* Navigation Switch */}
        <div className="mt-8 text-center text-xs text-gray-400 dark:text-[#B5A8A6]">
          Chưa có tài khoản?{' '}
          <Link href="/auth/signup" className="text-[#E96A87] hover:underline font-semibold">
            Đăng ký ngay
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
