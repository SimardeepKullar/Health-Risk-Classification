import Link from "next/link"

const metrics = [
  {
    model: "Logistic Regression (Baseline)",
    accuracy: "96.87%",
    precision: "94.36%",
    recall: "97.30%",
    f1: "95.81%",
    auc: "99.76%",
  },
  {
    model: "MLP Neural Network (Advanced)",
    accuracy: "99.54%",
    precision: "99.17%",
    recall: "99.58%",
    f1: "99.38%",
    auc: "99.99%",
  },
]

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-14">
      {/* Hero */}
      <section className="rounded-2xl bg-slate-50 border border-slate-200 px-8 py-10 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Medical Insurance Risk Classifier
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Binary classification model predicting whether a patient is at high health risk
          using a 100,000-row insurance dataset and a TensorFlow MLP neural network.
        </p>
        <Link
          href="/predict"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Try the Predictor →
        </Link>
      </section>

      {/* Problem Statement */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">Problem</h2>
        <p className="text-gray-700">
          Insurance providers need to identify high-risk patients early to manage costs and
          improve care. This project builds a machine learning pipeline that predicts whether
          an individual is <strong>high health risk</strong> based on demographics, clinical
          metrics, insurance utilization, and lifestyle factors.
        </p>
      </section>

      {/* Dataset */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">Dataset</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>100,000 synthetic patient records</li>
          <li>65 features including demographics, clinical labs, insurance plan details, and procedure counts</li>
          <li>Binary target: <code className="bg-gray-100 px-1 rounded font-mono text-sm">is_high_risk</code></li>
          <li>Class balance addressed during preprocessing; no SMOTE required</li>
        </ul>
      </section>

      {/* Preprocessing */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">Preprocessing</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Dropped duplicates and rows with missing values</li>
          <li>Applied <code className="bg-gray-100 px-1 rounded font-mono text-sm">log1p</code> transformation to 20 right-skewed features</li>
          <li>One-hot encoded categorical variables (sex, region, marital status, employment, smoker, alcohol, plan type)</li>
          <li>Ordinal encoding for education and network tier</li>
          <li>StandardScaler applied to the full feature matrix before training</li>
          <li>70/15/15 train/validation/test split with stratification</li>
        </ul>
      </section>

      {/* Models */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 space-y-2">
            <h3 className="font-semibold text-gray-800">Baseline — Logistic Regression</h3>
            <p className="text-sm text-gray-600">
              L2-regularized logistic regression trained on the scaled feature matrix.
              Serves as the interpretable reference point for the advanced model.
            </p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 shadow-sm p-5 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">Advanced — MLP Neural Network</h3>
              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">Deployed</span>
            </div>
            <p className="text-sm text-gray-600">
              3-layer fully connected network (256 → 128 → 64 units) with ReLU activations,
              batch normalization, dropout regularization, and a sigmoid output.
              Trained with Adam optimizer and early stopping.
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Results — Test Set</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Model</th>
                <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700">Accuracy</th>
                <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700">Precision</th>
                <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700">Recall</th>
                <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700">F1-Score</th>
                <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700">ROC-AUC</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((row, i) => (
                <tr key={row.model} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 font-medium text-gray-800">{row.model}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{row.accuracy}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{row.precision}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{row.recall}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{row.f1}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{row.auc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          The MLP achieved a 2.67 pp accuracy improvement over logistic regression, with
          near-perfect ROC-AUC of 99.99% on the held-out test set.
        </p>
      </section>

      {/* CTA */}
      <section className="border-t pt-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-gray-600 flex-1">
          Enter a patient profile and receive a real-time high-risk prediction from the
          deployed MLP model.
        </p>
        <Link
          href="/predict"
          className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
        >
          Open Prediction Form →
        </Link>
      </section>
    </main>
  )
}
