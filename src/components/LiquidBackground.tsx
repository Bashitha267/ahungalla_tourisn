import React from 'react';

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#020710] w-full h-full">
      {/* Ambient glowing blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[320px] h-[320px] sm:w-[650px] sm:h-[650px] rounded-full bg-cyan-500/15 blur-[80px] sm:blur-[140px] mix-blend-screen animate-blob-one" />
      <div className="absolute top-[20%] right-[-15%] w-[350px] h-[350px] sm:w-[750px] sm:h-[750px] rounded-full bg-teal-500/12 blur-[90px] sm:blur-[150px] mix-blend-screen animate-blob-two" />
      <div className="absolute bottom-[15%] left-[-10%] w-[320px] h-[320px] sm:w-[650px] sm:h-[650px] rounded-full bg-blue-600/12 blur-[80px] sm:blur-[140px] mix-blend-screen animate-blob-three" />
      <div className="absolute bottom-[-10%] right-[10%] w-[350px] h-[350px] sm:w-[700px] sm:h-[700px] rounded-full bg-cyan-400/15 blur-[90px] sm:blur-[150px] mix-blend-screen animate-blob-four" />
      
      {/* Vignette gradient to blend edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#020710_95%)] opacity-85" />
    </div>
  );
}
