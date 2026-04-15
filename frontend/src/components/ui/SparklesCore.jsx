import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';

const random = (min, max) => Math.random() * (max - min) + min;

const Sparkle = ({ size, color, delay, duration, style }) => {
  return (
    <motion.div
      className={clsx("absolute rounded-full", color || "bg-cyan-400")}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
};

export const SparklesCore = ({ 
  background, 
  minSize, 
  maxSize, 
  particleDensity = 120, 
  className, 
  particleColor="bg-white" 
}) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: particleDensity }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        size: random(minSize || 1, maxSize || 3),
        delay: random(0, 2),
        duration: random(2, 5),
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, [maxSize, minSize, particleDensity]);

  return (
    <div className={clsx("absolute inset-0 block h-full w-full pointer-events-none", className)}>
      {background && <div className="absolute inset-0 bg-transparent animate-pulse-slow" style={{ background }} />}
      {sparkles.map((s) => (
        <Sparkle
          key={s.id}
          size={s.size}
          color={particleColor}
          delay={s.delay}
          duration={s.duration}
          style={{ top: s.y, left: s.x }}
        />
      ))}
    </div>
  );
};

export default SparklesCore;
