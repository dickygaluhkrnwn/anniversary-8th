"use client";

import React from 'react';
import { TIMELINE_DATA } from '@/lib/data';
import TimelineItem from './TimelineItem';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

export default function Timeline() {
  const router = useRouter();

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12">
      
      {/* Garis Vertikal Tengah (Background Line) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lilac-200 via-lilac-400 to-lilac-200 md:-translate-x-1/2 hidden md:block" />

      {/* Header Timeline */}
      <div className="text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-lilac-900 mb-4">
            Our Story
          </h2>
          <p className="text-lilac-600 text-lg max-w-2xl mx-auto">
            Setiap tahun adalah lembaran baru. Inilah kisah perjalanan kita yang penuh warna.
          </p>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-8 text-lilac-400 flex justify-center"
        >
          <ArrowDown size={32} />
        </motion.div>
      </div>

      {/* Render Item Timeline */}
      <div className="space-y-12 md:space-y-0">
        {TIMELINE_DATA.map((item, index) => (
          <TimelineItem 
            key={index}
            index={index}
            {...item}
          />
        ))}
      </div>

      {/* Footer Timeline - Menuju Surat */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 text-center pb-20"
      >
        <div className="p-8 glass-card max-w-2xl mx-auto">
          <p className="text-xl font-serif text-lilac-800 mb-8 italic">
            &quot;Dan perjalanan ini belum selesai. Masih ada satu hal lagi yang ingin ku sampaikan...&quot;
          </p>
          {/* FIX: Tambahkan mx-auto di sini */}
          <Button onClick={() => router.push('/letter')} className="mx-auto">
            Baca Surat Terakhir
          </Button>
        </div>
      </motion.div>

    </div>
  );
}