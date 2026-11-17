"use client";

import {
  startTransition,
  useActionState,
  useId,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { sendContact } from "@/app/contacto/actions";
import {
  CLINIC_OPTIONS,
  CV_ACCEPT,
  POSITION_OPTIONS,
  cvProblem,
  isReason,
  type ContactState,
  type Reason,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

const field =
  "w-full rounded-2xl border border-olive-900/15 bg-white px-4 py-3 text-olive-900 outline-none transition-colors placeholder:text-ink-soft/60 focus:border-olive-500 aria-[invalid=true]:border-red-700/60";

const REASON_OPTIONS: { value: Reason; label: string; hint: string }[] = [
  { value: "consulta", label: "Consulta o cita", hint: "Dudas, tratamientos o citas" },
  { value: "empleo", label: "Trabajar en MUV", hint: "Envíenos su CV" },
];

const INITIAL: ContactState = { status: "idle" };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-1.5 px-1 text-xs text-red-800">
      {message}
    </p>
  );
}

/**
 * Contact form (#66). Visitors either send an enquiry or apply for a job with
 * their CV; a server action emails it to the clinic. `/contacto?motivo=empleo`
 * opens it in job-application mode.
 */
export function ContactForm() {
  const params = useSearchParams();
  const fromUrl = params.get("motivo");
  const [reason, setReason] = useState<Reason>(isReason(fromUrl) ? fromUrl : "consulta");
  const [position, setPosition] = useState("");
  const [cvError, setCvError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    async (prev: ContactState, data: FormData) => {
      const result = await sendContact(prev, data);

      if (result.status === "success") {
        formRef.current?.reset();
        setPosition("");
      }

      return result;
    },
    INITIAL,
  );
  const id = useId();
  const errors: Partial<Record<string, string>> = { ...state.errors };

  if (cvError) errors.cv = cvError;

  const isJob = reason === "empleo";

  function handleCvChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];

    setCvError(file ? cvProblem(file) : null);
  }

  /**
   * Submits through \`startTransition\` instead of \`<form action>\`: React resets
   * a form after its action runs, and the visitor would lose what they typed
   * when the server returns a validation error.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cvError) return;

    const data = new FormData(event.currentTarget);

    startTransition(() => action(data));
  }

  function describedBy(name: string) {
    return errors[name] ? `${id}-${name}-error` : undefined;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-olive-800">
          ¿Por qué nos escribe?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {REASON_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer flex-col rounded-2xl border px-4 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-olive-500",
                reason === option.value
                  ? "border-olive-500 bg-olive-50"
                  : "border-olive-900/15 bg-white hover:border-olive-500/50",
              )}
            >
              <input
                type="radio"
                name="motivo"
                value={option.value}
                checked={reason === option.value}
                onChange={() => setReason(option.value)}
                className="sr-only"
              />
              <span className="font-medium text-olive-800">{option.label}</span>
              <span className="text-xs text-ink-soft">{option.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            name="nombre"
            required
            autoComplete="name"
            aria-label="Nombre y apellidos"
            placeholder="Nombre y apellidos"
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={describedBy("nombre")}
            className={field}
          />
          <FieldError id={`${id}-nombre-error`} message={errors.nombre} />
        </div>
        <div>
          <input
            name="telefono"
            type="tel"
            autoComplete="tel"
            aria-label="Teléfono"
            placeholder="Teléfono"
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={describedBy("telefono")}
            className={field}
          />
          <FieldError id={`${id}-telefono-error`} message={errors.telefono} />
        </div>
      </div>
      <div>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-label="Email"
          placeholder="Email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
          className={field}
        />
        <FieldError id={`${id}-email-error`} message={errors.email} />
      </div>

      {isJob && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <select
                name="sede"
                required
                defaultValue=""
                aria-label="Clínica en la que le gustaría trabajar"
                aria-invalid={Boolean(errors.sede)}
                aria-describedby={describedBy("sede")}
                className={field}
              >
                <option value="" disabled>
                  Clínica
                </option>
                {CLINIC_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <FieldError id={`${id}-sede-error`} message={errors.sede} />
            </div>
            <div>
              <select
                name="puesto"
                required
                value={position}
                onChange={(e) => setPosition(e.currentTarget.value)}
                aria-label="Puesto"
                aria-invalid={Boolean(errors.puesto)}
                aria-describedby={describedBy("puesto")}
                className={field}
              >
                <option value="" disabled>
                  Puesto
                </option>
                {POSITION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <FieldError id={`${id}-puesto-error`} message={errors.puesto} />
            </div>
          </div>

          {position === "fisioterapeuta" && (
            <input
              name="colegiado"
              inputMode="numeric"
              aria-label="Número de colegiado (opcional)"
              placeholder="Número de colegiado (opcional)"
              className={field}
            />
          )}

          <div>
            <label
              htmlFor={`${id}-cv`}
              className="mb-2 block px-1 text-sm font-medium text-olive-800"
            >
              Su CV <span className="font-normal text-ink-soft">(PDF o Word, hasta 5 MB)</span>
            </label>
            <input
              id={`${id}-cv`}
              name="cv"
              type="file"
              required
              accept={CV_ACCEPT}
              onChange={handleCvChange}
              aria-invalid={Boolean(errors.cv)}
              aria-describedby={describedBy("cv")}
              className={cn(
                field,
                "cursor-pointer py-2.5 text-sm file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-olive-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-olive-700 hover:file:bg-olive-100",
              )}
            />
            <FieldError id={`${id}-cv-error`} message={errors.cv} />
          </div>
        </>
      )}

      <div>
        <textarea
          name="mensaje"
          required={!isJob}
          rows={5}
          aria-label={isJob ? "Mensaje (opcional)" : "Mensaje"}
          placeholder={
            isJob
              ? "Cuéntenos brevemente su experiencia y disponibilidad (opcional)"
              : "¿En qué podemos ayudarle?"
          }
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={describedBy("mensaje")}
          className={field}
        />
        <FieldError id={`${id}-mensaje-error`} message={errors.mensaje} />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          No rellene este campo
          <input name="web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 px-1 text-sm text-ink-soft">
          <input
            name="privacidad"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.privacidad)}
            aria-describedby={describedBy("privacidad")}
            className="mt-0.5 h-4 w-4 shrink-0 accent-olive-500"
          />
          <span>
            {/* PENDIENTE (#60): enlazar la política de privacidad cuando exista. */}
            He leído y acepto la política de privacidad.{" "}
            {isJob
              ? "MUV usará sus datos y su CV solo para valorar su candidatura."
              : "MUV usará sus datos solo para responder a su consulta."}
          </span>
        </label>
        <FieldError id={`${id}-privacidad-error`} message={errors.privacidad} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Enviando…" : isJob ? "Enviar candidatura" : "Enviar consulta"}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            state.status === "error" ? "text-red-800" : "text-olive-600",
          )}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
