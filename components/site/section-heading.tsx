import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** id applied to the <h2>, for aria-labelledby on the parent section. */
  titleId: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "mx-auto max-w-2xl items-center text-center" : "max-w-xl items-start",
        className,
      )}
    >
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-teal uppercase">
        {!centered && <span aria-hidden="true" className="h-px w-8 bg-teal" />}
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="font-heading text-3xl leading-[1.15] font-medium tracking-tight text-balance text-navy sm:text-4xl lg:text-[2.6rem]"
      >
        {title}
      </h2>
      {description && (
        <p className="text-base text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
