import type {
  AlchemiaAvailableLanguageCode,
  AlchemiaDecoratorValue,
} from "@/types";

const buildLangRoutePrefix = (
  methodName: keyof AlchemiaDecoratorValue<AlchemiaAvailableLanguageCode[]>,
  langs: AlchemiaDecoratorValue<AlchemiaAvailableLanguageCode[]> = {}
) => {
  const methodLanguages = langs[methodName];
  if (!methodLanguages || !methodLanguages.length) return "";

  return `/:lang(${methodLanguages.join("|")})`;
};

export default buildLangRoutePrefix;
