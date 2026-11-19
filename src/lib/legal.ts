import { site } from "@/lib/site";

/**
 * Data of the website owner for the legal notice, privacy and cookie policies
 * (#60). Required by LSSI-CE art. 10 and GDPR art. 13.
 *
 * Owner and tax ID confirmed by MUV on 17/11/2026 (the "B" of the NIF is a
 * sociedad limitada). PENDIENTE MUV: every `undefined` value. While one is missing, the legal pages
 * show a visible "Pendiente" marker, are served with `noindex` and stay out of
 * the sitemap, so incomplete legal texts never reach Google.
 */
export const legal = {
  /** Razón social (or the full name of the self-employed owner). */
  owner: "Kinetic Care, S.L." as string | undefined,
  /** NIF / CIF. */
  taxId: "B55384945" as string | undefined,
  /** Domicilio social. */
  registeredAddress: undefined as string | undefined,
  /** Registro Mercantil entry, only when the owner is a company. */
  commercialRegistry: undefined as string | undefined,
  /** Mailbox for data-protection requests. */
  privacyEmail: site.email,
  /** How long unsolicited CVs are kept before deletion. */
  cvRetention: "un año desde su recepción",
  professionalBody: {
    name: "Ilustre Colegio Profesional de Fisioterapeutas de la Comunidad de Madrid",
    url: "https://www.cfisiomad.com",
  },
  /** Last review of the three texts (YYYY-MM-DD). */
  updated: "2026-11-17",
};

export const LEGAL_PAGES = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Política de cookies", href: "/politica-de-cookies" },
] as const;

/** Whether every owner field is filled in, so the pages can be indexed. */
export function isLegalComplete(): boolean {
  return Boolean(legal.owner && legal.taxId && legal.registeredAddress);
}

/** Legal name for the footer and the policies, with the trade name as fallback. */
export function ownerName(): string {
  return legal.owner ?? site.legalName;
}
