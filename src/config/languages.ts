const languages = {
  FALLBACK: process.env.FALLBACK_LANGUAGE || "en",
  AVAILABLE: [
    {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
    },
    {
      code: "en",
      name: "English",
      flag: "🇬🇧",
    },
  ],
};

export default languages;
