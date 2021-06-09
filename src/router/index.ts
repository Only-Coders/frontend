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
      //requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/forgot",
    name: "ForgotPassword",
    component: () => import(/* webpackChunkName: "forgot" */ "../views/ForgotPassword.vue")
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: () => import(/* webpackChunkName: "onboarding" */ "../views/Onboarding.vue"),
    meta: {
      //requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: {
      layout: "HeaderLayout"
      //requiresAuth: true
    },
    children: [
      {
        name: "ProfileChild",
        path: ":user",
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
        meta: {
          layout: "HeaderLayout"
          //requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import(/* webpackChunkName: "chat" */ "../views/Chat.vue"),
    meta: {
      layout: "HeaderLayout",
      requiresAuth: true
    }
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
