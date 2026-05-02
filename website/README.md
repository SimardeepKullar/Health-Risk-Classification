# AIGC 5005 — Phase 6: Deployment
## Health Risk Classification — Web Application

This is the deployment component for the AIGC 5005 final project (Phase 6). It wraps the trained MLP model in a live web app that lets a user input a patient profile and receive a real-time high-risk / not-high-risk prediction.

**Live App:** [aigc-5005-final.vercel.app](https://aigc-5005-final.vercel.app/)

---

## Architecture

| Service | Technology | Hosting | Role |
|---------|------------|---------|------|
| Frontend | Next.js (TypeScript) | Vercel | Patient input form + results display |
| Backend API | FastAPI (Python) | Render | Loads model + scaler, exposes `POST /predict` |

The frontend sends patient data to the API via `NEXT_PUBLIC_API_URL` and displays the prediction result in real time.

---

## Repository Structure

```
aigc-5005-final/
├── api/                          # FastAPI backend
│   ├── main.py                   # /predict and /health endpoints
│   ├── requirements.txt
│   └── prepared_data/
│       ├── model_mlp_final.keras # Trained MLP model
│       └── scaler.pkl            # Fitted StandardScaler
└── app/                          # Next.js frontend
    ├── app/
    │   ├── page.tsx              # Landing page — project summary + results table
    │   └── predict/page.tsx      # Prediction form — calls the API
    ├── .env.example              # Environment variable template
    └── ...
```

---

## API

**Base URL (production):** deployed on Render

### `POST /predict`

Accepts a JSON patient profile and returns a binary prediction.

**Request body:**
```json
{
  "age": 45,
  "bmi": 28.5,
  "smoker": "yes",
  ...
}
```

**Response:**
```json
{
  "prediction": 1,
  "probability": 0.94,
  "label": "High Risk"
}
```

### `GET /health`

Returns `200 OK` if the API is running and the model is loaded.

---

## Running Locally

### Prerequisites
- Python 3.11+
- Node.js 18+

### 1. Start the API

```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend

```bash
cd app
cp .env.example .env.local
# In .env.local, set: NEXT_PUBLIC_API_URL=http://localhost:8000
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

### Backend — Render

- **Service type:** Web Service
- **Runtime:** Python 3.11
- **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Root directory:** `api/`
- The `prepared_data/` folder (model + scaler) is committed to the repo and loaded on startup

### Frontend — Vercel

- **Framework:** Next.js
- **Root directory:** `app/`
- **Environment variable:** `NEXT_PUBLIC_API_URL` → set to your Render API URL
- Vercel auto-deploys on every push to `main`
