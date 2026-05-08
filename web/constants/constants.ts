// ─── App Meta ────────────────────────────────────────────────────────────────

export const APP_NAME = "UtsavAI";
export const APP_TAGLINE = "AI-Powered Message Intelligence";
export const APP_VERSION = "v1.0";

// ─── Model Stats ─────────────────────────────────────────────────────────────

export const MODEL_ACCURACY = "97%";
export const MODEL_ACCURACY_LABEL = "Accuracy";

// ─── API Endpoints (Next.js internal) ────────────────────────────────────────

export const NEXT_API = {
  PREDICT: "/api/model/predict",
  HEALTH: "/api/model/health",
} as const;

// ─── ML Service Endpoints (FastAPI) ──────────────────────────────────────────

export const API_ENDPOINTS = {
  PREDICT: "/predict",
  HEALTH: "/health",
} as const;

// ─── Error Messages ───────────────────────────────────────────────────────────

export const ERROR_MESSAGES = {
  INVALID_INPUT: "Text input is required and must be a non-empty string.",
  SERVICE_UNAVAILABLE: "ML service URL is not configured.",
  ML_SERVICE_ERROR: "ML service returned an error.",
  INTERNAL_ERROR: "An unexpected error occurred. Please try again.",
  NETWORK_ERROR: "Unable to reach the server. Check your connection.",
  EMPTY_TEXT: "Please enter some text to analyze.",
} as const;

// ─── UI Labels ────────────────────────────────────────────────────────────────

export const UI_LABELS = {
  ANALYZE_BUTTON: "Analyze Message",
  ANALYZING: "Analyzing...",
  CLEAR: "Clear",
  PLACEHOLDER:
    "Paste or type your message here...\n\nExample: \"Congratulations! You've won a $1000 gift card. Click here to claim now!\"",
  RESULT_SPAM: "SPAM DETECTED",
  RESULT_HAM: "LEGITIMATE",
  HEALTH_BUTTON: "Health",
  HEALTH_DIALOG_TITLE: "Service Health",
  HEALTH_REFRESH: "Refresh",
  LIVE_MODE: "LIVE",
  DARK_MODE: "Dark",
  LIGHT_MODE: "Light",
} as const;

// ─── Spam / Ham Theme Colors (Tailwind class fragments) ───────────────────────

export const LABEL_STYLES = {
  spam: {
    bg: "bg-red-500/10",
    border: "border-red-500/40",
    text: "text-red-400",
    glow: "shadow-red-500/20",
    badge: "bg-red-500",
  },
  ham: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    badge: "bg-emerald-500",
  },
} as const;

// ─── Sample Messages ──────────────────────────────────────────────────────────

export const SAMPLE_MESSAGES = {
  spam: "URGENT: Your account has been compromised! Click here NOW to verify your identity and claim your $500 reward before it expires: http://totally-legit-site.com/claim",
  ham: "Hey, just wanted to confirm our meeting is still on for Thursday at 2pm. Let me know if you need to reschedule.",
} as const;

// ─── Health Check Interval (ms) ──────────────────────────────────────────────

export const HEALTH_CHECK_INTERVAL = 60_000; // 1 minute