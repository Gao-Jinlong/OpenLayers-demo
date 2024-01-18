import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import ElementPlus from "unplugin-element-plus/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      globs: [], // 指定要扫描的文件为空，避免所有组件都自动引入导致项目混乱依赖不清晰
      resolvers: [
        // 解析 element-plus 组件，并自动引入
        ElementPlusResolver(),
      ],
      dts: true,
    }),
    ElementPlus({}),
    AutoImport({
      // 自动导入 vue 模块
      imports: ["vue"],
      eslintrc: {
        enabled: true, // <-- this
      },
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {},
})
