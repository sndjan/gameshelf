import { i18n } from "i18next";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../i18n/settings";
import { Button } from "../ui/button";
import { GlobeIcon } from "lucide-react";

export const FooterBase = ({
  i18n,
  lng,
  path = "",
}: {
  i18n: i18n;
  lng: string;
  path?: string;
}) => {
  const t = i18n.getFixedT(lng, "footer");

  return (
    <footer className="mt-auto py-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <GlobeIcon className="h-4 w-4" />
        <Trans i18nKey="languageSwitcher" t={t}>
          {/* @ts-expect-error Trans interpolation */}
          Switch from <span className="font-medium">{{ lng }}</span> to:
        </Trans>
      </div>

      <div className="flex gap-2">
        {languages
          .filter((l) => lng !== l)
          .map((l) => (
            <Link key={l} href={`/${l}${path}`}>
              <Button
                variant="outline"
                size="sm"
                className="min-w-16 capitalize"
              >
                {l}
              </Button>
            </Link>
          ))}
      </div>
    </footer>
  );
};
