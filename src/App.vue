<template>
  <ConfigProvider :theme="theme.state">
    <Layout class="app">
      <LayoutHeader class="app__header">
        <Avatar class="header__avatar" :size="50">Ginlon</Avatar>
        <Menu class="header__menu" mode="horizontal" theme="light">
          <MenuItem v-for="route in routes" :key="route.path">
            <router-link :to="route.path">{{ route.name }}</router-link>
          </MenuItem>
        </Menu>
      </LayoutHeader>
      <LayoutContent>
        <RouterView></RouterView>
      </LayoutContent>
      <LayoutFooter class="app__footer"> @Ginlon </LayoutFooter>
    </Layout>
  </ConfigProvider>
</template>

<script setup lang="ts">
import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  Menu,
  MenuItem,
  Avatar,
  ConfigProvider,
} from "ant-design-vue"
import { routes } from "@/route/index"
import globalTheme from "./config/theme"
const theme = globalTheme()
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  width: 1200px;
  margin: 0 auto;
  background: #fff;

  &__header {
    display: flex;
    justify-content: space-between;
    background-color: #fff !important;
    border-bottom: 1px solid #e8e8e8;
  }

  .header {
    &__avatar {
      margin: auto 0px;
    }
    &__menu {
      width: 100%;
      border: none;
      display: flex;
      justify-content: right;
    }
  }

  .app__footer {
    text-align: center;
    background: #f9f9f9;
    font-size: 1px;
    border-top: 1px solid #e8e8e8;
  }
}
</style>
