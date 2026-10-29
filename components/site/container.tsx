import * as React from "react";

import { cn } from "@/lib/utils";

/** Consistent content width and side gutters for every section. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}
