"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Heart, Stars } from 'lucide-react';
import { Button } from '../ui/Button';

// Tipe data untuk fireflies yang lebih lengkap
interface Firefly {
  id: number;
  initialX: number;
  initialY: number;
  moveX: number; // Seberapa jauh bergerak horizontal
  moveY: number; // Seberapa jauh bergerak vertikal
  duration: number;
  delay: number;
}

export default function InfinityGate() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: Init, 1: Rotate, 2: Reveal
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Generate posisi dan gerakan fireflies HANYA SEKALI di client
    const generateFireflies = () => {
      const newFireflies = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        moveX: Math.random() > 0.5 ? 5 : -5, // Gerakan random kiri/kanan yang sudah ditentukan
        moveY: -10, // Gerakan ke atas
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      }));
      setFireflies(newFireflies);
    };

    generateFireflies();

    const timer1 = setTimeout(() => setStep(1), 1500);
    const timer2 = setTimeout(() => setStep(2), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleEnter = () => {
    router.push('/game'); 
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfaff] overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-lilac-100)_0%,_transparent_70%)] opacity-60 pointer-events-none" />

      {/* 2. Fireflies / Particles Effect */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {fireflies.map((fly) => (
          <motion.div
            key={fly.id}
            // FIX: Gunakan nilai dari state, bukan Math.random() langsung di render
            initial={{ opacity: 0, x: `${fly.initialX}vw`, y: `${fly.initialY}vh` }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              y: [`${fly.initialY}vh`, `${fly.initialY + fly.moveY}vh`], 
              x: [`${fly.initialX}vw`, `${fly.initialX + fly.moveX}vw`]
            }}
            transition={{ 
              duration: fly.duration, 
              repeat: Infinity, 
              delay: fly.delay,
              ease: "easeInOut" 
            }}
            className="absolute w-1 h-1 bg-gold-300 rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* 3. Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-lilac-200 rounded-full blur-[120px] opacity-30 animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-pink-100 rounded-full blur-[120px] opacity-30 animate-blob animation-delay-2000" />

      {/* --- BINGKAI DEKORATIF (Baru) --- */}
      <div className="absolute inset-4 md:inset-8 border border-lilac-200/50 rounded-[30px] pointer-events-none z-20">
        {/* Sudut-sudut Emas */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-300 rounded-tl-[20px]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-300 rounded-tr-[20px]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-300 rounded-bl-[20px]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-300 rounded-br-[20px]" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6">
        
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8 md:mb-12 text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-3 text-lilac-400 mb-2">
            <div className="h-[1px] w-8 md:w-16 bg-lilac-300/50" />
            <Stars size={14} className="animate-pulse" />
            <div className="h-[1px] w-8 md:w-16 bg-lilac-300/50" />
          </div>
          
          {/* UPDATED: Ukuran font diperbesar (text-sm di mobile, text-lg di desktop) */}
          <p className="text-lilac-600 font-sans tracking-[0.4em] uppercase text-sm md:text-lg font-medium">
            Celebrating Our Journey
          </p>
        </motion.div>

        {/* THE INFINITY SYMBOL ANIMATION */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8 md:mb-12">
          <motion.div 
            animate={{ 
              scale: step >= 1 ? [1, 1.2, 1] : 1,
              opacity: step >= 1 ? 0.4 : 0
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-lilac-300 to-gold-200 blur-3xl rounded-full opacity-0"
          />

          <motion.div
            initial={{ rotate: 0, scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ 
              rotate: step >= 1 ? 90 : 0, 
              scale: step >= 1 ? 1.3 : 1,
              opacity: 1,
              filter: "blur(0px)"
            }}
            transition={{ 
              duration: 2.5, 
              ease: [0.22, 1, 0.36, 1], 
            }}
            className="text-transparent bg-clip-text bg-gradient-to-br from-lilac-600 via-lilac-500 to-gold-500 font-serif font-bold text-[12rem] md:text-[14rem] leading-none flex items-center justify-center cursor-default select-none drop-shadow-sm relative z-10"
          >
            8
          </motion.div>

          {step >= 1 && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-1/4 right-0 md:right-4 text-gold-400"
              >
                <Sparkles size={24} className="animate-spin-slow" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-1/4 left-0 md:left-4 text-lilac-400"
              >
                <Sparkles size={20} className="animate-pulse" />
              </motion.div>
            </>
          )}
        </div>

        {/* Bottom Content (Reveal) */}
        <div className="h-32 md:h-40 flex flex-col items-center justify-start"> 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center space-y-6 w-full"
          >
            <h2 className="text-xl md:text-3xl font-serif text-lilac-900 italic font-light">
              &quot;Infinite moments, endless love.&quot;
            </h2>

            <div className="flex justify-center pt-2">
              <Button onClick={handleEnter} className="px-10 py-4 text-lg shadow-xl shadow-lilac-200 hover:shadow-gold-100/50 transition-all">
                Buka Kenangan <Heart size={18} fill="#ec4899" className="text-pink-500 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Footer Artistik */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3, duration: 2 }}
        className="absolute bottom-8 w-full text-center"
      >
        <p className="text-[10px] md:text-xs text-lilac-400 tracking-[0.5em] uppercase font-light">
          Dibuat Spesial untuk Lendra
        </p>
      </motion.div>
    </div>
  );
}