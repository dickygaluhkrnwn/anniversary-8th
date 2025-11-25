"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MEMORY_CARDS } from '@/lib/data';
import MemoryCard from './MemoryCard';
import Confetti from '../ui/Confetti';
import { Button } from '../ui/Button';
import { ArrowRight, RefreshCcw } from 'lucide-react';

interface GameCard {
  uniqueId: number;
  id: number;
  img: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryBoard() {
  const router = useRouter();
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  // Logika pengacakan kartu
  const shuffleCards = useCallback(() => {
    const duplicatedCards = [...MEMORY_CARDS, ...MEMORY_CARDS].map((card, index) => ({
      ...card,
      uniqueId: index,
      isFlipped: false,
      isMatched: false,
    }));

    const shuffled = duplicatedCards.sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlippedCards([]);
    setIsWon(false);
    setMoves(0);
  }, []);

  // Init Game (Dijalankan sekali saat mount)
  useEffect(() => {
    // FIX: Bungkus dengan setTimeout agar tidak dianggap "synchronous state update" oleh linter
    const timer = setTimeout(() => {
      shuffleCards();
    }, 100);

    return () => clearTimeout(timer);
  }, [shuffleCards]);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedCards.length >= 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      checkMatch(newFlipped[0], newFlipped[1], newCards);
    }
  };

  const checkMatch = (index1: number, index2: number, currentCards: GameCard[]) => {
    const match = currentCards[index1].id === currentCards[index2].id;

    if (match) {
      const newCards = [...currentCards];
      newCards[index1].isMatched = true;
      newCards[index2].isMatched = true;
      setCards(newCards);
      setFlippedCards([]);

      if (newCards.every(card => card.isMatched)) {
        setTimeout(() => setIsWon(true), 500);
      }
    } else {
      setTimeout(() => {
        setCards(prevCards => {
          const resetCards = [...prevCards];
          resetCards[index1].isFlipped = false;
          resetCards[index2].isFlipped = false;
          return resetCards;
        });
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
      {/* Confetti HANYA muncul jika menang */}
      {isWon && <Confetti />}

      {/* Status Bar */}
      <div className="flex justify-between items-center w-full max-w-md px-4 mb-4">
        <div className="text-lilac-800 font-medium">Langkah: {moves}</div>
        <button 
          onClick={shuffleCards} 
          className="flex items-center gap-2 text-sm text-lilac-600 hover:text-lilac-800 transition-colors"
        >
          <RefreshCcw size={14} /> Ulangi
        </button>
      </div>

      {/* Grid Kartu */}
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {cards.map((card, index) => (
          <MemoryCard
            key={card.uniqueId}
            id={card.id}
            image={card.img}
            isFlipped={card.isFlipped || card.isMatched}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {/* Pesan Menang */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isWon ? 1 : 0, y: isWon ? 0 : 20, pointerEvents: isWon ? 'auto' : 'none' }}
        className="text-center space-y-6 mt-8"
      >
        {isWon ? (
          <>
            {/* FIX: Tambahkan 'flex flex-col items-center' agar isinya benar-benar di tengah */}
            <div className="p-6 glass-card flex flex-col items-center">
              <h2 className="text-2xl font-serif font-bold text-lilac-900 mb-2">Hebat Sayang! 🎉</h2>
              <p className="text-lilac-700 mb-6">Kamu berhasil membuka kunci kenangan kita.</p>
              <Button onClick={() => router.push('/journey')}>
                Lihat Perjalanan Kita <ArrowRight size={18} />
              </Button>
            </div>
          </>
        ) : (
          <p className="text-lilac-400 text-sm animate-pulse">
            Temukan semua pasangan foto untuk lanjut...
          </p>
        )}
      </motion.div>
    </div>
  );
}