'use client';

import { useState } from 'react';

type Player = 'X' | 'O' | null;

export default function Home() {
  const [board, setBoard] = useState<Player[]>(Array(16).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const calculateWinner = (squares: Player[]): { winner: Player | null; line: number[] } => {
    // 4x4 棋盤的索引:
    // 0  1  2  3
    // 4  5  6  7
    // 8  9  10 11
    // 12 13 14 15

    const lines = [
      // 橫線
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],

      // 直線
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],

      // 斜線
      [0, 5, 10, 15],
      [3, 6, 9, 12],

      // 正方形 (2x2)
      [0, 1, 4, 5],
      [1, 2, 5, 6],
      [2, 3, 6, 7],
      [4, 5, 8, 9],
      [5, 6, 9, 10],
      [6, 7, 10, 11],
      [8, 9, 12, 13],
      [9, 10, 13, 14],
      [10, 11, 14, 15],
    ];

    for (const [a, b, c, d] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return { winner: squares[a], line: [a, b, c, d] };
      }
    }
    return { winner: null, line: [] };
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    } else if (newBoard.every((square) => square !== null)) {
      setWinner('draw');
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(16).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    setShowModal(false);
  };

  const getStatusMessage = () => {
    if (winner === 'draw') return '平手！';
    if (winner) return `${winner} 獲勝！`;
    return `輪到：${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-100 text-center mb-8 drop-shadow-2xl tracking-tight">
          圈圈叉叉
        </h1>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50">
          <div className="text-slate-100 text-3xl font-bold text-center">
            {getStatusMessage()}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mb-8">
          {board.map((cell, index) => {
            const isWinningCell = winningLine.includes(index);
            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`aspect-square rounded-lg shadow-xl flex items-center justify-center text-6xl font-bold transition-all border ${
                  isWinningCell
                    ? 'bg-amber-500 border-amber-400 animate-pulse scale-110 shadow-amber-500/50'
                    : 'bg-slate-800 border-slate-700 hover:scale-105 hover:bg-slate-750'
                } ${cell === 'X' ? 'text-cyan-400' : cell === 'O' ? 'text-rose-400' : 'text-slate-600'} ${
                  !cell && !winner ? 'hover:border-slate-600' : ''
                }`}
                disabled={!!cell || !!winner}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-slate-700 text-slate-100 px-8 py-3 rounded-lg font-bold text-lg hover:bg-slate-600 transition-all shadow-lg border border-slate-600 hover:shadow-xl"
          >
            重新開始
          </button>
        </div>

        {winner && showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
              <div className="text-6xl mb-4">
                {winner === 'draw' ? '🤝' : '🎉'}
              </div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4">
                {winner === 'draw' ? '平手！' : `${winner} 獲勝！`}
              </h2>
              <button
                onClick={resetGame}
                className="bg-slate-700 text-slate-100 px-8 py-3 rounded-lg font-bold hover:bg-slate-600 transition-all mt-4 border border-slate-600"
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
