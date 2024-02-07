import type { AvailableLanguageCode } from "@/config/languages";

const buildLangRoutePrefix = (langs: AvailableLanguageCode[]) => {
  if (!langs.length) return "";
  return `/:lang(${langs.join("|")})`;
};

export default buildLangRoutePrefix;
