"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

const PROJECT_TYPES = [
  "Sortie musicale",
  "Concert / festival",
  "Portrait d'artiste",
  "Campagne",
  "Événement culturel",
  "Autre",
] as const;

const MAX_TOTAL_FILE_SIZE = 8 * 1024 * 1024;
const DRAFT_KEY = "tchad-urban-order-draft";

type OrderDraft = {
  projectType: string;
  name: string;
  email: string;
  phone: string;
  brief: string;
};

const EMPTY_DRAFT: OrderDraft = {
  projectType: "",
  name: "",
  email: "",
  phone: "",
  brief: "",
};

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<OrderDraft>(EMPTY_DRAFT);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DRAFT_KEY);
      if (saved) setDraft({ ...EMPTY_DRAFT, ...JSON.parse(saved) });
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [draft]);

  const totalFileSize = useMemo(
    () => files.reduce((total, file) => total + file.size, 0),
    [files],
  );

  function updateField(field: keyof OrderDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function selectProjectType(projectType: string) {
    updateField("projectType", projectType);
    setStep(2);
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const nextTotal = selectedFiles.reduce((total, file) => total + file.size, 0);

    if (nextTotal > MAX_TOTAL_FILE_SIZE) {
      setFiles([]);
      event.target.value = "";
      setError("La taille totale des fichiers ne doit pas dépasser 8 Mo.");
      return;
    }

    setFiles(selectedFiles);
    setError("");
  }

  function validateDetails() {
    if (!draft.name.trim()) return "Renseignez votre nom.";
    if (!draft.email.trim()) return "Renseignez votre adresse e-mail.";
    if (!/^\S+@\S+\.\S+$/.test(draft.email)) return "L'adresse e-mail n'est pas valide.";
    if (draft.brief.trim().length < 20) return "Le brief doit contenir au moins 20 caractères.";
    return "";
  }

  function goToReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateDetails();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep(3);
  }

  async function submitOrder() {
    const validationError = validateDetails();
    if (!draft.projectType || validationError) {
      setError(validationError || "Choisissez un type de projet.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const body = new FormData();
      body.append("projectType", draft.projectType);
      body.append("name", draft.name.trim());
      body.append("email", draft.email.trim());
      body.append("phone", draft.phone.trim());
      body.append("brief", draft.brief.trim());
      files.forEach((file) => body.append("files", file));

      const response = await fetch("/api/orders", { method: "POST", body });
      const result = (await response.json()) as { reference?: string; error?: string };

      if (!response.ok) throw new Error(result.error || "Impossible d'envoyer la demande.");

      setReference(result.reference || "TU-COMMANDE");
      setDraft(EMPTY_DRAFT);
      setFiles([]);
      window.localStorage.removeItem(DRAFT_KEY);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Une erreur inattendue est survenue.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (reference) {
    return (
      <main className="page-main order-page">
        <OrderHero />
        <section className="order-panel">
          <div className="success">
            <p style={{ color: "var(--yellow)", textTransform: "uppercase", fontSize: 9 }}>
              Demande envoyée
            </p>
            <h2>BRIEF REÇU</h2>
            <p>
              Votre demande a bien été transmise à Tchad Urban. Conservez cette référence :
            </p>
            <p style={{ color: "var(--white)", fontSize: 20, fontWeight: 800 }}>{reference}</p>
            <button
              type="button"
              onClick={() => {
                setReference("");
                setStep(1);
              }}
            >
              Nouvelle demande ↗
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-main order-page">
      <OrderHero />

      <section className="order-panel">
        <div className="steps" aria-label="Progression de la demande">
          {[1, 2, 3].map((number) => (
            <span key={number} className={step === number ? "active" : ""}>
              {number}
            </span>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2>TYPE DE PROJET</h2>
            <div className="choice-grid">
              {PROJECT_TYPES.map((type) => (
                <button key={type} type="button" onClick={() => selectProjectType(type)}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={goToReview}>
            <h2>DÉTAILS DU PROJET</h2>
            <div className="form-grid">
              <label>
                Nom
                <input
                  value={draft.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Nom et prénom"
                  autoComplete="name"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={draft.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="vous@email.com"
                  autoComplete="email"
                />
              </label>

              <label className="full">
                Téléphone / WhatsApp
                <input
                  value={draft.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Facultatif"
                  autoComplete="tel"
                />
              </label>

              <label className="full">
                Brief
                <textarea
                  rows={6}
                  value={draft.brief}
                  onChange={(event) => updateField("brief", event.target.value)}
                  placeholder="Objectif, date souhaitée, formats, références visuelles…"
                  maxLength={3000}
                />
              </label>

              <label className="full upload">
                Photos, logo ou documents — 8 Mo maximum au total
                <input type="file" multiple onChange={handleFiles} />
                {files.length > 0 && (
                  <span style={{ color: "var(--white)", lineHeight: 1.6 }}>
                    {files.map((file) => file.name).join(" · ")} — {(totalFileSize / 1024 / 1024).toFixed(2)} Mo
                  </span>
                )}
              </label>
            </div>

            {error && <p style={{ color: "#ff8f8f", fontSize: 12 }}>{error}</p>}

            <div style={{ display: "flex", gap: 12 }}>
              <button className="next" type="button" onClick={() => setStep(1)}>
                Retour
              </button>
              <button className="next" type="submit">
                Continuer →
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="success">
            <h2>DEMANDE PRÊTE</h2>
            <p>Relisez vos informations puis envoyez votre brief à Tchad Urban.</p>

            <div style={{ borderTop: "1px solid var(--line)", margin: "28px 0" }}>
              <ReviewLine label="Projet" value={draft.projectType} />
              <ReviewLine label="Nom" value={draft.name} />
              <ReviewLine label="Email" value={draft.email} />
              {draft.phone && <ReviewLine label="Contact" value={draft.phone} />}
              <ReviewLine label="Fichiers" value={files.length ? `${files.length} fichier(s)` : "Aucun"} />
            </div>

            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.65 }}>{draft.brief}</p>
            {error && <p style={{ color: "#ff8f8f", fontSize: 12 }}>{error}</p>}

            <div style={{ display: "flex", gap: 12 }}>
              <button type="button" onClick={() => setStep(2)} disabled={isSubmitting}>
                Modifier
              </button>
              <button type="button" onClick={submitOrder} disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours…" : "Envoyer la demande ↗"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function OrderHero() {
  return (
    <section className="page-hero order-hero">
      <p>Commander</p>
      <h1>
        FAISONS
        <br />
        REMARQUER
        <br />
        VOTRE PROJET.
      </h1>
      <span>Un brief simple, des fichiers clairs et une réponse structurée.</span>
    </section>
  );
}

function ReviewLine({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 20,
        padding: "13px 0",
        borderBottom: "1px solid var(--line)",
        fontSize: 10,
        textTransform: "uppercase",
      }}
    >
      <span style={{ color: "var(--muted)" }}>{label}</span>
      <strong style={{ textAlign: "right" }}>{value}</strong>
    </div>
  );
}
