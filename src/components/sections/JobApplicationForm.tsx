"use client";

import {
  startTransition,
  useActionState,
  useId,
  useRef,
  useState,
} from "react";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { sendApplication } from "@/app/contacto/actions";
import {
  CLINIC_OPTIONS,
  CV_ACCEPT,
  POSITION_OPTIONS,
  cvProblem,
  type ApplicationState,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import Link from "next/link";

const field =
  "w-full rounded-2xl border border-olive-900/15 bg-white px-4 py-3 text-olive-900 outline-none transition-colors placeholder:text-ink-soft/60 focus:border-olive-500 aria-[invalid=true]:border-red-700/60";

const INITIAL: ApplicationState = { status: "idle" };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-1.5 px-1 text-xs text-red-800">
      {message}
    </p>
  );
}

/**
 * Job application form (#66): candidates choose a clinic and a position and
 * attach their CV, and a server action emails it to the clinic.
 */
export function JobApplicationForm() {
  const [clinic, setClinic] = useState("");
  const [position, setPosition] = useState("");
  const [cvError, setCvError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    async (prev: ApplicationState, data: FormData) => {
      const result = await sendApplication(prev, data);

      if (result.status === "success") {
        formRef.current?.reset();
        setClinic("");
        setPosition("");
      }

      return result;
    },
    INITIAL,
  );
  const id = useId();
  const errors: Partial<Record<string, string>> = { ...state.errors };

  if (cvError) errors.cv = cvError;

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
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Select
            name="sede"
            options={CLINIC_OPTIONS}
            value={clinic}
            onChange={setClinic}
            placeholder="Clínica"
            aria-label="Clínica en la que le gustaría trabajar"
            invalid={Boolean(errors.sede)}
            aria-describedby={describedBy("sede")}
          />
          <FieldError id={`${id}-sede-error`} message={errors.sede} />
        </div>
        <div>
          <Select
            name="puesto"
            options={POSITION_OPTIONS}
            value={position}
            onChange={setPosition}
            placeholder="Puesto"
            aria-label="Puesto"
            invalid={Boolean(errors.puesto)}
            aria-describedby={describedBy("puesto")}
          />
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
          Su currículum{" "}
          <span className="font-normal text-ink-soft">
            (PDF o Word, hasta 5 MB)
          </span>
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

      <div>
        <textarea
          name="mensaje"
          rows={5}
          aria-label="Mensaje (opcional)"
          placeholder="Cuéntenos brevemente su experiencia y disponibilidad (opcional)"
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={describedBy("mensaje")}
          className={field}
        />
        <FieldError id={`${id}-mensaje-error`} message={errors.mensaje} />
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
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
            He leído y acepto la{" "}
            <Link
              href="/politica-de-privacidad"
              target="_blank"
              className="font-medium text-olive-700 underline decoration-gold-400 underline-offset-4"
            >
              política de privacidad
            </Link>
            . MUV usará sus datos y
            su currículum solo para valorar su perfil.
          </span>
        </label>
        <FieldError id={`${id}-privacidad-error`} message={errors.privacidad} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Enviando…" : "Enviar currículum"}
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
