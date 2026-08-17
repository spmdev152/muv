import Link from "next/link";
import { Check } from "@/components/ui/icons";

export type AvailabilityRow = {
  label: string;
  /** Aclaración entre paréntesis tras el nombre. */
  note?: string;
  href: string;
  /** Una posición por columna, en el mismo orden. */
  at: readonly boolean[];
};

type Props = {
  caption: string;
  columns: readonly string[];
  rows: readonly AvailabilityRow[];
};

/**
 * Tabla de disponibilidad de servicios por clínica.
 *
 * Va como texto rastreable, nunca como imagen: es el único contenido de `/sedes`
 * que ningún competidor puede replicar, porque ninguno tiene dos sedes.
 *
 * Cada nombre de servicio enlaza a su página — trece enlaces internos que antes
 * no existían. El «sí» se marca con icono y con texto para lector de pantalla;
 * la ausencia, con una raya y su propio texto, para que la celda nunca quede
 * muda.
 */
export function AvailabilityTable({ caption, columns, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-olive-900/10 bg-white">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-olive-900/10 bg-cream-dark/40">
            <th scope="col" className="px-5 py-4 text-sm font-semibold text-olive-800">
              Servicio
            </th>
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className="whitespace-nowrap px-5 py-4 text-center text-sm font-semibold text-olive-800"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-olive-900/10 last:border-0"
            >
              <th scope="row" className="px-5 py-3.5 font-normal">
                <Link
                  href={row.href}
                  className="text-olive-800 underline-offset-4 transition-colors hover:text-gold-700 hover:underline"
                >
                  {row.label}
                </Link>
                {row.note && (
                  <span className="ml-1 text-sm text-ink-soft">
                    ({row.note})
                  </span>
                )}
              </th>
              {row.at.map((available, i) => (
                <td key={columns[i]} className="px-5 py-3.5 text-center">
                  {available ? (
                    <>
                      <Check
                        className="mx-auto h-5 w-5 text-olive-500"
                        aria-hidden="true"
                      />
                      <span className="sr-only">
                        Sí, disponible en {columns[i]}
                      </span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" className="text-olive-900/25">
                        —
                      </span>
                      <span className="sr-only">
                        No disponible en {columns[i]}
                      </span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
