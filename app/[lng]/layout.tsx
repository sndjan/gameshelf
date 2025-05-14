import "./globals.css";

import { dir } from "i18next";
import { languages, fallbackLng } from "../../i18n/settings";
import { useTranslation } from "../../i18n";
import { ThemeProvider } from "../../components/theme/ThemeProvider";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  let { lng } = await params;
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title: t("title"),
    content:
      "Template for Next.js 15 with i18next, TypeScript, Tailwind CSS, ShadcnUI and NextThemes",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
