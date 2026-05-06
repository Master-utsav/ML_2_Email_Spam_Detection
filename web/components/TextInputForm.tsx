"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TextInputFormProps } from "@/types";
import { UI_LABELS, SAMPLE_MESSAGES } from "@/constants/constants";

export function TextInputForm({ onSubmit, loading }: TextInputFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || loading) return;
    onSubmit(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit();
    }
  };

  const charCount = text.length;
  const isOverLimit = charCount > 2000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="w-full"
    >
      <div className="relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden group">
        {/* Glow border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-500/20" />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="message-input"
              className="text-sm font-semibold tracking-wide text-slate-300 uppercase font-mono"
            >
              Message Input
            </Label>
            <div className="flex items-center gap-2">
              {/* Sample buttons */}
              <button
                type="button"
                onClick={() => setText(SAMPLE_MESSAGES.spam)}
                className="text-xs px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors font-mono"
              >
                Try Spam
              </button>
              <button
                type="button"
                onClick={() => setText(SAMPLE_MESSAGES.ham)}
                className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors font-mono"
              >
                Try Ham
              </button>
            </div>
          </div>

          <div className="relative">
            <Textarea
              id="message-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={UI_LABELS.PLACEHOLDER}
              rows={7}
              className="resize-none bg-transparent border-white/10 focus:border-cyan-500/40 focus:ring-cyan-500/10 text-slate-200 placeholder:text-slate-600 text-sm leading-relaxed font-sans transition-all rounded-xl"
            />
            <AnimatePresence>
              {text.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setText("")}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-slate-400" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-mono ${
                  isOverLimit ? "text-red-400" : "text-slate-500"
                }`}
              >
                {charCount} / 2000
              </span>
              <span className="text-xs text-slate-600 hidden sm:block">
                ⌘ + Enter to analyze
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Char bar */}
              <div className="hidden sm:block w-24 h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-colors ${
                    isOverLimit
                      ? "bg-red-400"
                      : charCount > 1500
                      ? "bg-amber-400"
                      : "bg-cyan-400"
                  }`}
                  style={{ width: `${Math.min((charCount / 2000) * 100, 100)}%` }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading || !text.trim() || isOverLimit}
                className="relative overflow-hidden bg-linear-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-semibold px-6 py-2 rounded-xl border-0 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FlaskConical className="w-4 h-4 animate-spin" />
                      <span>{UI_LABELS.ANALYZING}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{UI_LABELS.ANALYZE_BUTTON}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}