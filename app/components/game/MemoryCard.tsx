"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

// FIX: Hapus 'id' dari sini karena tidak dipakai di bawah
export default function MemoryCard({ image, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <div className="relative w-20 h-28 md:w-32 md:h-40 cursor-pointer perspective-1000" onClick={onClick}>
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Bagian Belakang Kartu (Tutup) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-md bg-gradient-to-br from-lilac-400 to-lilac-600 flex items-center justify-center border-2 border-white/30"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Heart className="text-white/50 w-8 h-8 md:w-12 md:h-12" fill="currentColor" />
        </div>

        {/* Bagian Depan Kartu (Foto) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-md overflow-hidden border-2 border-gold-300 bg-white"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
          }}
        >
          <Image 
            src={image} 
            alt="Memory" 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100px, 200px"
          />
          
          {/* Overlay kalau sudah match */}
          {isMatched && (
            <div className="absolute inset-0 bg-gold-500/30 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }}
                className="bg-white rounded-full p-1"
              >
                <Heart className="text-gold-600 w-4 h-4" fill="currentColor" />
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}