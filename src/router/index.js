import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
// import routes from "./routes";

import LoadingBar from "../components/LoadingBar/LoadingBar";

import constantRoutes from "./constantRoutes";

const routes = [...constantRoutes];

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === "history"
  ? createWebHistory
  : createWebHashHistory;

export const Router = createRouter({
  // scrollBehavior: (to, from, savedPosition) => ({ left: 0, top: 0 }),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash };
    }
    return { x: 0, y: 0 };
  },
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(
    process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
  ),
  // history: createHistory("/app"),
});

export default route(function (/* { store, ssrContext } */) {
  Router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    next();
  });

  Router.afterEach(() => {
    // 使用多个 stop() 来保证 LoadingBar 在动态添加路由后正确关闭
    LoadingBar.stop();
    LoadingBar.stop();
  });

  return Router;
});
