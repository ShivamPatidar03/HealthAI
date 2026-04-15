import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

class Particle {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };

    this.closeEnoughTarget = 100;
    this.maxSpeed = 1.0;
    this.maxForce = 0.1;
    this.particleSize = 10;
    this.isKilled = false;

    this.startColor = { r: 56, g: 189, b: 248 }; // Brand Cyan
    this.targetColor = { r: 56, g: 189, b: 248 };
    this.colorWeight = 0;
    this.colorBlendRate = 0.01;
  }

  move() {
    let proximityMult = 1;
    const distance = Math.sqrt(
      Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2)
    );

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    };

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y);
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult;
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult;
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    };

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx, drawAsPoints) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    };

    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    if (drawAsPoints) {
      ctx.fillRect(this.pos.x, this.pos.y, 2.5, 2.5);
    } else {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  kill(width, height) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2;
      const mag = Math.max(width, height);
      this.target.x = width / 2 + Math.cos(angle) * mag;
      this.target.y = height / 2 + Math.sin(angle) * mag;

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      };
      this.targetColor = { r: 10, g: 15, b: 28 }; // Fade into navy background
      this.colorWeight = 0;
      this.isKilled = true;
    }
  }
}

const DEFAULT_WORDS = ["HealthAI", "System Ready"];

export function ParticleTextEffect({ onComplete, words = DEFAULT_WORDS }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);
  const [progress, setProgress] = useState(0);

  const pixelSteps = 4; // Higher density for premium look
  const drawAsPoints = true;

  const generateRandomPos = (x, y, mag) => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: x + Math.cos(angle) * mag,
      y: y + Math.sin(angle) * mag,
    };
  };

  const nextWord = (word, canvas) => {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const offscreenCtx = offscreenCanvas.getContext("2d");

    const fontSize = window.innerWidth < 768 ? 80 : 120;
    offscreenCtx.fillStyle = "white";
    offscreenCtx.font = `bold ${fontSize}px Inter, sans-serif`;
    offscreenCtx.textAlign = "center";
    offscreenCtx.textBaseline = "middle";
    offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2);

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Use brand-aligned random colors (Cyan to Blue/Purple)
    const newColor = Math.random() > 0.5 
      ? { r: 56, g: 189, b: 248 } // Cyan
      : { r: 139, g: 92, b: 246 }; // Purple

    const particles = particlesRef.current;
    let particleIndex = 0;

    const coordsIndexes = [];
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i);
    }

    // Shuffle for fluid transition
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]];
    }

    for (const coordIndex of coordsIndexes) {
      const alpha = pixels[coordIndex + 3];

      if (alpha > 0) {
        const x = (coordIndex / 4) % canvas.width;
        const y = Math.floor(coordIndex / 4 / canvas.width);

        let particle;
        if (particleIndex < particles.length) {
          particle = particles[particleIndex];
          particle.isKilled = false;
          particleIndex++;
        } else {
          particle = new Particle();
          const startPos = generateRandomPos(canvas.width / 2, canvas.height / 2, canvas.width);
          particle.pos.x = startPos.x;
          particle.pos.y = startPos.y;
          particle.maxSpeed = Math.random() * 8 + 6;
          particle.maxForce = particle.maxSpeed * 0.08;
          particle.particleSize = Math.random() * 4 + 4;
          particle.colorBlendRate = Math.random() * 0.03 + 0.01;
          particlesRef.current.push(particle);
        }

        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        };
        particle.targetColor = newColor;
        particle.colorWeight = 0;
        particle.target.x = x;
        particle.target.y = y;
      }
    }

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height);
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = particlesRef.current;

    ctx.fillStyle = "rgba(10, 15, 28, 0.2)"; // Deep navy with trail
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.move();
      particle.draw(ctx, drawAsPoints);

      if (particle.isKilled) {
        if (
          particle.pos.x < -100 ||
          particle.pos.x > canvas.width + 100 ||
          particle.pos.y < -100 ||
          particle.pos.y > canvas.height + 100
        ) {
          particles.splice(i, 1);
        }
      }
    }

    frameCountRef.current++;
    
    // Increased frame interval (210 instead of 150) to allow words to resolve
    const frameInterval = 210;
    const totalDuration = words.length * frameInterval;
    const currentProgress = (frameCountRef.current / totalDuration) * 100;
    setProgress(Math.min(currentProgress, 100));

    if (frameCountRef.current % frameInterval === 0) {
      if (wordIndexRef.current < words.length - 1) {
        wordIndexRef.current++;
        nextWord(words[wordIndexRef.current], canvas);
      } else {
        // Final word reached, give it a moment then complete
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1200);
        return;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    nextWord(words[0], canvas);
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0a0f1c] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(12,166,233,0.1)_0%,_transparent_70%)]" />
      
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />

      {/* Loading Progress Bar (The "Loading Line") */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 md:w-96 flex flex-col items-center gap-3">
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between w-full opacity-40 text-[10px] uppercase tracking-[0.3em] font-medium text-cyan-400">
           <span>Engine Initialization</span>
           <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}

export default ParticleTextEffect;
