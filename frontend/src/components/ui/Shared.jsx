import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const GlowCard = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className={clsx(
        "relative rounded-2xl glass-card border border-white/10 p-6 overflow-hidden group transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export const SectionHeading = ({ preTitle, title, description, align = 'center' }) => {
  return (
    <div className={clsx("flex flex-col mb-16", align === 'center' ? 'items-center text-center' : 'items-start text-left')}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full glass border border-blue-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        {preTitle}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
