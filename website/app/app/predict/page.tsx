"use client"
import { useState } from "react"

type FormState = {
  age: string
  bmi: string
  systolic_bp: string
  diastolic_bp: string
  ldl: string
  hba1c: string
  income: string
  annual_medical_cost: string
  annual_premium: string
  claims_count: string
  avg_claim_amount: string
  total_claims_paid: string
  visits_last_year: string
  hospitalizations_last_3yrs: string
  days_hospitalized_last_3yrs: string
  medication_count: string
  proc_imaging_count: string
  proc_surgery_count: string
  proc_physio_count: string
  proc_consult_count: string
  proc_lab_count: string
  deductible: string
  copay: string
  policy_term_years: string
  policy_changes_last_2yrs: string
  provider_quality: string
  household_size: string
  dependents: string
  chronic_count: string
  sex: string
  region: string
  urban_rural: string
  marital_status: string
  employment_status: string
  smoker: string
  alcohol_freq: string
  plan_type: string
  education: string
  network_tier: string
  hypertension: boolean
  diabetes: boolean
  asthma: boolean
  copd: boolean
  cardiovascular_disease: boolean
  cancer_history: boolean
  kidney_disease: boolean
  liver_disease: boolean
  arthritis: boolean
  mental_health: boolean
  had_major_procedure: boolean
}

type PredictResult = {
  prediction: string
  confidence: number
  probability_high_risk: number
}

const defaultForm: FormState = {
  age: "45",
  bmi: "27.5",
  systolic_bp: "120",
  diastolic_bp: "80",
  ldl: "130",
  hba1c: "5.7",
  income: "60000",
  annual_medical_cost: "8000",
  annual_premium: "4800",
  claims_count: "3",
  avg_claim_amount: "1500",
  total_claims_paid: "4500",
  visits_last_year: "4",
  hospitalizations_last_3yrs: "0",
  days_hospitalized_last_3yrs: "0",
  medication_count: "2",
  proc_imaging_count: "1",
  proc_surgery_count: "0",
  proc_physio_count: "0",
  proc_consult_count: "2",
  proc_lab_count: "3",
  deductible: "1500",
  copay: "30",
  policy_term_years: "2",
  policy_changes_last_2yrs: "0",
  provider_quality: "4",
  household_size: "3",
  dependents: "1",
  chronic_count: "0",
  sex: "Female",
  region: "North",
  urban_rural: "Urban",
  marital_status: "Married",
  employment_status: "Employed",
  smoker: "Never",
  alcohol_freq: "Occasional",
  plan_type: "PPO",
  education: "3",
  network_tier: "1",
  hypertension: false,
  diabetes: false,
  asthma: false,
  copd: false,
  cardiovascular_disease: false,
  cancer_history: false,
  kidney_disease: false,
  liver_disease: false,
  arthritis: false,
  mental_health: false,
  had_major_procedure: false,
}

