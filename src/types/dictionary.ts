export type AlchemiaDictionaryTexts = {
  [key: string]: string | number | null | string[] | AlchemiaDictionaryTexts;
};

export type AlchemiaDictionary = {
  language: string;
  texts: AlchemiaDictionaryTexts;
};
