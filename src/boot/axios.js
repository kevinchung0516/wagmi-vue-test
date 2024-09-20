import { boot } from "quasar/wrappers";
import axios from "axios";

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
});
