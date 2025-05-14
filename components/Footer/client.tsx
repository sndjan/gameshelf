"use client";

import { FooterBase } from "./FooterBase";
import { useTranslation } from "../../i18n/client";
import { useParams } from "next/navigation";

export function Footer({ path }: { path: string }) {
  const params = useParams<{ lng: string }>();
  const { i18n } = useTranslation(params.lng, "footer");
  return <FooterBase i18n={i18n} lng={params.lng} path={path} />;
}
