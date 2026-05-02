import os
import numpy as np
import joblib
import tensorflow as tf
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Medical Risk Classifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

MODEL_DIR = os.path.join(os.path.dirname(__file__), "prepared_data")
model  = None
scaler = None

def load_models():
    global model, scaler
    if model is None:
        model  = tf.keras.models.load_model(os.path.join(MODEL_DIR, "model_mlp_final.keras"))
        scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))

# Columns that received log1p transform during training (skewness > 1)
LOG1P_COLS = {
    "income", "annual_medical_cost", "annual_premium",
    "claims_count", "avg_claim_amount", "total_claims_paid",
    "visits_last_year", "hospitalizations_last_3yrs",
    "days_hospitalized_last_3yrs", "medication_count",
    "proc_imaging_count", "proc_surgery_count",
    "proc_physio_count", "proc_consult_count", "proc_lab_count",
    "deductible", "copay", "household_size", "dependents", "chronic_count",
}

# Exact feature column order matching X_train from Final_Basic_Model.ipynb
FEATURE_ORDER = [
    "age", "income", "education", "household_size", "dependents",
    "bmi", "visits_last_year", "hospitalizations_last_3yrs",
    "days_hospitalized_last_3yrs", "medication_count",
    "systolic_bp", "diastolic_bp", "ldl", "hba1c",
    "network_tier", "deductible", "copay",
    "policy_term_years", "policy_changes_last_2yrs", "provider_quality",
    "annual_medical_cost", "annual_premium", "claims_count",
    "avg_claim_amount", "total_claims_paid", "chronic_count",
    "hypertension", "diabetes", "asthma", "copd",
    "cardiovascular_disease", "cancer_history", "kidney_disease",
    "liver_disease", "arthritis", "mental_health",
    "proc_imaging_count", "proc_surgery_count", "proc_physio_count",
    "proc_consult_count", "proc_lab_count", "had_major_procedure",
    "sex_Male", "sex_Other",
    "region_East", "region_North", "region_South", "region_West",
    "urban_rural_Suburban", "urban_rural_Urban",
    "marital_status_Married", "marital_status_Single", "marital_status_Widowed",
    "employment_status_Retired", "employment_status_Self_employed",
    "employment_status_Unemployed",
    "smoker_Former", "smoker_Never",
    "alcohol_freq_Not_Applicable", "alcohol_freq_Occasional", "alcohol_freq_Weekly",
    "plan_type_HMO", "plan_type_POS", "plan_type_PPO",
]


class PatientInput(BaseModel):
    # Continuous features
    age: float
    income: float
    education: int          # 0=No HS, 1=HS, 2=Some College, 3=Bachelors, 4=Masters, 5=Doctorate
    household_size: float
    dependents: float
    bmi: float
    visits_last_year: float
    hospitalizations_last_3yrs: float
    days_hospitalized_last_3yrs: float
    medication_count: float
    systolic_bp: float
    diastolic_bp: float
    ldl: float
    hba1c: float
    network_tier: int       # 0=Bronze, 1=Silver, 2=Gold, 3=Platinum
    deductible: float
    copay: float
    policy_term_years: float
    policy_changes_last_2yrs: float
    provider_quality: float
    annual_medical_cost: float
    annual_premium: float
    claims_count: float
    avg_claim_amount: float
    total_claims_paid: float
    chronic_count: float
    # Binary health flags
    hypertension: int
    diabetes: int
    asthma: int
    copd: int
    cardiovascular_disease: int
    cancer_history: int
    kidney_disease: int
    liver_disease: int
    arthritis: int
    mental_health: int
    proc_imaging_count: float
    proc_surgery_count: float
    proc_physio_count: float
    proc_consult_count: float
    proc_lab_count: float
    had_major_procedure: int
    # One-hot encoded categoricals
    sex_Male: int
    sex_Other: int
    region_East: int
    region_North: int
    region_South: int
    region_West: int
    urban_rural_Suburban: int
    urban_rural_Urban: int
    marital_status_Married: int
    marital_status_Single: int
    marital_status_Widowed: int
    employment_status_Retired: int
    employment_status_Self_employed: int
    employment_status_Unemployed: int
    smoker_Former: int
    smoker_Never: int
    alcohol_freq_Not_Applicable: int
    alcohol_freq_Occasional: int
    alcohol_freq_Weekly: int
    plan_type_HMO: int
    plan_type_POS: int
    plan_type_PPO: int


@app.post("/predict")
def predict(patient: PatientInput):
    load_models()
    data = patient.model_dump()

    # Build feature vector in exact training column order
    feature_vector = np.array([[data[col] for col in FEATURE_ORDER]], dtype=np.float64)

    # Apply log1p to skewed columns (same as training preprocessing)
    for i, col in enumerate(FEATURE_ORDER):
        if col in LOG1P_COLS:
            feature_vector[0][i] = np.log1p(feature_vector[0][i])

    feature_scaled = scaler.transform(feature_vector)
    prob = float(model.predict(feature_scaled, verbose=0)[0][0])
    label = "High Risk" if prob >= 0.5 else "Not High Risk"

    return {
        "prediction": label,
        "confidence": round(prob if prob >= 0.5 else 1 - prob, 4),
        "probability_high_risk": round(prob, 4),
    }


@app.get("/health")
def health():
    return {"status": "ok"}
