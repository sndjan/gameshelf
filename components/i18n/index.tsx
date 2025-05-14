import { LanguageToggleBase } from "../i18n/LanguageToggleBase";

export const LanguageToggle = async ({
  lng,
  path,
}: {
  lng: string;
  path?: string;
}) => {
  return <LanguageToggleBase lng={lng} path={path} />;
};
