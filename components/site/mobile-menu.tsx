"use client";

import * as React from "react";
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ConsultationButton } from "@/components/site/consultation-button";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  /** "light" when the navbar sits transparent over the dark hero. */
  tone: "light" | "dark";
  activeId: string;
}

export function MobileMenu({ tone, activeId }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className={cn(
            "lg:hidden",
            tone === "light"
              ? "text-white hover:bg-white/10 hover:text-white"
              : "text-navy",
          )}
        >
          <Menu aria-hidden="true" className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader className="border-b pr-16">
          <SheetTitle className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            Menu
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation. Choose a section to jump to it.
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="px-5">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id} className="border-b last:border-b-0">
                <SheetClose asChild>
                  <a
                    href={link.href}
                    aria-current={activeId === link.id ? "location" : undefined}
                    className="group flex items-center justify-between py-4 font-heading text-2xl text-navy transition-colors hover:text-teal aria-[current=location]:text-teal"
                  >
                    {link.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-5 -translate-x-1 text-teal opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-aria-[current=location]:translate-x-0 group-aria-[current=location]:opacity-100"
                    />
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter>
          <SheetClose asChild>
            <ConsultationButton size="lg" className="w-full" />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
