import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { HealthState } from "@/types";
import { NEXT_API, ERROR_MESSAGES, HEALTH_CHECK_INTERVAL } from "@/constants/constants";

export function useHealth(autoCheck = true) {
  const [state, setState] = useState<HealthState>({
    data: null,
    loading: false,
    error: null,
    lastChecked: null,
  });

  const check = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await axios.get(NEXT_API.HEALTH, {
        timeout: 5000, // optional
      });

      setState({
        data: response.data,
        loading: false,
        error: null,
        lastChecked: new Date(),
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errMsg = ERROR_MESSAGES.NETWORK_ERROR;

      if (axios.isAxiosError(error)) {
        errMsg =
          error.response?.data?.error ||
          ERROR_MESSAGES.INTERNAL_ERROR;
      }

      setState({
        data: null,
        loading: false,
        error: errMsg,
        lastChecked: new Date(),
      });
    }
  }, []);

  useEffect(() => {
    if (!autoCheck) return;

    const timeout = window.setTimeout(check, 0);
    const interval = window.setInterval(check, HEALTH_CHECK_INTERVAL);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [autoCheck, check]);

  const isHealthy =
    state.data?.status === "ok" && state.data?.model_loaded === true;

  return { ...state, check, isHealthy };
}