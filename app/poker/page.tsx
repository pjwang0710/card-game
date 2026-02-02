'use client';

import { useState } from 'react';
import Card from '@/components/Card';

interface PokerCard {
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
}

export default function PokerGame() {
  const [cards, setCards] = useState<PokerCard[]>([]);

  const generateRandomCards = () => {
    const suits: Array<'♠' | '♥' | '♦' | '♣'> = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const allCards: PokerCard[] = [];
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        allCards.push({ suit, rank });
      });
    });

    // Shuffle and pick 4 cards
    const shuffled = allCards.sort(() => Math.random() - 0.5);
    setCards(shuffled.slice(0, 4));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
          🎴 隨機撲克牌
        </h1>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {cards.length === 0 ? (
            <div className="text-white text-2xl text-center opacity-70">
              點擊下方按鈕發牌
            </div>
          ) : (
            cards.map((card, index) => (
              <div key={index}>
                <Card suit={card.suit} rank={card.rank} isFlipped={true} />
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <button
            onClick={generateRandomCards}
            className="bg-white text-indigo-700 px-10 py-4 rounded-lg font-bold text-xl hover:bg-indigo-100 transition-colors shadow-lg"
          >
            {cards.length === 0 ? '發牌' : '重新發牌'}
          </button>
        </div>
      </div>
    </div>
  );
}
