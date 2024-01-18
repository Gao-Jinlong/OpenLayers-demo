<template>
  <div class="application">
    <ElMenu
      :default-active="String($route.name)"
      class="header-menu"
      mode="horizontal"
      :ellipsis="false"
      :router="true"
      dark
    >
      <div class="site-logo">
        <img
          src="https://openlayers.org/theme/img/logo-dark.svg"
          alt=""
          class="logo"
        />
        OpenLayers Demo
      </div>
      <div class="flex-grow" />
      <template v-for="route of routes.slice(0, -1)" :key="route.path">
        <template v-if="route.children">
          <!-- TODO: 路由 -->
          <!-- <ElSubmenu :index="String(route.name)">
            <template #title>
              {{ route.meta?.title }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </template>
            <template v-for="child of route.children" :key="child.path">
              <ElMenuItem :route="child" :index="String(child.name)"
                >{{ child.meta?.title }}
              </ElMenuItem>
            </template>
          </ElSubmenu> -->
        </template>
        <template v-else>
          <ElMenuItem :route="route" :index="String(route.name)"
            >{{ route.meta?.title }}
          </ElMenuItem>
        </template>
      </template>
    </ElMenu>

    <ElConfigProvider :locale="zhCn">
      <KeepAlive>
        <RouterView></RouterView>
      </KeepAlive>
    </ElConfigProvider>
  </div>
</template>

<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { routes } from "@/route/"
</script>

<style lang="scss" scoped>
.application {
  $bg-color: #545c64;
  --el-menu-bg-color: #{$bg-color};
  --el-menu-text-color: #fff;
  --el-menu-active-color: #ffd04b;
  --el-menu-hover-text-color: #ffd04b;
  --el-menu-hover-bg-color: #{darken($bg-color, 10%)};

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
}
.site-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  margin-right: 20px;
}
.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.flex-grow {
  flex-grow: 1;
}
.header-menu {
  padding: 0 20px;
}
</style>
