<template>
  <div class="home-body">
    <div id="map-container"></div>
  </div>
</template>
<script lang="ts" setup>
import Map from "ol/Map.js"
import { OSM, TileDebug } from "ol/source.js"
import TileLayer from "ol/layer/Tile.js"
import View from "ol/View.js"

let map: Map | null = null

onMounted(() => {
  map = new Map({
    target: "map-container",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new TileLayer({
        source: new TileDebug(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
    controls: [],
  })
})
</script>
<style lang="scss" scoped>
.home-body {
  flex: 1;
  width: 100%;
  display: flex;

  #map-container {
    width: 100%;
    height: 100%;
    max-height: 500px;
  }
}
</style>
