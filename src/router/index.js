import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/finance",
    name: "Finance",
    component: () => import("../views/Finance.vue"),
    props: true
  },
  {
    path: "/history",
    name: "History",
    component: () => import("../views/History.vue")
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
