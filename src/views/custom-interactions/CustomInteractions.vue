<template>
  <div class="custom-animation">
    <div id="map-container"></div>
  </div>
</template>
<script setup lang="ts">
import MapBrowserEvent from "ol/MapBrowserEvent"
import { LineString, Polygon, Point } from "ol/geom"
import { Feature, Map, View } from "ol"
import {
  Pointer as PointerInteraction,
  defaults as defaultInteractions,
} from "ol/interaction"
import { OGCMapTile, Vector as VectorSource } from "ol/source"
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js"
import { getImageSrc } from "@/utils/getImageSrc"

class Drag extends PointerInteraction {
  private coordinate_: number[] | null
  private cursor_: string | null
  private feature_: any | null
  private previousCursor_: string | undefined

  constructor() {
    super({
      handleDownEvent: handleDownEvent,
      handleDragEvent: handleDragEvent,
      handleMoveEvent: handleMoveEvent,
      handleUpEvent: handleUpEvent,
    })

    this.coordinate_ = null
    this.cursor_ = "pointer"
    this.feature_ = null
    this.previousCursor_ = undefined
  }
}

function handleDownEvent(evt: MapBrowserEvent): boolean {
  const map = evt.map

  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature
  })

  if (feature) {
    this.coordinate_ = evt.coordinate
    this.feature_ = feature
  }

  return !!feature
}
function handleDragEvent(evt: MapBrowserEvent): void {
  const deltaX = evt.coordinate[0] - this.coordinate_[0]
  const deltaY = evt.coordinate[1] - this.coordinate_[1]

  const geometry = this.feature_.getGeometry()
  geometry.translate(deltaX, deltaY)

  this.coordinate_[0] = evt.coordinate[0]
  this.coordinate_[1] = evt.coordinate[1]
}
function handleMoveEvent(evt: MapBrowserEvent): void {
  if (this.cursor_) {
    const map = evt.map
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature
    })
    const element = evt.map.getTargetElement()
    if (feature) {
      if (element.style.cursor !== this.cursor_) {
        this.previousCursor_ = element.style.cursor
        element.style.cursor = this.cursor_
      }
    } else if (this.previousCursor_ !== undefined) {
      element.style.cursor = this.previousCursor_
      this.previousCursor_ = undefined
    }
  }
}
function handleUpEvent(): boolean {
  this.coordinate_ = null
  this.feature_ = null
  return false
}

const pointFeature = new Feature(
  new LineString([
    [-1e7, 1e6],
    [-1e6, 3e6],
  ]),
)
const lineFeature = new Feature(new Point([0, 0]))

const polygonFeature = new Feature(
  new Polygon([
    [
      [-3e6, -1e6],
      [-3e6, 1e6],
      [-1e6, 1e6],
      [-1e6, -1e6],
      [-3e6, -1e6],
    ],
  ]),
)

onMounted(() => {
  const map = new Map({
    target: "map-container",
    interactions: defaultInteractions().extend([new Drag()]),
    layers: [
      new TileLayer({
        source: new OGCMapTile({
          url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad",
          crossOrigin: "",
        }),
      }),
      new VectorLayer({
        source: new VectorSource({
          features: [polygonFeature, pointFeature, lineFeature],
        }),
        style: {
          "icon-src": getImageSrc("icon.png"),
          "icon-opacity": 0.95,
          "icon-anchor": [0.5, 46],
          "icon-anchor-x-units": "fraction",
          "icon-anchor-y-units": "pixels",
          "stroke-width": 3,
          "stroke-color": [255, 0, 0, 1],
          "fill-color": [0, 0, 255, 0.6],
        },
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  })
})
</script>
<style lang="scss">
@use "@/style/common";

.custom-animation {
  @include common.body;
}
</style>
