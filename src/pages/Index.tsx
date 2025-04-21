
import React from "react";
import TicTacToeBoard from "../components/TicTacToeBoard";

const Index = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{
      background:
        "linear-gradient(120deg, #fdfcfb 0%, #e2d1c3 100%)",
    }}
  >
    <div className="max-w-2xl px-5 w-full">
      <h1 className="text-4xl md:text-5xl font-extrabold pb-7 md:pb-12 text-center text-gradient-primary tracking-tight"
        style={{ letterSpacing: "-.02em" }}>
        Aurora TicTacToe
      </h1>
      <div className="mb-7 text-lg md:text-xl text-center font-medium text-zinc-700">
        A modern, animated take on the classic game.<br />
        <span className="opacity-60 text-base">Play against a friend – first to win!</span>
      </div>
      <div className="flex justify-center">
        <TicTacToeBoard />
      </div>
      <div className="mt-10 text-sm text-center opacity-60">
        Made with 💜 by Lovable AI
      </div>
    </div>
  </div>
);

export default Index;

