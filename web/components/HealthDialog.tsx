"use client";

import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Server, Cpu, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HealthDialogProps } from "@/types";
import { UI_LABELS } from "@/constants/constants";

export function HealthDialog({ isOpen, onClose, health, onRefresh }: HealthDialogProps) {
  const isHealthy = health.data?.status === "ok" && health.data?.model_loaded;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-surface-card border-white/8 shadow-2xl rounded-2xl overflow-hidden p-0">
        {/* Top bar */}
        <div
          className={`h-0.5 w-full ${
            isHealthy
              ? "bg-linear-to-r from-emerald-400 to-cyan-400"
              : "bg-linear-to-r from-red-500 to-orange-400"
          }`}
        />

        <div className="p-6">
          <DialogHeader className="mb-5">
            <DialogTitle className="text-lg font-display font-bold text-slate-100 flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              {UI_LABELS.HEALTH_DIALOG_TITLE}
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {health.loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10 gap-3"
              >
                <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                <span className="text-sm text-slate-400 font-mono">Checking service...</span>
              </motion.div>
            ) : health.error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-300">Service Unreachable</p>
                  <p className="text-xs text-slate-400 mt-0.5">{health.error}</p>
                </div>
              </motion.div>
            ) : health.data ? (
              <motion.div
                key="data"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {/* Status row */}
                <div className="flex items-center justify-between rounded-xl bg-white/4 border border-white/[0.07] px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Server className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Service Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {health.data.status === "ok" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-sm font-bold font-mono uppercase ${
                        health.data.status === "ok" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {health.data.status}
                    </span>
                  </div>
                </div>

                {/* Model loaded row */}
                <div className="flex items-center justify-between rounded-xl bg-white/4 border border-white/[0.07] px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Model Loaded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold font-mono ${
                        health.data.model_loaded ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      {health.data.model_loaded ? "TRUE" : "FALSE"}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        health.data.model_loaded ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Last checked */}
                {health.lastChecked && (
                  <p className="text-xs text-center text-slate-600 font-mono pt-1">
                    Last checked {health.lastChecked.toLocaleTimeString()}
                  </p>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={onRefresh}
              disabled={health.loading}
              variant="outline"
              className="flex-1 border-white/10 bg-white/4 hover:bg-white/8 text-slate-300 gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${health.loading ? "animate-spin" : ""}`} />
              {UI_LABELS.HEALTH_REFRESH}
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-white/6 hover:bg-white/10 text-slate-200 border border-white/10"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}