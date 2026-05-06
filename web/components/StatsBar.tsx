"use client";

import { motion } from "motion/react";
import { Brain, Clock, Shield, BarChart3 } from "lucide-react";

const stats = [
  { icon: Brain, label: "ML Model", value: "SVM", sub: "classifier" },
  { icon: BarChart3, label: "Accuracy", value: "97%", sub: "on test set" },
  { icon: Clock, label: "Latency", value: "<50ms", sub: "avg response" },
  { icon: Shield, label: "Protection", value: "Real-time", sub: "detection" },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
          className="rounded-xl bg-white/3 border border-white/6 px-4 py-3.5 flex items-center gap-3 group hover:bg-white/5 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/15 transition-colors">
            <stat.icon className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider truncate">
              {stat.label}
            </div>
            <div className="text-sm font-bold text-slate-200 leading-tight">{stat.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}