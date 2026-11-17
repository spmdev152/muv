import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

/**
 * Sends an email through the SMTP server in `SMTP_URL`
 * (`smtps://user:password@mail.clinicamuv.com:465`).
 *
 * Without `SMTP_URL`, development writes the message as an `.eml` file in
 * `.mail/` so the form can be tested without credentials; production refuses
 * to send, and the form tells the visitor to write to the clinic directly.
 */
export class MailNotConfiguredError extends Error {}

export function mailFrom(): string {
  return process.env.EMAIL_FROM ?? "Web MUV <info@clinicamuv.com>";
}

export async function sendMail(message: Mail.Options): Promise<void> {
  const url = process.env.SMTP_URL;

  if (url) {
    await nodemailer.createTransport(url).sendMail(message);

    return;
  }

  if (process.env.NODE_ENV === "production" && !process.env.MAIL_OUTBOX) {
    throw new MailNotConfiguredError("SMTP_URL is not set");
  }

  const { message: raw } = await nodemailer
    .createTransport({ streamTransport: true, buffer: true, newline: "unix" })
    .sendMail(message);
  const dir = path.join(
    // The outbox is a runtime folder, not a build input: keep it out of tracing.
    /* turbopackIgnore: true */ process.cwd(), process.env.MAIL_OUTBOX ?? ".mail");
  const file = path.join(dir, `${new Date().toISOString().replace(/[:.]/g, "-")}.eml`);

  await mkdir(dir, { recursive: true });
  await writeFile(file, raw as Buffer);
  console.info(`[mail] SMTP_URL not set, message saved to ${file}`);
}
