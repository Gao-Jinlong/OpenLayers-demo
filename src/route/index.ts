import { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"

declare module "vue-router" {
  interface RouteMeta {
    title: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    meta: {
      title: "首页",
    },
    component: () => import("@/views/home/Home.vue"),
  },
  {
    name: "Example",
    path: "/example",
    meta: {
      title: "Example",
    },
    children: [
      {
        name: "BoxSelection",
        path: "/box-selection",
        meta: {
          title: "BoxSelection",
        },
        component: () => import("@/views/box-selection/BoxSelection.vue"),
      },
      {
        name: "CustomAnimation",
        path: "/custom-animation",
        meta: {
          title: "CustomAnimation",
        },
        component: () => import("@/views/custom-animation/CustomAnimation.vue"),
      },
    ],
  },
]

// 404
routes.push({
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  meta: {
    title: "404",
  },
  component: () => import("@/views/404.vue"),
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
export { routes }
