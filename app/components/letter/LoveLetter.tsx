"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LOVE_LETTER_CONTENT, ANNIVERSARY_DATE, COUPLE_NAMES } from '@/lib/data';
import { Heart, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

export default function LoveLetter() {
  const router = useRouter();

  return (
    <div className="w-full max-w-2xl bg-[#fffdfa] rounded-xl shadow-2xl overflow-hidden border border-[#f0e6d2] relative">
      
      {/* Header Pattern Surat */}
      <div className="h-32 bg-gradient-to-b from-lilac-200 to-[#fffdfa] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7e22ce_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Perangko / Stamp */}
        <div className="absolute top-6 right-6 w-20 h-24 bg-white border-4 border-dashed border-lilac-300 shadow-sm flex flex-col items-center justify-center rotate-6">
          <Heart className="text-red-400 fill-red-400 w-8 h-8" />
          <span className="text-[10px] font-bold text-lilac-400 mt-2 font-sans">8 YEARS</span>
        </div>
      </div>

      {/* Isi Surat */}
      <div className="px-8 pt-8 pb-12 md:px-12 space-y-6 text-slate-700 leading-relaxed relative">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-serif text-3xl text-lilac-900 font-bold mb-2 text-center">
            Happy Anniversary
          </h1>
          <p className="text-center text-lilac-500 font-serif italic text-sm mb-10">
            {ANNIVERSARY_DATE} • {COUPLE_NAMES}
          </p>

          <div className="font-sans text-lg space-y-6 text-justify md:text-left text-slate-600">
            {LOVE_LETTER_CONTENT.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-12 pt-8 border-t border-lilac-100 flex flex-col items-center gap-6">
            <div className="font-serif text-lilac-800 text-xl">
              With all my love, <br />
              <span className="font-bold">Your Forever Person</span>
            </div>

            <Button onClick={() => router.push('/')} variant="outline" className="mt-4">
              <Home size={18} /> Kembali ke Awal
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}