import { cn } from "@/lib/utils";

interface BrandMarkProps {
  /** "dark" = for light backgrounds, "light" = for navy / photographic backgrounds. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Text-based Rexsis logo: a geometric "R" monogram (drawn as SVG paths, so it
 * never depends on a font loading) next to the wordmark.
 */
export function BrandMark({ tone = "dark", className }: BrandMarkProps) {
  const isLight = tone === "light";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 32 32"
        className={cn("size-9 shrink-0", isLight ? "text-ivory" : "text-navy")}
        aria-hidden="true"
        focusable="false"
      >
        <rect width="32" height="32" rx="6" fill="currentColor" />
        <path
          d="M11 24V8h7.2a4.6 4.6 0 0 1 0 9.2H11M17.4 17.2 22 24"
          fill="none"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={isLight ? "stroke-navy" : "stroke-ivory"}
        />
        <rect
          x="11"
          y="26"
          width="10"
          height="1.5"
          className={isLight ? "fill-teal" : "fill-teal-light"}
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.4rem] font-semibold tracking-tight",
            isLight ? "text-white" : "text-navy",
          )}
        >
          Rexsis
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-semibold tracking-[0.32em] uppercase",
            isLight ? "text-teal-light" : "text-teal",
          )}
        >
          Consultancy
        </span>
      </span>
    </span>
  );
}
