import { NextResponse } from "next/server";
import axios from "axios";
import { HealthResponse, ApiErrorResponse } from "@/types";
import { API_ENDPOINTS, ERROR_MESSAGES } from "@/constants/constants";

export async function GET() {
  try {
    const mlServiceUrl = process.env.NEXT_PRIVATE_ML_SERVICE_URL!;

    if (!mlServiceUrl) {
      const errorResponse: ApiErrorResponse = {
        error: ERROR_MESSAGES.SERVICE_UNAVAILABLE,
        status: 503,
      };
      return NextResponse.json(errorResponse, { status: 503 });
    }

    // 🔥 Axios GET request
    const mlResponse = await axios.get<HealthResponse>(
      `${mlServiceUrl}${API_ENDPOINTS.HEALTH}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000, // optional but recommended
      }
    );

    return NextResponse.json(mlResponse.data, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[HEALTH CHECK ERROR]", error);

    // 🔍 Axios-specific error handling
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;

      const errorResponse: ApiErrorResponse = {
        error: ERROR_MESSAGES.ML_SERVICE_ERROR,
        status,
      };

      return NextResponse.json(errorResponse, { status });
    }

    const errorResponse: ApiErrorResponse = {
      error: ERROR_MESSAGES.INTERNAL_ERROR,
      status: 500,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}