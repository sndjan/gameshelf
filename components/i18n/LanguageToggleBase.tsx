import Link from "next/link";
import { languages } from "../../i18n/settings";
import { Button } from "../ui/button";

const languageEmojis: Record<string, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
};

export const LanguageToggleBase = ({
  lng = "en",
  path = "",
}: {
  lng: string;
  path?: string;
}) => {
  return (
    <div className="flex items-center">
      {
        languages
          .filter((l) => lng !== l)
          .map((l) => (
            <Link key={l} href={`/${l}${path}`}>
              <Button variant="outline" size="icon">
                <span className="text-lg">{languageEmojis[l]}</span>
              </Button>
            </Link>
          ))[0]
      }
    </div>
  );
};
