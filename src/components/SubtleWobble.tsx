'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const SubtleWobble = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculates cursor position as a percentage from the center (-0.5 to 0.5)
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;

    // Multiply by a small number to set the maximum rotation angle (e.g., 6 degrees)
    setMousePosition({ 
      rotateX: yPct * -6, 
      rotateY: xPct * 6 
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ rotateX: 0, rotateY: 0 });
      }}
      animate={{
        rotateX: isHovered ? mousePosition.rotateX : 0,
        rotateY: isHovered ? mousePosition.rotateY : 0,
        scale: isHovered ? 1.02 : 1, // Adds a very slight pop-out effect
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 30, // Higher damping = less bouncy/jittery
        mass: 0.5 
      }}
      style={{ transformPerspective: 1000 }} // Required to make the 3D tilt look realistic
      className={`relative inline-block w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};