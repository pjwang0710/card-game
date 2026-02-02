'use client';

import { useState } from 'react';

export interface CardProps {
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  isFlipped?: boolean;
  onClick?: () => void;
}

export default function Card({ suit, rank, isFlipped = false, onClick }: CardProps) {
  const [flipped, setFlipped] = useState(isFlipped);

  const isRed = suit === '♥' || suit === '♦';

  const handleClick = () => {
    setFlipped(!flipped);
    onClick?.();
  };

  return (
    <div
      className="relative w-24 h-36 cursor-pointer transition-transform hover:scale-105"
      onClick={handleClick}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full rounded-lg border-2 border-gray-700 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-white text-4xl">🎴</div>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full rounded-lg border-2 border-gray-300 bg-white shadow-lg flex flex-col items-center justify-between p-2 ${
            isRed ? 'text-red-600' : 'text-black'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-xl font-bold">
            {rank}
            {suit}
          </div>
          <div className="text-5xl">{suit}</div>
          <div className="text-xl font-bold rotate-180">
            {rank}
            {suit}
          </div>
        </div>
      </div>
    </div>
  );
}
