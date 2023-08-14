import OlMap from "ol/Map.js"
import View from "ol/View.js"
import { TileWMS } from "ol/source"
import TileLayer from "ol/layer/Tile"
import "ol/ol.css"

export function initMap(domId: string) {
  return new OlMap({
    target: domId,
    view: new View({
      projection: "EPSG:3857",
      center: [0, 0],
      zoom: 2,
    }),
    layers: [
      new TileLayer({
        source: new TileWMS({
          projection: "EPSG:4326", // 会重新投影到 EPSG:3857
          url: "https://ahocevar.com/geoserver/wms",
          params: {
            LAYERS: "ne:NE1_HR_LC_SR_W_DR",
          },
        }),
      }),
    ],
  })
}
