'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { motion } from 'framer-motion';
import { Lock, Mail, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, loading, error: authError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMsg('');

    if (!email || !password || !confirmPassword) {
      setLocalError('Vui lòng điền đầy đủ các thông tin đăng ký.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Mật khẩu nhập lại không khớp.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Mật khẩu tối thiểu phải từ 6 ký tự.');
      return;
    }

    try {
      await signUp(email, password);
      setSuccessMsg('Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản của bạn.');
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
            Tạo tài khoản mới
          </h1>
          <p className="text-xs text-gray-400 dark:text-[#B5A8A6] max-w-[280px]">
            Bắt đầu tạo dựng những hồi ức điện ảnh dành riêng cho người thương.
          </p>
        </div>

        {/* Success/Error Message Panel */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-5 p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 text-xs text-green-600 dark:text-green-400 text-left"
          >
            {successMsg}
          </motion.div>
        )}

        {displayedError && !successMsg && (
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

        {/* Signup Form */}
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
            <label className="text-[10px] tracking-widest uppercase font-bold text-gray-400 dark:text-[#7A6D6B] px-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-[#7A6D6B]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full bg-white/40 dark:bg-[#292222]/40 border border-[#FAF6F0] dark:border-[#292222] rounded-xl pl-11 pr-4 py-3 text-sm text-[#2B2B2B] dark:text-[#F0E6E4] outline-none transition-all focus:border-[#E96A87] focus:ring-0 placeholder-gray-300 dark:placeholder-[#7A6D6B]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[10px] tracking-widest uppercase font-bold text-gray-400 dark:text-[#7A6D6B] px-1">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-[#7A6D6B]" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
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
                Đang tạo tài khoản...
              </>
            ) : (
              'Đăng ký tài khoản'
            )}
          </button>
        </form>

        {/* Navigation Switch */}
        <div className="mt-8 text-center text-xs text-gray-400 dark:text-[#B5A8A6]">
          Đã có tài khoản?{' '}
          <Link href="/auth/login" className="text-[#E96A87] hover:underline font-semibold">
            Đăng nhập ngay
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
