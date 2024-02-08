import { languages } from "@/config";

export type AlchemiaAvailableLanguageCode =
  (typeof languages.AVAILABLE)[number]["code"];
