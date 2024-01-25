<template>
  <div class="box-selection">
    <div id="map-container"></div>
    <div>
      {{ selectedNames }}
    </div>
  </div>
</template>
<script setup lang="ts">
import GeoJSON from "ol/format/GeoJSON"
import Map from "ol/Map"
import { Vector as VectorLayer } from "ol/layer"
import View from "ol/View"
import { Vector as VectorSource } from "ol/source"
import { Style, Fill, Stroke } from "ol/style"
import { Select, DragBox } from "ol/interaction"
import { platformModifierKeyOnly } from "ol/events/condition"
import { getWidth } from "ol/extent"
import "ol/ol.css"

let map: Map | null = null

const vectorSource = new VectorSource({
  url: "https://openlayers.org/data/vector/ecoregions.json",
  format: new GeoJSON(),
})

const style = new Style({
  fill: new Fill({
    color: "#eeeeee",
  }),
})

const select = new Select({
  style: function (feature) {
    const color = feature.get("COLOR_BIO") || "#eeeeee"
    selectedStyle.getFill().setColor(color)
    return selectedStyle
  },
})
const selectedFeatures = select.getFeatures()

const dragBox = new DragBox({
  // Only select when CTRL is pressed.
  condition: platformModifierKeyOnly,
})

dragBox.on("boxend", function () {
  if (!map) {
    return
  }
  const boxExtent = dragBox.getGeometry().getExtent()

  const worldExtent = map.getView().getProjection().getExtent()
  const worldWidth = getWidth(worldExtent)
  const startWorld = Math.floor((boxExtent[0] - worldExtent[0]) / worldWidth)
  const endWorld = Math.floor((boxExtent[2] - worldExtent[0]) / worldWidth)

  for (let world = startWorld; world <= endWorld; ++world) {
    const left = Math.max(boxExtent[0] - world * worldWidth, worldExtent[0])
    const right = Math.min(boxExtent[2] - world * worldWidth, worldExtent[2])
    const extent = [left, boxExtent[1], right, boxExtent[3]]

    const boxFeatures = vectorSource
      .getFeaturesInExtent(extent)
      .filter(
        (feature) =>
          !selectedFeatures.getArray().includes(feature) &&
          feature.getGeometry()?.intersectsExtent(extent),
      )

    const rotation = map.getView().getRotation()
    const oblique = rotation % (Math.PI / 2) !== 0

    if (oblique) {
      const anchor = [0, 0]
      const geometry = dragBox.getGeometry().clone()
      geometry.translate(-world * worldWidth, 0)
      geometry.rotate(-rotation, anchor)
      const extent = geometry.getExtent()
      boxFeatures.forEach((feature) => {
        const geometry = feature.getGeometry()!.clone()
        geometry.rotate(-rotation, anchor)
        if (geometry.intersectsExtent(extent)) {
          selectedFeatures.push(feature)
        }
      })
    } else {
      selectedFeatures.extend(boxFeatures)
    }
  }
})
dragBox.on("boxstart", function () {
  selectedFeatures.clear()
})

const selectedNames = ref<string[]>([])
selectedFeatures.on(["add", "remove"], function () {
  const names = selectedFeatures.getArray().map((feature) => {
    return feature.get("ECO_NAME")
  })
  selectedNames.value = names
})

onMounted(() => {
  map = new Map({
    target: "map-container",
    layers: [
      new VectorLayer({
        source: vectorSource,
        background: "#000",
        style: function (feature) {
          const color = "#eeeeee"
          style.getFill().setColor(color)
          return style
        },
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
      constrainRotation: 16,
    }),
    controls: [],
  })

  map.addInteraction(select)
  map.addInteraction(dragBox)
})

const selectedStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.6)",
  }),
  stroke: new Stroke({
    color: "rgba(255, 255, 255, 0.7)",
    width: 2,
  }),
})
</script>
<style lang="scss">
@use "@/style/common";

.box-selection {
  @include common.body;
}
</style>
