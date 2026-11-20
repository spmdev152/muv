"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";

const SCRIPT_ID = "zl-facility-widget";
const SCRIPT_SRC = "https://www.doctoralia.es/platform/js/widget.js";

type Props = {
  /** Doctoralia facility slug, e.g. `muv-canaveral`. */
  facility: string;
  /** Clinic name, used as the link text and the iframe title. */
  name: string;
  /** Doctoralia page of the clinic, the fallback when the widget cannot load. */
  bookingUrl: string;
};

/**
 * Doctoralia booking calendar of one clinic, embedded with the official widget
 * (#73). Mount it only after the visitor asks for the calendar: it loads
 * third-party content from doctoralia.es, which can set its own cookies.
 *
 * `widget.js` scans the page once, when it runs, and swaps each
 * `[data-zl-widget-facility]` anchor for an iframe. So the anchor is inserted
 * first and the script is loaded again every time a calendar is opened.
 */
export function DoctoraliaWidget({ facility, name, bookingUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const anchor = document.createElement("a");

    anchor.href = bookingUrl;
    anchor.rel = "nofollow";
    anchor.textContent = name;
    anchor.dataset.zlWidgetFacility = facility;
    anchor.dataset.placement = "inline";
    anchor.dataset.zlwType = "facility-calendar-listing-with-saas-only";
    anchor.dataset.zlwA11yTitle = `Calendario de citas de ${name} en Doctoralia`;
    container.replaceChildren(anchor);

    document.getElementById(SCRIPT_ID)?.remove();

    const script = document.createElement("script");

    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onerror = () => setHasFailed(true);
    document.body.appendChild(script);

    return () => {
      container.replaceChildren();
      script.remove();
    };
  }, [facility, name, bookingUrl]);

  return (
    <div>
      <div
        ref={containerRef}
        className="min-h-[24rem] [&_iframe]:min-h-[24rem]"
      />
      <p className="mt-3 text-xs text-ink-soft">
        {hasFailed
          ? "No hemos podido cargar el calendario. "
          : "¿No ve el calendario? "}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-olive-700 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
        >
          Reservar en Doctoralia
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </p>
    </div>
  );
}
