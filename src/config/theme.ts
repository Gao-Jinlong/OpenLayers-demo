import { defineStore } from "pinia"
import { reactive } from "vue"
import { ThemeConfig as atThemeConfig } from "ant-design-vue/lib/config-provider/context"
export interface ThemeConfig extends atThemeConfig {}

const globalTheme = defineStore("globalTheme", () => {
  const state = reactive<ThemeConfig>({
    token: {
      colorPrimary: "#52c41a",
    },
  })

  return {
    state,
  }
})
export default globalTheme
