import { AlchemiaAvailableLanguageCode } from "@/types";
import { findControllerMethodByName } from "@/functions";

function page(
  this: NunjucksFilterInstance,
  routeName: string,
  targetLang?: AlchemiaAvailableLanguageCode
) {
  let language = this.ctx.lang;

  const controllerMethod = findControllerMethodByName(routeName);
  if (!controllerMethod) return "/";

  if (targetLang && controllerMethod.langs.includes(targetLang)) {
    language = targetLang;
  }

  if (!controllerMethod.langs.includes(language)) {
    language = controllerMethod.langs[0];
  }

  return `/${language}${controllerMethod.route}`;
}

export default page;
