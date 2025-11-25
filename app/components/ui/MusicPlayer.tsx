"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Pause, Play } from 'lucide-react'; // Hapus Music, pakai Pause & Play
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  // Daftar halaman di mana musik boleh berbunyi
  const allowedPaths = ['/journey', '/letter'];
  const shouldShow = allowedPaths.includes(pathname);

  useEffect(() => {
    if (shouldShow && audioRef.current) {
      // FIX: Bungkus dengan setTimeout untuk menghindari warning setState in effect
      const timer = setTimeout(() => {
        // Coba autoplay saat masuk halaman journey
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => {
          console.log("Autoplay blocked, user needs to click play", e);
          setIsPlaying(false);
        });
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (!shouldShow && audioRef.current) {
      // Stop musik jika keluar dari halaman journey/letter
      // FIX: Bungkus pause logic dalam setTimeout juga agar konsisten
      const timer = setTimeout(() => {
        if(audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [shouldShow, pathname]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Jika bukan di halaman journey atau letter, jangan render apa-apa (unmount)
  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src="/music/song.mp3" loop />
      
      <AnimatePresence>
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-3 rounded-full shadow-lg border-2 border-white backdrop-blur-sm transition-all duration-300 ${
            isPlaying ? 'bg-gold-400 text-white animate-pulse' : 'bg-white/80 text-lilac-600'
          }`}
        >
          {/* Jika playing -> Tampilkan icon Pause, Jika stop -> Tampilkan icon Play */}
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </motion.button>
      </AnimatePresence>
    </div>
  );
}