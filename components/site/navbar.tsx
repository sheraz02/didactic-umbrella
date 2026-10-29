"use client";

import * as React from "react";

import { BrandMark } from "@/components/site/brand-mark";
import { ConsultationButton } from "@/components/site/consultation-button";
import { Container } from "@/components/site/container";
import { MobileMenu } from "@/components/site/mobile-menu";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

/**
 * Fixed navbar. Transparent over the hero at the top of the page, solid ivory
 * once the visitor scrolls. Highlights the section currently in view.
 */
export function Navbar() {
  const scrolled = React.useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled,
  );
  const [activeId, setActiveId] = React.useState<string>("home");

  React.useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    // A thin band across the middle of the viewport decides the active section.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const tone = scrolled ? "dark" : "light";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border bg-ivory shadow-[0_6px_20px_-12px_rgba(11,31,58,0.25)]"
          : "on-dark border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a
          href="#home"
          aria-label="Rexsis Consultancy — back to top"
          className="rounded-md outline-offset-4"
        >
          <BrandMark tone={tone} />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={activeId === link.id ? "location" : undefined}
                  className={cn(
                    "relative block rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    "after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=location]:after:scale-x-100",
                    scrolled
                      ? "text-navy/75 after:bg-teal hover:text-navy aria-[current=location]:text-navy"
                      : "text-white/80 after:bg-teal-light hover:text-white aria-[current=location]:text-white",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ConsultationButton
            variant={scrolled ? "default" : "light"}
            className="hidden sm:inline-flex"
          />
          <MobileMenu tone={tone} activeId={activeId} />
        </div>
      </Container>
    </header>
  );
}
