"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultModalProps } from "@/types";

export function ResultModal({ isOpen, onClose, result, randInt }: ResultModalProps) {
    const isSpam = result?.label === "spam";

  // Close on Escape
    useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && result && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className={`relative w-full max-w-lg rounded-2xl overflow-hidden border ${
                isSpam
                  ? "border-red-500/30 shadow-2xl shadow-red-500/10"
                  : "border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
              } bg-surface-card`}
            >
              {/* Top linear bar */}
              <div
                className={`h-1 w-full ${
                  isSpam
                    ? "bg-linear-to-r from-red-500 via-orange-400 to-red-600"
                    : "bg-linear-to-r from-emerald-400 via-cyan-400 to-teal-500"
                }`}
              />

              {/* Background glow */}
              <div
                className={`absolute inset-0 pointer-events-none ${
                  isSpam
                    ? "bg-linear-to-br from-red-500/5 via-transparent to-transparent"
                    : "bg-linear-to-br from-emerald-500/5 via-transparent to-transparent"
                }`}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                {/* Icon + Verdict */}
                <div className="flex flex-col items-center gap-5 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                      isSpam
                        ? "bg-red-500/15 ring-2 ring-red-500/30"
                        : "bg-emerald-500/15 ring-2 ring-emerald-500/30"
                    }`}
                  >
                    {isSpam ? (
                      <ShieldAlert className="w-10 h-10 text-red-400" />
                    ) : (
                      <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    )}
                  </motion.div>

                  <div className="space-y-1">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className={`text-xs font-bold font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full inline-block ${
                        isSpam
                          ? "bg-red-500/15 text-red-400 border border-red-500/25"
                          : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                      }`}
                    >
                      {isSpam ? "⚠ Spam Detected" : "✓ Legitimate Message"}
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-display font-black tracking-tight mt-2"
                    >
                      <span
                        className={
                          isSpam
                            ? "bg-linear-to-r from-red-300 to-orange-300 bg-clip-text text-transparent"
                            : "bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"
                        }
                      >
                        {result.label.toUpperCase()}
                      </span>
                    </motion.h2>
                  </div>
                </div>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-7 grid grid-cols-2 gap-3"
                >
                  <div className="rounded-xl bg-white/4 border border-white/[0.07] p-4 text-center">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                      Prediction
                    </div>
                    <div className="text-2xl font-black font-mono text-slate-100">
                      {result.prediction}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {result.prediction === 1 ? "Positive" : "Negative"}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/4 border border-white/[0.07] p-4 text-center">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                      Confidence
                    </div>
                    <div className="text-2xl font-black font-mono text-slate-100">
                      High
                    </div>
                    <div className="flex justify-center gap-1 mt-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.35 + i * 0.06 }}
                          className={`w-1.5 h-4 rounded-full ${
                            isSpam
                              ? i <= randInt
                                ? "bg-red-400"
                                : "bg-white/10"
                              : i <= randInt
                              ? "bg-emerald-400"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Input preview */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 rounded-xl bg-white/3 border border-white/6 p-4"
                >
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Zap className="w-3 h-3" />
                    Analyzed Text
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 italic">
                    &ldquo;{result.input}&rdquo;
                  </p>
                </motion.div>

                {/* Action */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <Button
                    onClick={onClose}
                    className="w-full bg-white/6 hover:bg-white/10 text-slate-200 border border-white/10 rounded-xl font-semibold transition-all"
                  >
                    Analyze Another Message
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
