import { languages } from "@/config";

const buildLangRoutePrefix = () => {
  const codes = languages.AVAILABLE.map((language) => language.code);
  return `/:lang(${codes.join("|")})`;
};

export default buildLangRoutePrefix;
