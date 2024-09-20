const constantRoutes = [
  {
    path: "/",
    name: "index",
    meta: {
      title: "index",
    },
    component: () => import("pages/IndexPage"),
  },
];

export default constantRoutes;
