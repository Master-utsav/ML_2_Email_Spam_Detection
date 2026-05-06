"use client";

import { motion } from "motion/react";
import { Shield, Activity, Moon, Sun, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarProps } from "@/types";
import { APP_NAME, MODEL_ACCURACY, UI_LABELS } from "@/constants/constants";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar({ onHealthCheck, healthStatus }: NavbarProps) {
  const isHealthy =
    healthStatus.data?.status === "ok" && healthStatus.data?.model_loaded;
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 backdrop-blur-xl bg-surface-base/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Name */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-surface-base animate-pulse" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight bg-linear-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
              <div className="text-[10px] text-slate-500 font-mono tracking-widest -mt-0.5 uppercase">
                AI Shield
              </div>
            </div>
          </motion.div>

          {/* Right chips */}
          <div className="flex items-center gap-2">
            {/* Accuracy chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300"
            >
              <Activity className="w-3 h-3" />
              <span className="text-xs font-semibold font-mono">
                {MODEL_ACCURACY}
              </span>
              <span className="text-xs text-violet-400/60">
                {UI_LABELS.ANALYZING.replace("...", "")}
              </span>
            </motion.div>

            {/* Live mode chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
            >
              <Wifi className="w-3 h-3" />
              <span className="text-xs font-bold font-mono tracking-widest">
                {UI_LABELS.LIVE_MODE}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>

            {/* Health button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={onHealthCheck}
                disabled={healthStatus.loading}
                className="border-white/10 bg-white/4 hover:bg-white/8 text-slate-300 hover:text-white transition-all gap-2 font-mono text-xs"
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    healthStatus.loading
                      ? "bg-amber-400 animate-pulse"
                      : isHealthy
                      ? "bg-emerald-400"
                      : "bg-red-400"
                  }`}
                />
                {UI_LABELS.HEALTH_BUTTON}
              </Button>
            </motion.div>

            {/* Dark mode toggle */}
            {mounted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="default"
                  disabled={true}
                  size="icon"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="w-9 h-9 rounded-xl border border-white/10 bg-white/4 hover:bg-white/8 text-slate-300 hover:text-white"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
