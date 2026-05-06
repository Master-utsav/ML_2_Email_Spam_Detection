import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PredictRequest, PredictResponse, ApiErrorResponse } from "@/types";
import { API_ENDPOINTS, ERROR_MESSAGES } from "@/constants/constants";

export async function POST(request: NextRequest) {
  try {
    const body: PredictRequest = await request.json();

    if (!body.text || typeof body.text !== "string" || body.text.trim() === "") {
      const errorResponse: ApiErrorResponse = {
        error: ERROR_MESSAGES.INVALID_INPUT,
        status: 400,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const mlServiceUrl = process.env.NEXT_PRIVATE_ML_SERVICE_URL!;

    if (!mlServiceUrl) {
      const errorResponse: ApiErrorResponse = {
        error: ERROR_MESSAGES.SERVICE_UNAVAILABLE,
        status: 503,
      };
      return NextResponse.json(errorResponse, { status: 503 });
    }

    // 🔥 Axios request
    const mlResponse = await axios.post<PredictResponse>(
      `${mlServiceUrl}${API_ENDPOINTS.PREDICT}`,
      { text: body.text.trim() },
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
    console.error("[PREDICT API ERROR]", error);

    // 🔍 Axios error handling
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