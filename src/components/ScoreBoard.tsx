
import React from "react";

type Props = {
  scores: { X: number; O: number; draw: number };
  current: "X" | "O";
};

const ScoreBoard: React.FC<Props> = ({ scores, current }) => (
  <div className="mb-8 flex justify-center gap-6">
    <div
      className={`flex flex-col items-center px-6 py-3 rounded-xl transition-all duration-300 select-none
      ${current === "X" ? "bg-purple-200 bg-opacity-80 shadow-lg scale-110 border border-purple-300" : "bg-white/20"}`}
      style={{
        animation: current === "X" ? "pulse 2s infinite" : undefined,
        boxShadow: current === "X" ? "0 0 15px rgba(168, 85, 247, 0.4)" : undefined,
      }}
    >
      <span className="text-2xl font-bold text-purple-600 tracking-tight" 
        style={{
          filter: current === "X" ? "drop-shadow(0 0 3px rgba(147, 51, 234, 0.7))" : undefined
        }}>X</span>
      <span className="text-xl font-semibold text-purple-900">{scores.X}</span>
    </div>
    <div
      className={`flex flex-col items-center px-6 py-3 rounded-xl transition-all duration-300 select-none
      ${current === "O" ? "bg-blue-200 bg-opacity-70 shadow-lg scale-110 border border-blue-300" : "bg-white/20"}`}
      style={{
        animation: current === "O" ? "pulse 2s infinite" : undefined,
        boxShadow: current === "O" ? "0 0 15px rgba(96, 165, 250, 0.4)" : undefined,
      }}
    >
      <span className="text-2xl font-bold text-blue-600 tracking-tight"
        style={{
          filter: current === "O" ? "drop-shadow(0 0 3px rgba(37, 99, 235, 0.7))" : undefined
        }}>O</span>
      <span className="text-xl font-semibold text-blue-900">{scores.O}</span>
    </div>
    <div className="flex flex-col items-center px-6 py-3 rounded-xl bg-gray-100/40 border border-gray-200/50 shadow-sm">
      <span className="text-xl font-semibold text-neutral-600">Draw</span>
      <span className="text-xl font-semibold text-neutral-700">{scores.draw}</span>
    </div>
  </div>
);

export default ScoreBoard;
