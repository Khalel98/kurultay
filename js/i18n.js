document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language-select");
  const defaultLanguage = "ru";
  const supportedLanguages = ["ru", "en", "kk"];
  const translationsCache = {};

  const getBaseLanguage = (locale) => locale.split(/[-_]/)[0].toLowerCase();

  const loadTranslations = async (lang) => {
    if (translationsCache[lang]) return translationsCache[lang];
    try {
      const response = await fetch(`./locales/${lang}.json`);
      if (!response.ok)
        throw new Error(`Не удалось загрузить файл локали: ${lang}`);
      const translations = await response.json();
      translationsCache[lang] = translations;
      return translations;
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const getTranslation = (translations, key) => {
    return key
      .split(".")
      .reduce((result, k) => result?.[k] || key, translations);
  };

  const updateContent = (translations) => {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const translation = getTranslation(
        translations,
        element.getAttribute("data-i18n")
      );
      if (element.tagName.toLowerCase() === "input")
        element.value = translation;
      else if (element.tagName.toLowerCase() === "img")
        element.alt = translation;
      else element.textContent = translation;
    });
  };

  const initI18n = async () => {
    const savedLanguage = localStorage.getItem("language");
    let currentLanguage = supportedLanguages.includes(savedLanguage)
      ? savedLanguage
      : getBaseLanguage(navigator.language) || defaultLanguage;
    if (!supportedLanguages.includes(currentLanguage))
      currentLanguage = defaultLanguage;

    languageSelect.value = currentLanguage;
    const translations = await loadTranslations(currentLanguage);
    updateContent(translations);
  };

  const handleLanguageChange = async (e) => {
    const selectedLanguage = getBaseLanguage(e.target.value);
    const lang = supportedLanguages.includes(selectedLanguage)
      ? selectedLanguage
      : defaultLanguage;

    localStorage.setItem("language", lang);
    const translations = await loadTranslations(lang);
    updateContent(translations);
  };

  initI18n();
  languageSelect.addEventListener("change", handleLanguageChange);
});
