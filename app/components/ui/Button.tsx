"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary',
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 flex items-center gap-2 justify-center";
  
  const variants = {
    primary: "bg-lilac-600 text-white shadow-lg shadow-lilac-300/50 hover:bg-lilac-700 hover:shadow-lilac-400/60",
    outline: "bg-transparent border-2 border-lilac-600 text-lilac-700 hover:bg-lilac-50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};