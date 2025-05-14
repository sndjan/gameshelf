"use client";

import { useParams } from "next/navigation";
import { LanguageToggleBase } from "./LanguageToggleBase";

export function Footer({ path }: { path: string }) {
  const params = useParams<{ lng: string }>();
  return <LanguageToggleBase lng={params.lng} path={path} />;
}
