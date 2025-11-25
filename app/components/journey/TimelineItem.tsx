"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

export default function TimelineItem({ year, title, description, image, index }: TimelineItemProps) {
  // Menentukan posisi ganjil/genap untuk layout zig-zag
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      
      {/* Bagian Gambar */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-5/12 mb-6 md:mb-0 relative group"
      >
        {/* UPDATE FILTER:
            - grayscale: Hitam putih dasar
            - contrast-125: Meningkatkan ketajaman perbedaan gelap/terang (biar mirip foto studio)
            - brightness-110: Mencerahkan sedikit agar tidak terlalu gelap
        */}
        <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 grayscale contrast-125 brightness-110">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay Tahun */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-lilac-800 font-serif font-bold shadow-sm">
            {year}
          </div>
        </div>
        
        {/* Dekorasi Blob di belakang */}
        <div className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-lilac-200/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </motion.div>

      {/* Bagian Garis Tengah (Mobile Hidden) */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        <div className="h-full w-1 bg-lilac-200 absolute top-0 bottom-0 left-1/2 -translate-x-1/2"></div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="sticky top-1/2 w-6 h-6 bg-gold-400 rounded-full border-4 border-white shadow-md z-10"
        />
      </div>

      {/* Bagian Teks */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full md:w-5/12 text-center md:text-left px-4"
      >
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-lilac-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed font-sans">{description}</p>
      </motion.div>

    </div>
  );
}