import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";
import { i18n } from "@/main";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Feed",
    component: () => import(/* webpackChunkName: "feed" */ "../views/Feed.vue"),
    meta: {
      layout: "HeaderLayout",
      requiresAuth: true,
      requiresUserCompleted: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue")
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
      requiresAuth: true,
      requiresUserCompleted: true
    },
    children: [
      {
        name: "ProfileChild",
        path: ":user",
        component: () => import(/* webpackChunkName: "profileChild" */ "../views/Profile.vue"),
        meta: {
          layout: "HeaderLayout",
          requiresAuth: true,
          requiresUserCompleted: true
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
      requiresAuth: true,
      requiresUserCompleted: true
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
    path: "/users",
    name: "UserList",
    component: () => import(/* webpackChunkName: "adminListUsers" */ "../views/AdminListUsers.vue"),
    meta: {
      layout: "AdminLayout",
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/blacklist",
    name: "Blacklist",
    component: () => import(/* webpackChunkName: "adminListUsers" */ "../views/AdminListBlacklist.vue"),
    meta: {
      layout: "AdminLayout",
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/search/results/all",
    name: "search-users",
    component: () => import(/* webpackChunkName: "search" */ "../views/SearchUsers.vue"),
    meta: {
      layout: "HeaderLayout",
      requiresAuth: true,
      requiresUserCompleted: true
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
    if (localStorage.getItem("accessToken") && store.state.userModule?.user) {
      if (to.matched.some((record) => record.meta.requiresAdmin)) {
        store.state.userModule.user.roles == "ADMIN" ? next() : next("/");
      } else {
        if (store.state.userModule.user.roles == "ADMIN") {
          next("/admin");
        } else {
          if (to.matched.some((record) => record.meta.requiresUserCompleted)) {
            store.state.userModule.user.complete ? next() : next("/onboarding");
          } else {
            store.state.userModule.user.complete ? next("/feed") : next();
          }
        }
      }
    } else {
      next("/login");
    }
  } else {
    if (localStorage.getItem("accessToken") && store.state.userModule?.user) {
      if (store.state.userModule.user.roles == "ADMIN") {
        next("/admin");
      } else {
        store.state.userModule?.user.complete ? next("/") : next("/onboarding");
      }
    } else {
      next();
    }
  }
});

export default router;
