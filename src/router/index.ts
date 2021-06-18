import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Feed",
    component: () => import(/* webpackChunkName: "feed" */ "../views/Feed.vue"),
    meta: {
      layout: "HeaderLayout",
      requiresAuth: true
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
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: {
      layout: "HeaderLayout",
      requiresAuth: true
    },
    children: [
      {
        name: "ProfileChild",
        path: ":user",
        component: () => import(/* webpackChunkName: "profileChild" */ "../views/Profile.vue"),
        meta: {
          layout: "HeaderLayout",
          requiresAuth: true
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
    path: "/admin",
    name: "Admin",
    component: () => import(/* webpackChunkName: "admin" */ "../views/AdminDash.vue"),
    meta: {
      layout: "AdminLayout",
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/search/results/all",
    name: "search-users",
    component: () => import(/* webpackChunkName: "profile" */ "../views/SearchUsers.vue"),
    meta: {
      layout: "HeaderLayout",
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.userModule?.user) {
      if (to.matched.some((record) => record.meta.requiresAdmin)) {
        store.state.userModule.user.roles == "ADMIN" ? next() : next("/");
      } else {
        store.state.userModule.user.roles == "ADMIN" ? next("/admin") : next();
      }
    } else {
      next("/login");
    }
  } else {
    if (store.state.userModule?.user) {
      store.state.userModule.user.roles == "ADMIN" ? next("/admin") : next("/");
    } else {
      next();
    }
  }
});

export default router;
