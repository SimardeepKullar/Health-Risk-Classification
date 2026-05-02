# Health Risk Classification in Medical Insurance
## Group Members
- Simardeep Kullar
- Pravdeep Kullar

---

## Project Overview

This project builds two machine learning models to classify patients as either high-risk or not high-risk based on medical and lifestyle features. The dataset contains 100,000 patient records with 54 attributes per record.

**Dataset:** https://www.kaggle.com/datasets/mohankrishnathalla/medical-insurance-cost-prediction

**Goal:** Predict whether a patient is high-risk (`is_high_risk = 1`) or not high-risk (`is_high_risk = 0`), maximizing F1-Score and ROC-AUC for the High Risk class.

**Approach:** Two-model pipeline — Logistic Regression baseline followed by an MLP Neural Network as the advanced model.

**Recording:** Due to the video presentation being a large file we were unable to upload it here. So here is a link to the video presentation [Recording][]

**Web Application:** Here is also a link to web application [Website][]

---

## Files

| File | Description |
|---|---|
| `Final_Basic_Model.ipynb` | Baseline model — full preprocessing pipeline + Logistic Regression with cross-validation |
| `Final_Adv_Model.ipynb` | Advanced model — MLP Neural Network with hyperparameter experiments and threshold tuning |
| `medical_insurance.csv` | Raw dataset — 100,000 patients, 54 features |
| `Final_Project_Professional_Report.pdf` | Full written report covering methodology, results, and discussion |
| `Health_Risk_Classification_Presentation.pdf` | Slide deck for the video presentation |
| `Proposal.pdf` | Proposal for project |
| `Literature_Review.pdf` | Literature review for project |
| `prepared_data/` | Preprocessed artifacts (see below) |
| `website/` | Deployment artifacts for website (includes README for further details) |
> **Note:** `Final_Basic_Model.ipynb` and `Final_Adv_Model.ipynb` may not render in the GitHub repo, so to view them, please download the files.

### `prepared_data/` folder

| File | Description |
|---|---|
| `cleaned_data.csv` | Dataset after all preprocessing steps — 100,000 rows × 65 features, zero nulls |
| `scaler.pkl` | Fitted StandardScaler (trained on training split only) |
| `model_mlp_final.keras` | Saved final MLP model weights |
| `model_comparison_results.csv` | Side-by-side metrics for both models across all splits |
| `splits.pkl` | Train/val/test split indices — regenerate with `random_state=42`, 70/15/15 stratified |

> **Note:** `splits.pkl` and `cleaned_data.csv` may exceed GitHub's file size limit which is why they may be missing from the repo. To regenerate it, run the preprocessing cells in `Final_Basic_Model.ipynb` with `random_state=42`.

---

## How to Run

### Baseline Model
1. Place `medical_insurance.csv` in the **same folder** as the notebooks
2. Install required libraries (see below)
3. Open `Final_Basic_Model.ipynb` in Jupyter Notebook or JupyterLab
4. Run all cells in order: **Kernel → Restart & Run All**

### Advanced Model
1. Run `Final_Basic_Model.ipynb` first to generate the `prepared_data/` artifacts, **or** ensure `prepared_data/` is present
2. Open `Final_Adv_Model.ipynb`
3. Run all cells in order: **Kernel → Restart & Run All**

---

## Requirements

```
pandas
numpy
scikit-learn
matplotlib
seaborn
tensorflow
keras
```

Install all at once with:

```
pip install pandas numpy scikit-learn matplotlib seaborn tensorflow keras
```

---

## Notebook Structure

### `Final_Basic_Model.ipynb` — Logistic Regression

| Section | Description |
|---|---|
| 1. Import Libraries | Loads all required packages |
| 2. Load & Explore Data | Reads dataset, plots class distribution and feature correlations |
| 3. Data Preprocessing | Goes through dataset and cleans/splits it |
| 3.1 Drop Leaky Columns and Imput Missing | Removes `person_id`, `risk_score` (leakage, r=0.82), `monthly_premium` and imputes `alcohol_freq` (30,083 nulls → "Not Applicable") |
| 3.2 Encode Categorical | Ordinal encoding for `education`, `network_tier`; one-hot for 8 others |
| 3.3 Skewness Correction and Outlier Capping | log1p transform on 20 right-skewed features and clip all continuous features at 1st/99th percentiles |
| 3.4 Post Clean Up Summary | Summarizes cleaned data |
| 4 Train/Val/Test Splits | Split data for model |
| 4.1 Split Data | 70/15/15 stratified split (random_state=42) |
| 4.2 Feature Scaling | StandardScaler fit on training data only |
| 5 Save Cleaned Data | Save cleaned data and splits to be later used |
| 6. Baseline Model | Logistic Regression — lbfgs, C=1.0, class_weight='balanced' |
| 6.1 Cross-Validation | 5-fold stratified CV on training set |
| 7. Evaluation | Confusion matrix, ROC curve, PR curve, feature coefficients |
| 8. Summary | Summarize steps and thoughts |

