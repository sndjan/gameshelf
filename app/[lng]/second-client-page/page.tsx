"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "../../../i18n/client";
import { Header } from "../../../components/Header/Header";
import { Footer } from "../../../components/Footer/client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HomeIcon, CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = React.use<{ lng: string }>(params);
  const { t } = useTranslation(lng, "second-client-page");

  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <main>
        <Header heading={t("h1")} />
        <Card className="w-full max-w-md mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {t("select-date")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 items-center">
            <div className="text-muted-foreground">
              {date ? (
                <p>{date.toLocaleDateString()}</p>
              ) : (
                <p>{t("no-date-selected")}</p>
              )}
            </div>
            <Link href={`/${lng}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4" />
                {t("back-to-home")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer path="/second-client-page" />
    </>
  );
}
