import { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/home/index.vue"),
  },
  {
    name: "Map",
    path: "/map",
    component: () => import("@/views/map/index.vue"),
  },
]

// 404
routes.push({
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: () => import("@/views/404.vue"),
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
export { routes }
