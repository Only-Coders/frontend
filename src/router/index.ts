import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Feed",
    component: () => import(/* webpackChunkName: "feed" */ "../views/Feed.vue"),
    meta: {
      layout: "HeaderLayout"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: () => import(/* webpackChunkName: "onboarding" */ "../views/Onboarding.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      layout: "HeaderLayout"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
