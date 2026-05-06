"use client";

import { motion } from "motion/react";
import { APP_NAME, APP_TAGLINE } from "@/constants/constants";

export function HeroSection() {
  return (
    <div className="text-center space-y-4 py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold tracking-widest uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        AI-Powered Detection
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight"
      >
        <span className="text-white">{APP_NAME}</span>
        <br />
        <span className="bg-linear-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
          {APP_TAGLINE}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
      >
        Instantly detect spam with machine learning. Paste any message and get
        a real-time verdict powered by our trained model.
      </motion.p>
    </div>
  );
}