"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Contact form. In this initial phase there is no backend: it composes a
 * mailto link from the data. To be replaced by a real endpoint later.
 */
export function ContactForm({ to = site.email }: { to?: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Consulta web de ${data.get("nombre")}`,
    );
    const body = encodeURIComponent(
      `Nombre: ${data.get("nombre")}\nTeléfono: ${data.get("telefono")}\nEmail: ${data.get("email")}\n\n${data.get("mensaje")}`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full rounded-2xl border border-olive-900/15 bg-white px-4 py-3 text-olive-900 outline-none transition-colors placeholder:text-ink-soft/60 focus:border-olive-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="nombre" required placeholder="Nombre y apellidos" className={field} />
        <input name="telefono" placeholder="Teléfono" className={field} />
      </div>
      <input name="email" type="email" required placeholder="Email" className={field} />
      <textarea
        name="mensaje"
        required
        rows={5}
        placeholder="¿En qué podemos ayudarte?"
        className={field}
      />
      <div className="flex items-center gap-4">
        <Button type="submit" size="lg">
          Enviar consulta
        </Button>
        {sent && (
          <span className="text-sm text-olive-600">
            Se abrirá tu cliente de correo para completar el envío.
          </span>
        )}
      </div>
      <p className="text-xs text-ink-soft">
        Al enviar aceptas nuestra política de privacidad. Te responderemos lo
        antes posible.
      </p>
    </form>
  );
}
