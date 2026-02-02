'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';

interface GameCard {
  id: number;
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function Home() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (
        firstCard &&
        secondCard &&
        firstCard.suit === secondCard.suit &&
        firstCard.rank === secondCard.rank
      ) {
        // Match found
        setCards((prev) =>
          prev.map((card) =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  const initializeGame = () => {
    const suits: Array<'♠' | '♥' | '♦' | '♣'> = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8'];

    const cardPairs: GameCard[] = [];
    let id = 0;

    // Create 8 pairs of cards
    for (let i = 0; i < 8; i++) {
      const suit = suits[Math.floor(i / 2)];
      const rank = ranks[i];

      cardPairs.push({
        id: id++,
        suit,
        rank,
        isFlipped: false,
        isMatched: false,
      });

      cardPairs.push({
        id: id++,
        suit,
        rank,
        isFlipped: false,
        isMatched: false,
      });
    }

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  const handleCardClick = (id: number) => {
    const card = cards.find((c) => c.id === id);

    if (
      !card ||
      card.isMatched ||
      card.isFlipped ||
      flippedCards.length >= 2
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );

    setFlippedCards((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          🃏 記憶卡牌遊戲
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="flex justify-around text-white text-xl">
            <div className="text-center">
              <div className="font-bold text-3xl">{moves}</div>
              <div className="text-sm opacity-80">移動次數</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl">{matchedPairs}/8</div>
              <div className="text-sm opacity-80">配對成功</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          {cards.map((card) => (
            <div key={card.id} className="flex justify-center">
              <Card
                suit={card.suit}
                rank={card.rank}
                isFlipped={card.isFlipped || card.isMatched}
                onClick={() => handleCardClick(card.id)}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={initializeGame}
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-100 transition-colors shadow-lg"
          >
            重新開始
          </button>
        </div>

        {matchedPairs === 8 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                恭喜過關！
              </h2>
              <p className="text-xl mb-6">
                你用了 <span className="font-bold text-green-600">{moves}</span> 步完成遊戲
              </p>
              <button
                onClick={initializeGame}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                再玩一次
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
