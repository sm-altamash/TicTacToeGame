
import React, { useState } from "react";
import { X, Circle, Check, AlertCircle } from "lucide-react";
import ScoreBoard from "./ScoreBoard";

type Player = "X" | "O" | null;

type BoardState = Player[];

const WIN_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6], // diags
];

function calculateWinner(board: BoardState): {winner: Player, combo: number[]} | null {
  for (const combo of WIN_COMBINATIONS) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  return null;
}

function isDraw(board: BoardState): boolean {
  return board.every(Boolean) && !calculateWinner(board);
}

const TicTacToeBoard: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [winner, setWinner] = useState<Player>(null);
  const [showBanner, setShowBanner] = useState(false);

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner) return;
    const nextBoard = [...board];
    nextBoard[idx] = current;
    setBoard(nextBoard);

    const res = calculateWinner(nextBoard);
    if (res) {
      setScores(s => ({ ...s, [res.winner!]: s[res.winner!] + 1 }));
      setWinner(res.winner);
      setWinningCombo(res.combo);
      setShowBanner(true);
      return;
    }
    if (isDraw(nextBoard)) {
      setScores(s => ({ ...s, draw: s.draw + 1 }));
      setWinner(null);
      setWinningCombo(null);
      setShowBanner(true);
      return;
    }
    setCurrent(current === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningCombo(null);
    // If we have a winner, next game starts with the other player
    // If it was a draw, alternate based on who went first previously
    if (winner) {
      setCurrent(winner === "X" ? "O" : "X");
    } else if (showBanner) {
      // This is a draw case
      setCurrent(current === "X" ? "O" : "X");
    }
    setShowBanner(false);
  };

  // Animations: scale and glow on active, fade in on place
  // Glassmorphism: board/card bg
  // Gradient border: board outline
  // Subtle neon shadow on active cell hover

  return (
    <div className="flex flex-col items-center">
      <ScoreBoard scores={scores} current={current || "X"} />
      {/* Game Board */}
      <div
        className="relative"
        style={{
          // Enhanced gradient border via padding + bg-clip
          background:
            "linear-gradient(102.3deg, #b993f9 5.9%, #d978fa 45%, #f8dbf5 89%)",
          padding: "6px",
          borderRadius: "2.5rem",
          boxShadow: "0 12px 50px 0 rgba(104,0,181,0.28)",
        }}
      >
        <div
          className="w-[345px] h-[345px] grid grid-cols-3 grid-rows-3 gap-2 sm:w-[390px] sm:h-[390px]
           bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl glass"
          style={{
            background:
              "linear-gradient(120deg,rgba(255,255,255,0.15) 10%,rgba(155,135,245,0.25) 44%,rgba(237,210,255,0.22) 90%)",
            borderRadius: "2rem",
          }}
        >
          {board.map((cell, i) => {
            const isWinCell =
              winner && winningCombo && winningCombo.includes(i);
            return (
              <button
                key={i}
                aria-label={`Cell ${i + 1}`}
                onClick={() => handleCellClick(i)}
                className={`group relative w-full h-full flex items-center justify-center transition
                rounded-xl font-bold bg-white/20 border-2 border-white/20 backdrop-blur-lg
                hover:shadow-[0_0_28px_0_#b993f9] hover:scale-[1.07] hover:bg-white/30
                ${cell ? "cursor-default" : "cursor-pointer"}
                ${isWinCell ? "shadow-[0_0_0_3px_#a7f5ff,0_0_25px_2px_#c77dff] border-purple-400 bg-purple-100/60" : ""}
                `}
                style={{
                  animation: cell
                    ? "fade-in 0.3s ease-out, scale-in 0.15s"
                    : undefined,
                  fontSize: "2.1rem",
                  minHeight: 0,
                  minWidth: 0,
                }}
                disabled={!!cell || !!winner}
              >
                {cell === "X" && (
                  <X
                    className="text-purple-600"
                    size={58}
                    style={{
                      filter: "drop-shadow(0 0 10px #c77dff)",
                      animation: "scale-in 0.35s cubic-bezier(.21,1.02,.65,1.59)",
                    }}
                  />
                )}
                {cell === "O" && (
                  <Circle
                    className="text-blue-400"
                    size={56}
                    style={{
                      filter: "drop-shadow(0 0 12px #3cc0fa)",
                      animation: "scale-in 0.35s cubic-bezier(.21,1.02,.65,1.59)",
                    }}
                  />
                )}
                {/* extra background/focus shimmer */}
                <span
                  className={`absolute inset-0 rounded-xl pointer-events-none transition
                    group-hover:bg-purple-100/30 group-hover:opacity-100 opacity-0`}
                ></span>
              </button>
            );
          })}
        </div>
        {/* Floating winner/draw banner */}
        <div
          className={`pointer-events-none transition-all duration-300 ease-in-out
            absolute left-1/2 z-20 -translate-x-1/2 w-[290px] sm:w-[340px]
            ${showBanner
            ? "top-1/2 -translate-y-[170%] opacity-100 animate-fade-in"
            : "top-0 -translate-y-full opacity-0"}
            `}
        >
          {winner && (
            <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl glass-morphism animate-scale-in">
              <Check size={32} className="text-green-600 drop-shadow" />
              <div className={`font-bold text-2xl tracking-wide text-gradient-primary animate-fade-in`}>
                {winner} wins!
              </div>
              <button
                aria-label="Reset game"
                onClick={handleReset}
                className="ml-3 px-3 py-1 rounded-xl bg-gradient-to-r from-purple-300 to-pink-200 hover:scale-110 focus:scale-105 transition text-purple-800 font-semibold shadow animate-pulse"
                style={{animation: "scale-in 0.22s, pulse 1.5s infinite"}}
              >
                Reset
              </button>
            </div>
          )}
          {!winner && showBanner && (
            <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl glass-morphism animate-scale-in">
              <AlertCircle size={28} className="text-amber-500 mr-1" />
              <div className="font-bold text-xl text-gray-700">Draw!</div>
              <button
                aria-label="Reset game"
                onClick={handleReset}
                className="ml-3 px-3 py-1 rounded-xl bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 hover:scale-110 transition text-purple-800 font-semibold shadow animate-pulse"
                style={{animation: "scale-in 0.22s, pulse 1.5s infinite"}}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Reset button when game ongoing */}
      {!showBanner && (
        <button
          className="mt-6 px-6 py-2 rounded-xl font-semibold text-base bg-gradient-to-br from-purple-400 to-pink-300 hover:scale-105 hover:brightness-105 text-purple-900 shadow-lg transition focus:ring-2 focus:ring-purple-300"
          style={{animation: "fade-in 0.5s"}}
          onClick={handleReset}
        >
          Reset Game
        </button>
      )}
      {/* Current player's turn */}
      {!winner && !showBanner && (
        <div className="mt-3 font-medium text-lg text-gray-700 animate-fade-in">
          <span
            className={`transition font-bold mr-1
              ${current === "X" ? "text-purple-700 animate-pulse" : "text-blue-500 animate-pulse"}
            `}
            style={{
              filter: current === "X" ? "drop-shadow(0 0 3px rgba(147, 51, 234, 0.5))" : "drop-shadow(0 0 3px rgba(59, 130, 246, 0.5))"
            }}
          >
            {current}
          </span>
          's turn
        </div>
      )}
    </div>
  );
};

export default TicTacToeBoard;
