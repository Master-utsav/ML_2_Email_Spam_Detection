// ─── API Request / Response Types ───────────────────────────────────────────

export interface PredictRequest {
  text: string;
}

export interface PredictResponse {
  input: string;
  prediction: 0 | 1;
  label: "spam" | "ham";
}

export interface HealthResponse {
  status: "ok" | "error";
  model_loaded: boolean;
}

export interface ApiErrorResponse {
  error: string;
  status: number;
}

// ─── Hook State Types ────────────────────────────────────────────────────────

export type PredictState = {
  data: PredictResponse | null;
  loading: boolean;
  error: string | null;
};

export type HealthState = {
  data: HealthResponse | null;
  loading: boolean;
  error: string | null;
  lastChecked: Date | null;
};

// ─── UI Types ────────────────────────────────────────────────────────────────

export type SpamLabel = "spam" | "ham";

export interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
    result: PredictResponse | null;
    randInt: number;
}

export interface NavbarProps {
  onHealthCheck: () => void;
  healthStatus: HealthState;
}

export interface TextInputFormProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

export interface HealthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  health: HealthState;
  onRefresh: () => void;
}