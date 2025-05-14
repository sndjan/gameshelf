import Link from "next/link";
import { languages, fallbackLng } from "../../i18n/settings";
import { useTranslation } from "../../i18n";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HomeIcon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  let { lng } = await params;
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);

  return (
    <>
      <main>
        <Header heading={t("h1")} />
        <Card className="w-full max-w-md mx-auto mt-8">
          <CardFooter className="flex justify-center gap-4 flex-wrap">
            <Link href={`/${lng}/second-page`}>
              <Button className="flex items-center gap-2">
                {t("to-second-page")}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/${lng}/client-page`}>
              <Button variant="outline" className="flex items-center gap-2">
                {t("to-client-page")}
                <HomeIcon className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer lng={lng} />
    </>
  );
}