### `Final_Adv_Model.ipynb` — MLP Neural Network

| Section | Description |
|---|---|
| 1. Import Libraries | Loads all required packages including TensorFlow/Keras |
| 2. Load Preprocessed Data | Loads artifacts from `prepared_data/` |
| 2.1 Basline metrics | Store metrics from previous logistic model |
| 2.2 Class Weights | Computes balanced class weights {0: 0.79, 1: 1.36} and output bias −0.5416 |
| 3. Model Architecture | Defines MLP: 128→64→32 neurons, BatchNorm, ReLU, Dropout(0.3), L2(1e-4) |
| 4. Hyperparameter Experiments | Experiment A (learning rate), B (dropout rate), C (network width) |
| 5. Final Model Training | Trains final model with EarlyStopping and ReduceLROnPlateau |
| 5.1 Training Curves | Loss and AUC plots across epochs |
| 6. Evaluate | Run MLP model with parameters |
| 6.1 Threshold Tuning | Sweeps 0.10–0.90, selects threshold = 0.7 (max validation macro F1) |
| 6.2 Evaluation Helper | Confusion matrix, ROC curve, PR curve across train/val/test |
| 7. Model Comparison | Side-by-side metrics: Logistic Regression vs. MLP |
| 8. Summary | Summarize steps and thoughts |

---

## Dataset Notes

- **Size:** 100,000 rows, 54 columns
- **Target column:** `is_high_risk` — `1` (high-risk) or `0` (not high-risk)
- **Class distribution:** ~63% not high-risk, ~37% high-risk
- **Missing values:** `alcohol_freq` only — 30,083 nulls (imputed as "Not Applicable")
- **Leaky feature removed:** `risk_score` (Pearson r = 0.82 with target)
- **Features after preprocessing:** 65

---

## Results Overview

### Baseline — Logistic Regression (Test Set)

| Metric | Value |
|---|---|
| Accuracy | 96.87% |
| Precision | 94.36% |
| Recall | 97.3% |
| F1-Score | 0.9581 |
| ROC-AUC | 0.9976 |

5-Fold CV: F1 mean **0.9572 ± 0.0020**, AUC mean **0.9973 ± 0.0002**

### Advanced — MLP Neural Network (Test Set, threshold = 0.7)

| Metric | Value |
|---|---|
| Accuracy | 99.54% |
| Precision | 99.42% |
| Recall | 99.33% |
| F1-Score | 0.9937 |
| ROC-AUC | 0.9999 |

The MLP produces approximately **112 fewer false negatives** on the test set compared to the Logistic Regression baseline — patients correctly identified as high-risk who would otherwise have been missed.

---

## Model Details

### Logistic Regression
- **Algorithm:** Logistic Regression (lbfgs solver)
- **Regularisation:** C = 1.0
- **Class imbalance handling:** `class_weight='balanced'`
- **Validation:** 5-fold stratified cross-validation
- **Random state:** 42

### MLP Neural Network
- **Architecture:** Dense(128) → Dense(64) → Dense(32) → Dense(1, sigmoid)
- **Regularisation:** Dropout(0.3) + BatchNorm + L2(0.0001) per layer
- **Class weights:** {0: 0.79, 1: 1.36} — computed via `compute_class_weight('balanced')`
- **Output bias init:** −0.5416 (log of positive/negative class ratio)
- **Optimizer:** Adam, learning rate = 0.001
- **Callbacks:** EarlyStopping (patience=15, monitor=val_auc), ReduceLROnPlateau (factor=0.5, patience=7)
- **Classification threshold:** 0.7 (tuned on validation set)
- **Random state:** 42

[Website]: https://aigc-5005-final.vercel.app/
[Recording]: https://youtu.be/MBYA9h2cQJM