function buildPayload(form: FormState) {
  const n = (v: string) => Number(v) || 0

  const sexMale = form.sex === "Male" ? 1 : 0
  const sexOther = form.sex === "Other" ? 1 : 0

  const regionEast = form.region === "East" ? 1 : 0
  const regionNorth = form.region === "North" ? 1 : 0
  const regionSouth = form.region === "South" ? 1 : 0
  const regionWest = form.region === "West" ? 1 : 0

  const urbanSuburban = form.urban_rural === "Suburban" ? 1 : 0
  const urbanUrban = form.urban_rural === "Urban" ? 1 : 0

  const maritalMarried = form.marital_status === "Married" ? 1 : 0
  const maritalSingle = form.marital_status === "Single" ? 1 : 0
  const maritalWidowed = form.marital_status === "Widowed" ? 1 : 0

  const empRetired = form.employment_status === "Retired" ? 1 : 0
  const empSelfEmployed = form.employment_status === "Self-employed" ? 1 : 0
  const empUnemployed = form.employment_status === "Unemployed" ? 1 : 0

  const smokerFormer = form.smoker === "Former" ? 1 : 0
  const smokerNever = form.smoker === "Never" ? 1 : 0

  const alcoholNotApplicable = form.alcohol_freq === "Not Applicable" ? 1 : 0
  const alcoholOccasional = form.alcohol_freq === "Occasional" ? 1 : 0
  const alcoholWeekly = form.alcohol_freq === "Weekly" ? 1 : 0

  const planHMO = form.plan_type === "HMO" ? 1 : 0
  const planPOS = form.plan_type === "POS" ? 1 : 0
  const planPPO = form.plan_type === "PPO" ? 1 : 0

  return {
    age: n(form.age),
    income: n(form.income),
    education: n(form.education),
    household_size: n(form.household_size),
    dependents: n(form.dependents),
    bmi: n(form.bmi),
    visits_last_year: n(form.visits_last_year),
    hospitalizations_last_3yrs: n(form.hospitalizations_last_3yrs),
    days_hospitalized_last_3yrs: n(form.days_hospitalized_last_3yrs),
    medication_count: n(form.medication_count),
    systolic_bp: n(form.systolic_bp),
    diastolic_bp: n(form.diastolic_bp),
    ldl: n(form.ldl),
    hba1c: n(form.hba1c),
    network_tier: n(form.network_tier),
    deductible: n(form.deductible),
    copay: n(form.copay),
    policy_term_years: n(form.policy_term_years),
    policy_changes_last_2yrs: n(form.policy_changes_last_2yrs),
    provider_quality: n(form.provider_quality),
    annual_medical_cost: n(form.annual_medical_cost),
    annual_premium: n(form.annual_premium),
    claims_count: n(form.claims_count),
    avg_claim_amount: n(form.avg_claim_amount),
    total_claims_paid: n(form.total_claims_paid),
    chronic_count: n(form.chronic_count),
    hypertension: form.hypertension ? 1 : 0,
    diabetes: form.diabetes ? 1 : 0,
    asthma: form.asthma ? 1 : 0,
    copd: form.copd ? 1 : 0,
    cardiovascular_disease: form.cardiovascular_disease ? 1 : 0,
    cancer_history: form.cancer_history ? 1 : 0,
    kidney_disease: form.kidney_disease ? 1 : 0,
    liver_disease: form.liver_disease ? 1 : 0,
    arthritis: form.arthritis ? 1 : 0,
    mental_health: form.mental_health ? 1 : 0,
    proc_imaging_count: n(form.proc_imaging_count),
    proc_surgery_count: n(form.proc_surgery_count),
    proc_physio_count: n(form.proc_physio_count),
    proc_consult_count: n(form.proc_consult_count),
    proc_lab_count: n(form.proc_lab_count),
    had_major_procedure: form.had_major_procedure ? 1 : 0,
    sex_Male: sexMale,
    sex_Other: sexOther,
    region_East: regionEast,
    region_North: regionNorth,
    region_South: regionSouth,
    region_West: regionWest,
    urban_rural_Suburban: urbanSuburban,
    urban_rural_Urban: urbanUrban,
    marital_status_Married: maritalMarried,
    marital_status_Single: maritalSingle,
    marital_status_Widowed: maritalWidowed,
    employment_status_Retired: empRetired,
    employment_status_Self_employed: empSelfEmployed,
    employment_status_Unemployed: empUnemployed,
    smoker_Former: smokerFormer,
    smoker_Never: smokerNever,
    alcohol_freq_Not_Applicable: alcoholNotApplicable,
    alcohol_freq_Occasional: alcoholOccasional,
    alcohol_freq_Weekly: alcoholWeekly,
    plan_type_HMO: planHMO,
    plan_type_POS: planPOS,
    plan_type_PPO: planPPO,
  }
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}

const inputCls =
  "border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
const selectCls = inputCls

