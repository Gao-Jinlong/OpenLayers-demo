<template>
  <div class="custom-animation">
    <div id="map-container"></div>
  </div>
</template>
<script setup lang="ts">
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer"
import { Vector as VectorSource, OSM } from "ol/source"
import { View, Map, Feature } from "ol"
import { Point } from "ol/geom"
import { unByKey } from "ol/Observable"
import { easeOut } from "ol/easing"
import { Style, Circle as CircleStyle, Stroke } from "ol/style"
import { getVectorContext } from "ol/render"
import { fromLonLat } from "ol/proj"

const tileLayer = new TileLayer({
  source: new OSM({
    wrapX: true,
  }),
})
const source = new VectorSource({
  wrapX: false,
})
const vector = new VectorLayer({
  source: source,
})

function addRandomFeature() {
  const x = Math.random() * 360 - 180
  const y = Math.random() * 170 - 85
  const geom = new Point(fromLonLat([x, y]))
  const feature = new Feature(geom)
  source.addFeature(feature)
}

const duration = 3000
function flash(feature: Feature) {
  const start = Date.now()
  const flashGeom = feature.getGeometry()!.clone()
  const listenerKey = tileLayer.on("postrender", animate)

  function animate(event) {
    const frameState = event.frameState
    const elapsed = frameState.time - start
    if (elapsed >= duration) {
      unByKey(listenerKey)
      return
    }
    const vectorContext = getVectorContext(event)
    const elapsedRatio = elapsed / duration
    const radius = easeOut(elapsedRatio) * 25 + 5
    const opacity = easeOut(1 - elapsedRatio)

    const style = new Style({
      image: new CircleStyle({
        radius: radius,
        stroke: new Stroke({
          color: "rgba(255, 0, 0, " + opacity + ")",
          width: opacity,
        }),
      }),
    })

    vectorContext.setStyle(style)
    vectorContext.drawGeometry(flashGeom)
    map!.render()
  }
}

source.on("addfeature", function (e) {
  flash(e.feature!)
})

setInterval(addRandomFeature, 1000)

let map: Map | null = null
onMounted(() => {
  map = new Map({
    layers: [tileLayer, vector],
    target: "map-container",
    view: new View({
      center: [0, 0],
      zoom: 1,
      multiWorld: true,
    }),
    controls: [],
  })
})
</script>
<style lang="scss">
@use "@/style/common";

.custom-animation {
  @include common.body;
}
</style>
