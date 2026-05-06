import { useState, useCallback } from "react";
import axios from "axios";
import { PredictState } from "@/types";
import { NEXT_API, ERROR_MESSAGES } from "@/constants/constants";
import { toast } from "sonner";

export function usePredict() {
  const [state, setState] = useState<PredictState>({
    data: null,
    loading: false,
    error: null,
  });

  const predict = useCallback(async (text: string): Promise<boolean> => {
    if (!text.trim()) {
      toast.error(ERROR_MESSAGES.EMPTY_TEXT);
      return false;
    }

    setState({ data: null, loading: true, error: null });

    try {
      const response = await axios.post(
        NEXT_API.PREDICT,
        { text: text.trim() },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000, // optional
        }
      );

      setState({ data: response.data, loading: false, error: null });
      return true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errMsg = ERROR_MESSAGES.NETWORK_ERROR;

      if (axios.isAxiosError(error)) {
        errMsg =
          error.response?.data?.error ||
          ERROR_MESSAGES.INTERNAL_ERROR;
      }

      setState({ data: null, loading: false, error: errMsg });
      toast.error(errMsg);

      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, predict, reset };
}