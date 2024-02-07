import type { AlchemiaMultiLingualDecoratorValues } from "@/decorators/multiLingual";

const buildLangRoutePrefix = (
  methodName: keyof AlchemiaMultiLingualDecoratorValues,
  langs: AlchemiaMultiLingualDecoratorValues = {}
) => {
  const methodLanguages = langs[methodName];
  if (!methodLanguages || !methodLanguages.length) return "";

  return `/:lang(${methodLanguages.join("|")})`;
};

export default buildLangRoutePrefix;
