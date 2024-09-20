import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

const lang = localStorage.getItem("appLang");

const config = {
  locale: lang ? lang : "en-US",
  globalInjection: true,
  legacy: false,
  warnHtmlMessage: false,
  messages,
};

let i18n = createI18n(config);

export default boot(({ app }) => {
  const i18n = createI18n(config);

  // Set i18n instance on app
  app.use(i18n);
});

export { i18n };
