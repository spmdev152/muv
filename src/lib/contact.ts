/**
 * Shared rules of the job application form (#66): the client uses them to give
 * instant feedback, and the server action enforces them again.
 */

export const CLINIC_OPTIONS = [
  { value: "el-canaveral", label: "MUV El Cañaveral" },
  { value: "tres-cantos", label: "MUV Tres Cantos" },
  { value: "cualquiera", label: "Cualquiera de las dos" },
] as const;

export const POSITION_OPTIONS = [
  { value: "fisioterapeuta", label: "Fisioterapeuta" },
  { value: "recepcion", label: "Recepción y atención al paciente" },
  { value: "otro", label: "Otro puesto" },
] as const;

/** 5 MB: a CV never needs more, and it keeps the request small. */
export const CV_MAX_BYTES = 5 * 1024 * 1024;

export const CV_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field name -> message, shown next to the field. */
  errors?: Partial<Record<string, string>>;
};

/** Checks extension and size; the server also checks the file signature. */
export function cvProblem(file: { name: string; size: number }): string | null {
  if (file.size === 0) return "Adjunte su currículum.";
  if (!/\.(pdf|docx?)$/i.test(file.name)) {
    return "El currículum tiene que ser un PDF o un documento de Word (.doc, .docx).";
  }
  if (file.size > CV_MAX_BYTES) return "El currículum no puede pasar de 5 MB.";

  return null;
}
