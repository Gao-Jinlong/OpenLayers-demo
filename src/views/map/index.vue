<template>
  <Tabs
    class="tab"
    v-model:activeKey="activeKey"
    tab-position="left"
    size="large"
  >
    <TabPane v-for="(map, index) in mapSet" :tab="index" :key="index">
      <template #default>
        <div class="map" :id="index"></div>
      </template>
    </TabPane>
  </Tabs>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue"
import { Tabs, TabPane } from "ant-design-vue"

import { initMap } from "./mode/initMap"
import { animationMap } from "./mode/customAnimation"

const activeKey = ref("")
const mapCache = new Map<string, ReturnType<typeof initMap>>()
const mapSet: Record<string, (domId: string) => void> = {
  init: initMap,
  animationMap: animationMap,
}

watch(activeKey, (val) => {
  nextTick(() => {
    if (mapCache.has(val)) {
      return
    }
    mapCache.set(val, mapSet[val](val)!)
  })
})

onMounted(() => {
  activeKey.value = "init"
})
</script>
<style lang="scss">
.map {
  position: relative;
  width: 100%;
  height: 400px;
}
.tab {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
