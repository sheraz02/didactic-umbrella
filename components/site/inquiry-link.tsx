"use client";

import * as React from "react";

import { SELECT_SERVICE_EVENT, type ServiceValue } from "@/lib/inquiry";

interface InquiryLinkProps extends React.ComponentProps<"a"> {
  /** Service to pre-select in the inquiry form when this link is used. */
  service?: ServiceValue;
  /** Opens in a new tab (used for the external consultation booking link). */
  external?: boolean;
}

/**
 * An anchor that scrolls to the inquiry form (or opens an external URL) and,
 * if `service` is given, pre-selects that service in the form's dropdown.
 * Plain anchors keep native smooth scrolling and work without JavaScript.
 */
export function InquiryLink({
  service,
  external = false,
  href = "#contact",
  onClick,
  children,
  ...props
}: InquiryLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(event) => {
        onClick?.(event);
        if (service) {
          window.dispatchEvent(
            new CustomEvent<ServiceValue>(SELECT_SERVICE_EVENT, { detail: service }),
          );
        }
      }}
      {...props}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
