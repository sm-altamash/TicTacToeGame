
import React from "react";
import TicTacToeBoard from "../components/TicTacToeBoard";

const Index = () => (
  <div
    className="min-h-screen flex items-center justify-center py-12"
    style={{
      background:
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      backgroundAttachment: "fixed",
    }}
  >
    <div className="max-w-2xl px-5 w-full">
      <h1 
        className="text-4xl md:text-5xl font-extrabold pb-7 md:pb-10 text-center text-gradient-primary tracking-tight animate-float"
        style={{ 
          letterSpacing: "-.02em",
          textShadow: "0 2px 10px rgba(168, 85, 247, 0.15)",
          filter: "drop-shadow(0 8px 16px rgba(168, 85, 247, 0.2))"
        }}>
        Aurora TicTacToe
      </h1>
      <div className="mb-7 text-lg md:text-xl text-center font-medium text-zinc-700 animate-fade-in">
        A modern, animated take on the classic game.<br />
        <span className="opacity-70 text-base">Play against a friend – first to win!</span>
      </div>
      <div className="flex justify-center animate-fade-in">
        <TicTacToeBoard />
      </div>
      <div className="mt-10 text-sm text-center text-gray-500 animate-fade-in">
        Made with 💜 by Lovable AI
      </div>
    </div>
  </div>
);

export default Index;
