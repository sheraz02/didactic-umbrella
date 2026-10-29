"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";

/**
 * Hero photo that fails quietly. If the image cannot be loaded (network
 * problem, expired remote URL…), it is removed so visitors never see a
 * broken-image icon; the hero's navy background and overlay remain, and the
 * text stays fully readable.
 */
export function HeroImage(props: ImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (failed) return null;

  // eslint-disable-next-line jsx-a11y/alt-text -- alt is supplied by the caller via props
  return <Image {...props} onError={() => setFailed(true)} />;
}