const cardCls = "rounded-xl border border-gray-200 bg-white shadow-sm p-5"

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export default function PredictPage() {
  const [form, setForm] = useState<FormState>(defaultForm)
  const [result, setResult] = useState<PredictResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function set(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const payload = buildPayload(form)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const res = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`API error ${res.status}: ${text}`)
      }
      const data: PredictResult = await res.json()
      setResult(data)
    } catch (e: unknown) {
      setError(
        e instanceof Error
          ? e.message
          : "Could not reach the prediction server. Check that the API is running."
      )
    }
    setLoading(false)
  }

  const isHighRisk = result?.prediction === "High Risk"

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Patient Risk Prediction</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Fill in the patient details below and click Predict to get a real-time risk
          classification from the deployed MLP model.
        </p>
      </div>

      <div className="space-y-6">
        {/* Demographics */}
        <section className={cardCls}>
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Demographics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Age">
              <input type="number" className={inputCls} value={form.age} onChange={(e) => set("age", e.target.value)} />
            </Field>
            <Field label="Sex">
              <select className={selectCls} value={form.sex} onChange={(e) => set("sex", e.target.value)}>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Region">
              <select className={selectCls} value={form.region} onChange={(e) => set("region", e.target.value)}>
                <option>East</option>
                <option>North</option>
                <option>South</option>
                <option>West</option>
              </select>
            </Field>
            <Field label="Urban / Rural">
              <select className={selectCls} value={form.urban_rural} onChange={(e) => set("urban_rural", e.target.value)}>
                <option value="Rural">Rural</option>
                <option value="Suburban">Suburban</option>
                <option value="Urban">Urban</option>
              </select>
            </Field>
            <Field label="Education">
              <select className={selectCls} value={form.education} onChange={(e) => set("education", e.target.value)}>
                <option value="0">No High School</option>
                <option value="1">High School</option>
                <option value="2">Some College</option>
                <option value="3">Bachelor&apos;s</option>
                <option value="4">Master&apos;s</option>
                <option value="5">Doctorate</option>
              </select>
            </Field>
            <Field label="Marital Status">
              <select className={selectCls} value={form.marital_status} onChange={(e) => set("marital_status", e.target.value)}>
                <option>Divorced</option>
                <option>Married</option>
                <option>Single</option>
                <option>Widowed</option>
              </select>
            </Field>
            <Field label="Employment Status">
              <select className={selectCls} value={form.employment_status} onChange={(e) => set("employment_status", e.target.value)}>
                <option>Employed</option>
                <option>Retired</option>
                <option value="Self-employed">Self-employed</option>
                <option>Unemployed</option>
              </select>
            </Field>
            <Field label="Household Size">
              <input type="number" className={inputCls} value={form.household_size} onChange={(e) => set("household_size", e.target.value)} />
            </Field>
            <Field label="Dependents">
              <input type="number" className={inputCls} value={form.dependents} onChange={(e) => set("dependents", e.target.value)} />
            </Field>
            <Field label="Annual Income ($)">
              <input type="number" className={inputCls} value={form.income} onChange={(e) => set("income", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Clinical / Lifestyle */}
        <section className={cardCls}>
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Clinical &amp; Lifestyle
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="BMI">
              <input type="number" step="0.1" className={inputCls} value={form.bmi} onChange={(e) => set("bmi", e.target.value)} />
            </Field>
            <Field label="Systolic BP (mmHg)">
              <input type="number" className={inputCls} value={form.systolic_bp} onChange={(e) => set("systolic_bp", e.target.value)} />
            </Field>
            <Field label="Diastolic BP (mmHg)">
              <input type="number" className={inputCls} value={form.diastolic_bp} onChange={(e) => set("diastolic_bp", e.target.value)} />
            </Field>
            <Field label="LDL (mg/dL)">
              <input type="number" className={inputCls} value={form.ldl} onChange={(e) => set("ldl", e.target.value)} />
            </Field>
            <Field label="HbA1c (%)">
              <input type="number" step="0.1" className={inputCls} value={form.hba1c} onChange={(e) => set("hba1c", e.target.value)} />
            </Field>
            <Field label="Smoker Status">
              <select className={selectCls} value={form.smoker} onChange={(e) => set("smoker", e.target.value)}>
                <option>Current</option>
                <option>Former</option>
                <option>Never</option>
              </select>
            </Field>
            <Field label="Alcohol Frequency">
              <select className={selectCls} value={form.alcohol_freq} onChange={(e) => set("alcohol_freq", e.target.value)}>
                <option value="Not Applicable">Not Applicable</option>
                <option value="Occasional">Occasional</option>
                <option value="Weekly">Weekly</option>
              </select>
            </Field>
            <Field label="Chronic Conditions Count">
              <input type="number" className={inputCls} value={form.chronic_count} onChange={(e) => set("chronic_count", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Conditions */}
        <section className={cardCls}>
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Conditions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {(
              [
                ["hypertension", "Hypertension"],
                ["diabetes", "Diabetes"],
                ["asthma", "Asthma"],
                ["copd", "COPD"],
                ["cardiovascular_disease", "Cardiovascular Disease"],
                ["cancer_history", "Cancer History"],
                ["kidney_disease", "Kidney Disease"],
                ["liver_disease", "Liver Disease"],
                ["arthritis", "Arthritis"],
                ["mental_health", "Mental Health Condition"],
                ["had_major_procedure", "Had Major Procedure"],
              ] as [keyof FormState, string][]
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-blue-600"
                  checked={form[key] as boolean}
                  onChange={(e) => set(key, e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        {/* Insurance */}
        <section className={cardCls}>
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Insurance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Plan Type">
              <select className={selectCls} value={form.plan_type} onChange={(e) => set("plan_type", e.target.value)}>
                <option>HMO</option>
                <option>POS</option>
                <option>PPO</option>
              </select>
            </Field>
            <Field label="Network Tier">
              <select className={selectCls} value={form.network_tier} onChange={(e) => set("network_tier", e.target.value)}>
                <option value="0">Bronze</option>
                <option value="1">Silver</option>
                <option value="2">Gold</option>
                <option value="3">Platinum</option>
              </select>
            </Field>
            <Field label="Deductible ($)">
              <input type="number" className={inputCls} value={form.deductible} onChange={(e) => set("deductible", e.target.value)} />
            </Field>
            <Field label="Copay ($)">
              <input type="number" className={inputCls} value={form.copay} onChange={(e) => set("copay", e.target.value)} />
            </Field>
            <Field label="Policy Term (years)">
              <input type="number" className={inputCls} value={form.policy_term_years} onChange={(e) => set("policy_term_years", e.target.value)} />
            </Field>
            <Field label="Policy Changes (last 2 yrs)">
              <input type="number" className={inputCls} value={form.policy_changes_last_2yrs} onChange={(e) => set("policy_changes_last_2yrs", e.target.value)} />
            </Field>
            <Field label="Provider Quality (1–5)">
              <input type="number" min="1" max="5" step="0.1" className={inputCls} value={form.provider_quality} onChange={(e) => set("provider_quality", e.target.value)} />
            </Field>
            <Field label="Annual Premium ($)">
              <input type="number" className={inputCls} value={form.annual_premium} onChange={(e) => set("annual_premium", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Utilization */}
        <section className={cardCls}>
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Utilization &amp; Claims
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Visits Last Year">
              <input type="number" className={inputCls} value={form.visits_last_year} onChange={(e) => set("visits_last_year", e.target.value)} />
            </Field>
            <Field label="Hospitalizations (last 3 yrs)">
              <input type="number" className={inputCls} value={form.hospitalizations_last_3yrs} onChange={(e) => set("hospitalizations_last_3yrs", e.target.value)} />
            </Field>
            <Field label="Days Hospitalized (last 3 yrs)">
              <input type="number" className={inputCls} value={form.days_hospitalized_last_3yrs} onChange={(e) => set("days_hospitalized_last_3yrs", e.target.value)} />
            </Field>
            <Field label="Medication Count">
              <input type="number" className={inputCls} value={form.medication_count} onChange={(e) => set("medication_count", e.target.value)} />
            </Field>
            <Field label="Annual Medical Cost ($)">
              <input type="number" className={inputCls} value={form.annual_medical_cost} onChange={(e) => set("annual_medical_cost", e.target.value)} />
            </Field>
            <Field label="Claims Count">
              <input type="number" className={inputCls} value={form.claims_count} onChange={(e) => set("claims_count", e.target.value)} />
            </Field>
            <Field label="Avg Claim Amount ($)">
              <input type="number" className={inputCls} value={form.avg_claim_amount} onChange={(e) => set("avg_claim_amount", e.target.value)} />
            </Field>
            <Field label="Total Claims Paid ($)">
              <input type="number" className={inputCls} value={form.total_claims_paid} onChange={(e) => set("total_claims_paid", e.target.value)} />
            </Field>
            <Field label="Imaging Procedures">
              <input type="number" className={inputCls} value={form.proc_imaging_count} onChange={(e) => set("proc_imaging_count", e.target.value)} />
            </Field>
            <Field label="Surgery Procedures">
              <input type="number" className={inputCls} value={form.proc_surgery_count} onChange={(e) => set("proc_surgery_count", e.target.value)} />
            </Field>
            <Field label="Physio Procedures">
              <input type="number" className={inputCls} value={form.proc_physio_count} onChange={(e) => set("proc_physio_count", e.target.value)} />
            </Field>
            <Field label="Consult Procedures">
              <input type="number" className={inputCls} value={form.proc_consult_count} onChange={(e) => set("proc_consult_count", e.target.value)} />
            </Field>
            <Field label="Lab Procedures">
              <input type="number" className={inputCls} value={form.proc_lab_count} onChange={(e) => set("proc_lab_count", e.target.value)} />
            </Field>
          </div>
        </section>
      </div>

      {/* Sticky submit footer */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 -mx-6 px-6 py-4 mt-8">
        <button
          onClick={handleSubmit}
          disabled={loading}
          aria-busy={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-lg font-semibold text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? (
            <>
              <Spinner />
              Predicting…
            </>
          ) : (
            "Predict Risk"
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div
          className={`mt-6 p-6 rounded-xl border-2 flex items-start gap-4 ${
            isHighRisk
              ? "border-red-300 bg-red-50"
              : "border-green-300 bg-green-50"
          }`}
        >
          <span className={`text-3xl leading-none ${isHighRisk ? "text-red-500" : "text-green-500"}`}>
            {isHighRisk ? "⚠" : "✓"}
          </span>
          <div>
            <p className={`text-2xl font-bold ${isHighRisk ? "text-red-700" : "text-green-700"}`}>
              {result.prediction}
            </p>
            <p className="text-gray-700 mt-1">
              Confidence:{" "}
              <span className="font-semibold">{(result.confidence * 100).toFixed(1)}%</span>
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              Probability of high risk: {(result.probability_high_risk * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
