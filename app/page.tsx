'use client';

import { useState } from 'react';

type Player = 'X' | 'O' | null;

export default function Home() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);

  const calculateWinner = (squares: Player[]): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newBoard.every((square) => square !== null)) {
      setWinner('draw');
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const getStatusMessage = () => {
    if (winner === 'draw') return '平手！';
    if (winner) return `${winner} 獲勝！`;
    return `輪到：${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          ⭕ 圈圈叉叉 ❌
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="text-white text-3xl font-bold text-center">
            {getStatusMessage()}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`aspect-square bg-white/90 rounded-xl shadow-lg flex items-center justify-center text-6xl font-bold transition-all hover:scale-105 ${
                cell === 'X' ? 'text-blue-600' : 'text-red-600'
              } ${!cell && !winner ? 'hover:bg-white' : ''}`}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-white text-purple-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-purple-100 transition-colors shadow-lg"
          >
            重新開始
          </button>
        </div>

        {winner && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">
                {winner === 'draw' ? '🤝' : '🎉'}
              </div>
              <h2 className="text-3xl font-bold text-purple-700 mb-4">
                {winner === 'draw' ? '平手！' : `${winner} 獲勝！`}
              </h2>
              <button
                onClick={resetGame}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors mt-4"
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
