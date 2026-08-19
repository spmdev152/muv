"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { mainNav, hasDarkHero } from "@/lib/site";
import { BookingButton } from "@/components/BookingButton";
import { ChevronDown } from "@/components/ui/icons";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjustment during render,
  // the pattern React recommends instead of a setState-only effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  // Over a dark image hero and still in the top transparent state, we use light
  // text so it stays legible. On scroll (cream background) or with the mobile
  // menu open, we return to the usual dark text.
  const onDark = hasDarkHero(pathname) && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled || open
          ? "border-b border-olive-900/10 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" aria-label="MUV — inicio" className="relative z-10">
          <Logo
            className={cn(
              "h-9 w-auto transition-colors duration-300",
              onDark ? "text-cream" : "text-olive-700",
            )}
          />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  onDark
                    ? "text-cream/90 hover:text-gold-300"
                    : "text-olive-800 hover:text-gold-700",
                  pathname.startsWith(item.href) &&
                    (onDark ? "text-gold-300" : "text-gold-700"),
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <ul className="min-w-60 rounded-2xl border border-olive-900/10 bg-cream p-2 shadow-xl shadow-olive-900/10">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          // Los submenús listan el sitio entero (23 rutas) y
                          // están en el DOM desde la carga, así que Next las
                          // prefetchaba todas: 95 peticiones `_rsc` y medio
                          // segundo de hilo principal deserializándolas
                          // mientras el visitante aún no ha visto el hero.
                          prefetch={false}
                          className="block rounded-xl px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-olive-50 hover:text-olive-700"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <BookingButton size="sm" variant={onDark ? "cream" : "primary"} />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className="sr-only">Menú</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "h-px w-6 transition-all duration-300",
                onDark ? "bg-cream" : "bg-olive-800",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-6 transition-all duration-300",
                onDark ? "bg-cream" : "bg-olive-800",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-px w-6 transition-all duration-300",
                onDark ? "bg-cream" : "bg-olive-800",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </div>
        </button>
      </nav>

      {/*
        Mobile menu. El desplegable de alto automático lo hace CSS
        (`.disclosure` interpola `grid-template-rows` de 0fr a 1fr); antes lo
        animaba `motion`, que era la única razón por la que la librería entraba
        en el bundle de todas las páginas.
      */}
      <div id="menu-movil" data-open={open} className="disclosure lg:hidden">
        <div>
          <div className="max-h-[80vh] overflow-y-auto px-6 pb-8 pt-2">
            <ul className="divide-y divide-olive-900/10">
              {mainNav.map((item) => (
                <li key={item.href} className="py-3">
                  <Link
                    href={item.href}
                    className="block font-display text-2xl text-olive-800"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            prefetch={false}
                            className="text-sm text-ink-soft hover:text-gold-700"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <BookingButton className="w-full" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
