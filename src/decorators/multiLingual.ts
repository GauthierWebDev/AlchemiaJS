import type { AvailableLanguageCode } from "@/config/languages";
import { languages } from "@/config";

const allLangs: AvailableLanguageCode[] = languages.AVAILABLE.map(
  (lang) => lang.code
);

export type AlchemiaMultiLingualDecoratorValues = {
  [key: string]: AvailableLanguageCode[];
};

/**
 * Decorator function for setting the covered languages for a route.
 * @param langs - The languages covered for the route.
 * @returns A decorator function that sets the covered languages of the target method.
 */
const multiLingual = (...langs: AvailableLanguageCode[]) => {
  return (target: any, key: string, __descriptor: PropertyDescriptor) => {
    if (!target.constructor._langs) target.constructor._langs = {};
    if (!langs.length || langs.includes("*")) langs = allLangs;

    langs = langs.filter((lang) => allLangs.includes(lang));
    target.constructor._langs[key] = langs;
  };
};

export default multiLingual;
