import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import resources from "./translations.json";
import { triggerRelayout } from "./utils";

const DEBUG = process.env.NODE_ENV === "development" && sessionStorage.i18nDebug;

if (DEBUG) {
  sessionStorage.removeItem("__i18nMissingKeys");
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lowerCaseLng: true,
    fallbackLng: "zh-hans",
    defaultNS: "default",
    debug: DEBUG,
    whitelist: ["ja", "zh-hans", "en"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      checkWhitelist: true,
    },

    returnEmptyString: false,
    returnNull: false,

    saveMissing: DEBUG,
    missingKeyHandler: DEBUG
      ? function (lng, ns, key) {
          const missingKeys = JSON.parse(sessionStorage.getItem("__i18nMissingKeys") || "{}") || {};
          const l = i18n.language;
          if (l === "zh-hans") {
            return;
          }
          missingKeys[l] = missingKeys[l] || {};
          missingKeys[l][ns] = missingKeys[l][ns] || {};
          missingKeys[l][ns][key] = "";
          sessionStorage.setItem("__i18nMissingKeys", JSON.stringify(missingKeys));
        }
      : false,

    nsSeparator: false,
    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", function () {
  triggerRelayout();
});

export default i18n;
