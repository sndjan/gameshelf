"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "../../../i18n/client";
import { Header } from "../../../components/Header/Header";
import { Footer } from "../../../components/Footer/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PlusIcon, MinusIcon, ArrowRightIcon, HomeIcon } from "lucide-react";

export default function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = React.use<{ lng: string }>(params);
  const { t } = useTranslation(lng, "client-page");
  const [counter, setCounter] = useState(0);

  return (
    <>
      <main>
        <Header heading={t("h1")} />
        <Card className="w-full max-w-md mt-8">
          <CardContent className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCounter(Math.max(0, counter - 1))}
              disabled={counter === 0}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>

            <div className="text-4xl font-bold w-16 text-center">{counter}</div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCounter(Math.min(10, counter + 1))}
              disabled={counter === 10}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 flex-wrap">
            <Link href={`/${lng}/second-client-page`}>
              <Button className="flex items-center gap-2">
                {t("to-second-client-page")}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/${lng}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4" />
                {t("back-to-home")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer path="/client-page" />
    </>
  );
}
