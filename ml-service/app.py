from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

# -------------------------
# Initialize FastAPI
# -------------------------
app = FastAPI(
    title="Spam Detection API",
    description="Predict whether an email is spam or ham",
    version="1.0"
)

# ── Enable CORS ──────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load Model & Scalers ─────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "models", "spam_predictor_model.joblib")

# -------------------------
# Load trained pipeline
# -------------------------

model = joblib.load(model_path)

# -------------------------
# Request Schema
# -------------------------
class EmailRequest(BaseModel):
    text: str

# -------------------------
# Health Check Route
# -------------------------
@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": True
    }

# -------------------------
# Prediction Route
# -------------------------
@app.post("/predict")
def predict(req: EmailRequest):
    text = req.text.strip()

    # Prediction (pipeline handles vectorization)
    pred = model.predict([text])[0]

    return {
        "input": text,
        "prediction": int(pred),
        "label": "spam" if pred == 1 else "ham"
    }


# -------------------------
# localhost
# -------------------------

# if __name__ == "__main__":
#     import uvicorn

#     host = os.getenv("HOST", "127.0.0.1")
#     port = int(os.getenv("PORT", 5000))

#     uvicorn.run("app:app", host=host, port=port, reload=True)