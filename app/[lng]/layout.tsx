import "./globals.css";

import { dir } from "i18next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../components/provider/SessionProvider";
import { ThemeProvider } from "../../components/theme/ThemeProvider";
import { useTranslation } from "../../i18n";
import { fallbackLng, languages } from "../../i18n/settings";

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
    content: "A simple game collection webpage.",
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
  const session = await getServerSession();
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        <SessionProvider session={session}>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
