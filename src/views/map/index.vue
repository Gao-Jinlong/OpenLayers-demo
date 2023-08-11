<template>
  <Tabs
    class="tab"
    v-model:activeKey="activeKey"
    tab-position="left"
    size="large"
  >
    <TabPane v-for="(map, index) in mapSet" :tab="index" :key="index"
      >{{ index }}
      <div class="map" :id="index"></div>
    </TabPane>
  </Tabs>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { Tabs, TabPane } from "ant-design-vue"

import { initMap } from "./mode/map"

const activeKey = ref("")
const mapSet: Record<string, (domId: string) => void> = {
  init: initMap,
  second: initMap,
}

onMounted(() => {
  activeKey.value = "init"
})

watch(activeKey, (val) => {
  mapSet[val]?.(val)
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
