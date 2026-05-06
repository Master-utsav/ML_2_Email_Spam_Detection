"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/section/HeroSection";
import { TextInputForm } from "@/components/TextInputForm";
import { ResultModal } from "@/components/ResultModal";
import { HealthDialog } from "@/components/HealthDialog";
import { StatsBar } from "@/components/StatsBar";
import { usePredict } from "@/hooks/usePredict";
import { useHealth } from "@/hooks/useHealth";
import { useRandInt } from "@/hooks/useRandInt";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [healthOpen, setHealthOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const {randInt , setRandInt} = useRandInt(1, 5);

  const { data: result, loading, predict, reset } = usePredict();
  const health = useHealth(true);

  const handlePredict = async (text: string) => {
    const success = await predict(text);
    if (success) {
      setRandInt(Math.floor(Math.random() * 5) + 1);
      setResultOpen(true);
    }
  };

  const handleCloseResult = () => {
    setResultOpen(false);
    reset();
  };

  const handleHealthClick = () => {
    setHealthOpen(true);
    health.check();
  };

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-b from-cyan-500/4 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-100 h-100 bg-violet-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-75 h-75 bg-fuchsia-500/3 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Navbar
        onHealthCheck={handleHealthClick}
        healthStatus={health}
      />

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-10">
        <HeroSection />
        <StatsBar />
        <TextInputForm onSubmit={handlePredict} loading={loading} />

        {/* How it works */}
        <div className="text-center">
          <p className="text-xs text-slate-600 font-mono">
            Model trained on Email Spam Collection Dataset &bull; TF-IDF + SVM (Support Vector Machine)
          </p>
        </div>
      </main>
        <Footer/>

      {/* Modals */}
      <ResultModal isOpen={resultOpen} onClose={handleCloseResult} result={result} randInt={randInt}/>
      <HealthDialog
        isOpen={healthOpen}
        onClose={() => setHealthOpen(false)}
        health={health}
        onRefresh={health.check}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#13131f",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#e2e8f0",
          },
        }}
      />
    </div>
  );
}