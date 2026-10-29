import * as React from "react";

import { Button } from "@/components/ui/button";
import { InquiryLink } from "@/components/site/inquiry-link";
import { getConsultationLink } from "@/lib/site-config";
import type { ServiceValue } from "@/lib/inquiry";

type ConsultationButtonProps = Omit<React.ComponentProps<typeof Button>, "asChild"> & {
  /** Service to pre-select when the button falls back to the inquiry form. */
  service?: ServiceValue;
};

/**
 * "Book a Consultation" button. Opens the booking link in a new tab when one
 * is configured in lib/site-config.ts; otherwise scrolls to the inquiry form.
 */
export function ConsultationButton({
  children = "Book a Consultation",
  service,
  ...props
}: ConsultationButtonProps) {
  const { href, external } = getConsultationLink();

  return (
    <Button asChild {...props}>
      <InquiryLink href={href} external={external} service={external ? undefined : service}>
        {children}
      </InquiryLink>
    </Button>
  );
}
