'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ThreeDCard({ children, className = '' }: ThreeDCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Track coordinates of the cursor relative to the card container
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Configure smooth spring animations
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  // Translate coordinates to -0.5 to 0.5 range when hovering
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of cursor relative to center of card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Normalize values to -0.5 to 0.5
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Touch tracking for mobile users
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current || e.touches.length === 0) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const touch = e.touches[0];
    const touchX = touch.clientX - rect.left - width / 2;
    const touchY = touch.clientY - rect.top - height / 2;
    
    x.set(Math.max(-0.5, Math.min(0.5, touchX / width)));
    y.set(Math.max(-0.5, Math.min(0.5, touchY / height)));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className={`perspective-1000 select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        className="w-full h-full preserve-3d"
      >
        {children}
      </motion.div>
    </div>
  );
}
