
import React from "react";

type Props = {
  scores: { X: number; O: number; draw: number };
  current: "X" | "O";
};

const ScoreBoard: React.FC<Props> = ({ scores, current }) => (
  <div className="mb-6 flex justify-center gap-6">
    <div
      className={`flex flex-col items-center px-5 py-2 rounded-xl transition-all select-none
      ${current === "X" ? "bg-purple-200 bg-opacity-50 shadow-lg scale-105" : "bg-white/10"}`}
    >
      <span className="text-xl font-bold text-purple-600 tracking-tight">X</span>
      <span className="text-lg font-semibold text-purple-900">{scores.X}</span>
    </div>
    <div
      className={`flex flex-col items-center px-5 py-2 rounded-xl transition-all select-none
      ${current === "O" ? "bg-sky-200 bg-opacity-50 shadow-lg scale-105" : "bg-white/10"}`}
    >
      <span className="text-xl font-bold text-blue-600 tracking-tight">O</span>
      <span className="text-lg font-semibold text-blue-900">{scores.O}</span>
    </div>
    <div className="flex flex-col items-center px-5 py-2 rounded-xl bg-gray-50/40">
      <span className="text-xl font-semibold text-neutral-600">Draw</span>
      <span className="text-lg font-semibold text-neutral-700">{scores.draw}</span>
    </div>
  </div>
);

export default ScoreBoard;

