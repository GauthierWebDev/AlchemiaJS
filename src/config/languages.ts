const languages = {
  FALLBACK: process.env.FALLBACK_LANGUAGE || "en",
  AVAILABLE: [
    {
      code: "fr",
      name: "Français",
    },
    {
      code: "en",
      name: "English",
    },
  ],
};

export default languages;
