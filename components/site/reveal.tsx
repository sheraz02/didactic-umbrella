"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface RevealProps extends React.ComponentProps<"div"> {
  /** Stagger delay in milliseconds. */
  delay?: number;
}

/**
 * Gentle fade-and-rise as content scrolls into view.
 *
 * Progressive by design: the server renders everything visible, so the page is
 * complete without JavaScript and without animation. After hydration, only
 * elements that are still below the fold are hidden and then revealed.
 * Visitors who prefer reduced motion never see any of this.
 */
export function Reveal({ delay = 0, className, style, children, ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    element.dataset.state = "hidden";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.state = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      delete element.dataset.state;
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
