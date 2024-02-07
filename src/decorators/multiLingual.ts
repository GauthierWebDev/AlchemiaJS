import type { AvailableLanguageCode } from "@/config/languages";
import { languages } from "@/config";

const allLangs: AvailableLanguageCode[] = languages.AVAILABLE.map(
  (lang) => lang.code
);

/**
 * Decorator function for setting the covered languages for a route.
 * @param langs - The languages covered for the route.
 * @returns A decorator function that sets the covered languages of the target method.
 */
const multiLingual = (...langs: AvailableLanguageCode[]) => {
  return (target: any, key: string, __descriptor: PropertyDescriptor) => {
    if (!target.constructor._langs) target.constructor._langs = {};
    target.constructor._langs[key] = langs.length ? langs : allLangs;
  };
};

export default multiLingual;
