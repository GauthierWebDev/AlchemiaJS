const changeLanguage = () => {
  const langSelect = document.getElementById(
    "language-select"
  ) as HTMLSelectElement;
  if (!langSelect) return;

  const handleLanguageChange = () => {
    const documentLang = document.documentElement.lang;
    const newPathName = window.location.pathname.replace(
      `/${documentLang}/`,
      `/${langSelect.value}/`
    );
    const newUrl = new URL(newPathName, window.location.origin);
    window.location.href = newUrl.toString();
  };

  langSelect.addEventListener("change", handleLanguageChange);
};

export default changeLanguage;
