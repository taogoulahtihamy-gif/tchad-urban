import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_TOTAL_FILE_SIZE = 8 * 1024 * 1024;

function createReference() {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = crypto.randomUUID().slice(0, 6).toUpperCase();

  return `TU-${datePart}-${randomPart}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.ORDER_EMAIL;
    const from = process.env.RESEND_FROM;

    if (!apiKey || !recipient || !from) {
      console.error("Missing Resend environment variables", {
        hasApiKey: Boolean(apiKey),
        hasRecipient: Boolean(recipient),
        hasFrom: Boolean(from),
      });

      return NextResponse.json(
        {
          error: "Le service d'envoi n'est pas encore configuré.",
        },
        {
          status: 503,
        },
      );
    }

    const formData = await request.formData();

    const projectType = String(formData.get("projectType") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const brief = String(formData.get("brief") ?? "").trim();

    const files = formData
      .getAll("files")
      .filter(
        (entry): entry is File =>
          entry instanceof File && entry.size > 0,
      );

    if (!projectType || !name || !email || brief.length < 20) {
      return NextResponse.json(
        {
          error: "Les informations obligatoires sont incomplètes.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        {
          error: "L'adresse e-mail n'est pas valide.",
        },
        {
          status: 400,
        },
      );
    }

    const totalFileSize = files.reduce(
      (total, file) => total + file.size,
      0,
    );

    if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "La taille totale des fichiers dépasse 8 Mo.",
        },
        {
          status: 413,
        },
      );
    }

    const reference = createReference();

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: recipient,
      replyTo: email,
      subject: `[${reference}] Nouvelle demande — ${projectType}`,
      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #111111;
            max-width: 680px;
            margin: 0 auto;
          "
        >
          <h1 style="margin-bottom: 24px;">
            Nouvelle demande Tchad Urban
          </h1>

          <p>
            <strong>Référence :</strong>
            ${escapeHtml(reference)}
          </p>

          <p>
            <strong>Type de projet :</strong>
            ${escapeHtml(projectType)}
          </p>

          <p>
            <strong>Nom :</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>E-mail :</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>Téléphone / WhatsApp :</strong>
            ${escapeHtml(phone || "Non renseigné")}
          </p>

          <hr
            style="
              border: 0;
              border-top: 1px solid #dddddd;
              margin: 28px 0;
            "
          />

          <h2>Brief</h2>

          <p style="white-space: pre-wrap;">
            ${escapeHtml(brief)}
          </p>

          <p>
            <strong>Pièces jointes :</strong>
            ${files.length}
          </p>
        </div>
      `,
      attachments,
    });

    if (error) {
      console.error("Resend error:", {
        name: error.name,
        message: error.message,
      });

      return NextResponse.json(
        {
          error:
            error.message ||
            "Le service e-mail a refusé l'envoi.",
        },
        {
          status: 502,
        },
      );
    }

    console.log("Resend email created:", {
      reference,
      emailId: data?.id,
      recipient,
    });

    return NextResponse.json(
      {
        reference,
        emailId: data?.id,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Order submission error:", error);

    return NextResponse.json(
      {
        error: "Une erreur serveur empêche l'envoi de la demande.",
      },
      {
        status: 500,
      },
    );
  }
}