"use server";

import { headers } from "next/headers";
import {
  CLINIC_OPTIONS,
  POSITION_OPTIONS,
  cvProblem,
  type ApplicationState,
} from "@/lib/contact";
import { MailNotConfiguredError, mailFrom, sendMail } from "@/lib/mail.server";
import { site } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\s.-]{6,20}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

/** PDF, DOC (OLE2) and DOCX (ZIP), by their first bytes. */
const SIGNATURES: { ext: RegExp; bytes: number[]; type: string }[] = [
  { ext: /\.pdf$/i, bytes: [0x25, 0x50, 0x44, 0x46], type: "application/pdf" },
  {
    ext: /\.doc$/i,
    bytes: [0xd0, 0xcf, 0x11, 0xe0],
    type: "application/msword",
  },
  {
    ext: /\.docx$/i,
    bytes: [0x50, 0x4b, 0x03, 0x04],
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
];

function text(data: FormData, name: string, max: number): string {
  const value = data.get(name);

  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Removes line breaks so a value cannot inject email headers. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

function labelOf(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((o) => o.value === value)?.label;
}

async function isRateLimited(): Promise<boolean> {
  const list = await headers();
  const ip = list.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  hits.push(now);
  recent.set(ip, hits);

  return hits.length > MAX_PER_WINDOW;
}

async function readCv(file: File) {
  const problem = cvProblem(file);

  if (problem) return { ok: false, problem } as const;

  const buffer = Buffer.from(await file.arrayBuffer());
  const match = SIGNATURES.find(
    (s) =>
      s.ext.test(file.name) && s.bytes.every((byte, i) => buffer[i] === byte),
  );

  if (!match) {
    return {
      ok: false,
      problem: "El archivo no es un PDF o Word válido.",
    } as const;
  }

  return {
    ok: true,
    buffer,
    type: match.type,
    ext: file.name.split(".").pop()?.toLowerCase() ?? "pdf",
  } as const;
}

function slug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

/**
 * Emails a job application with the CV attached to `CAREERS_EMAIL` (#66). The
 * CV is never stored on the server.
 */
export async function sendApplication(
  _prev: ApplicationState,
  data: FormData,
): Promise<ApplicationState> {
  if (text(data, "web", 200)) return { status: "success" };

  const name = oneLine(text(data, "nombre", 120));
  const email = oneLine(text(data, "email", 200));
  const phone = oneLine(text(data, "telefono", 30));
  const message = text(data, "mensaje", 5000);
  const errors: Record<string, string> = {};

  if (!name) errors.nombre = "Indique su nombre.";
  if (!EMAIL_RE.test(email)) errors.email = "Revise el email.";
  if (phone && !PHONE_RE.test(phone)) errors.telefono = "Revise el teléfono.";
  if (data.get("privacidad") !== "on") {
    errors.privacidad = "Necesitamos su consentimiento para tratar sus datos.";
  }

  const lines = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Teléfono: ${phone || "-"}`,
  ];
  let attachments: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[] = [];
  const clinic = labelOf(CLINIC_OPTIONS, text(data, "sede", 40));
  const position = labelOf(POSITION_OPTIONS, text(data, "puesto", 40));
  const collegiate = oneLine(text(data, "colegiado", 20));
  const file = data.get("cv");

  if (!clinic) errors.sede = "Elija una clínica.";
  if (!position) errors.puesto = "Elija un puesto.";

  if (!(file instanceof File) || file.size === 0) {
    errors.cv = "Adjunte su CV.";
  } else {
    const cv = await readCv(file);

    if (!cv.ok) {
      errors.cv = cv.problem;
    } else {
      attachments = [
        {
          filename: `CV-${slug(name) || "candidato"}.${cv.ext}`,
          content: cv.buffer,
          contentType: cv.type,
        },
      ];
    }
  }

  lines.push(
    `Clínica: ${clinic}`,
    `Puesto: ${position}`,
    `Nº de colegiado: ${collegiate || "-"}`,
  );

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Revise los campos marcados.", errors };
  }

  if (await isRateLimited()) {
    return {
      status: "error",
      message:
        "Ha enviado varias candidaturas seguidas. Inténtelo de nuevo en unos minutos.",
    };
  }

  try {
    await sendMail({
      from: mailFrom(),
      to: process.env.CAREERS_EMAIL ?? site.email,
      replyTo: { name, address: email },
      subject: `Candidatura: ${name} · ${position} · ${clinic}`,
      text: `${lines.join("\n")}\n\n${message || "(sin mensaje)"}\n\n— Enviado desde el formulario de ${site.url}/contacto`,
      attachments,
    });
  } catch (error) {
    console.error(
      "[empleo] application not sent:",
      error instanceof Error ? error.message : error,
    );

    return {
      status: "error",
      message:
        error instanceof MailNotConfiguredError
          ? `El formulario no está disponible ahora mismo. Escríbanos a ${site.email}.`
          : `No hemos podido enviar su candidatura. Inténtelo de nuevo o escríbanos a ${site.email}.`,
    };
  }

  return {
    status: "success",
    message:
      "Hemos recibido su candidatura. Si encaja con lo que buscamos, nos pondremos en contacto con usted.",
  };
}
