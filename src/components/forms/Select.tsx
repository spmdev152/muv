"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type SelectOption = { value: string; label: string; hint?: string };

type Props = {
  /** Field name; the value travels in a hidden input, like a native select. */
  name: string;
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  "aria-label": string;
  "aria-describedby"?: string | undefined;
  invalid?: boolean;
  className?: string;
};

/**
 * Select-only combobox (WAI-ARIA APG pattern) styled like the rest of the
 * form fields: a button that opens a floating list of options.
 *
 * Keyboard: arrows move, Home/End jump, Enter/Space choose, Escape closes,
 * Tab chooses the highlighted option and moves on, and typing letters jumps to
 * the first option that starts with them.
 */
export function Select({
  name,
  options,
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  "aria-describedby": describedBy,
  invalid = false,
  className,
}: Props) {
  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const [active, setActive] = useState(Math.max(selectedIndex, 0));
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function openList(index = Math.max(selectedIndex, 0)) {
    setActive(index);
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];

    if (option) onChange(option.value);

    setOpen(false);
  }

  /** Jumps to the first option starting with what was typed in the last 0.6 s. */
  function typeAhead(key: string) {
    const now = Date.now();
    const text =
      (now - typed.current.at < 600 ? typed.current.text : "") +
      key.toLowerCase();

    typed.current = { text, at: now };

    const index = options.findIndex((o) =>
      o.label.toLowerCase().startsWith(text),
    );

    if (index < 0) return;

    if (open) {
      setActive(index);
    } else {
      onChange(options[index]?.value ?? "");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        if (open) setActive((i) => Math.min(i + 1, last));
        else openList();

        break;
      case "ArrowUp":
        event.preventDefault();

        if (open) setActive((i) => Math.max(i - 1, 0));
        else openList();

        break;
      case "Home":
        event.preventDefault();
        openList(0);

        break;
      case "End":
        event.preventDefault();
        openList(last);

        break;
      case "Enter":
      case " ":
        event.preventDefault();

        if (open) choose(active);
        else openList();

        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }

        break;
      case "Tab":
        if (open) choose(active);

        break;
      default:
        if (
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          typeAhead(event.key);
        }
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 text-left outline-none transition-[border-color,box-shadow] duration-200",
          "focus-visible:border-olive-500 focus-visible:ring-4 focus-visible:ring-olive-500/10",
          open
            ? "border-olive-500 ring-4 ring-olive-500/10"
            : "border-olive-900/15 hover:border-olive-500/50",
          invalid && !open && "border-red-700/60",
        )}
      >
        <span
          className={cn(
            "truncate",
            selected ? "text-olive-900" : "text-ink-soft/60",
          )}
        >
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 text-olive-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={ariaLabel}
            tabIndex={-1}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 origin-top overflow-auto rounded-2xl border border-olive-900/10 bg-white p-1.5 shadow-xl shadow-olive-900/10"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;

              return (
                <li
                  key={option.value}
                  id={`${id}-option-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onPointerMove={() => setActive(index)}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => choose(index)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                    index === active
                      ? "bg-olive-50 text-olive-800"
                      : "text-olive-900",
                    isSelected && "font-medium",
                  )}
                >
                  <span>
                    {option.label}
                    {option.hint && (
                      <span className="block text-xs font-normal text-ink-soft">
                        {option.hint}
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-gold-600"
                    />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
