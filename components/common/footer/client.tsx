"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "../../../i18n/client";
import { FooterBase } from "./FooterBase";

export function Footer({ path }: { path: string }) {
  const params = useParams<{ lng: string }>();
  const { i18n } = useTranslation(params.lng, "footer");
  return <FooterBase i18n={i18n} lng={params.lng} path={path} />;
}
