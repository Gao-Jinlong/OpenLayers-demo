import OlMap from "ol/Map.js"
import View from "ol/View.js"
import { BingMaps, TileWMS } from "ol/source"
import { Tile } from "ol/layer"
import TileLayer from "ol/layer/Tile"
import "ol/ol.css"

// const styles = [
//   "RoadOnDemand",
//   "Aerial",
//   "AerialWithLabelsOnDemand",
//   "CanvasDark",
//   "OrdnanceSurvey",
// ]
// const layers: Tile<BingMaps>[] = []
// let i, ii
// for (i = 0, ii = styles.length; i < ii; ++i) {
//   layers.push(
//     new Tile({
//       visible: false,
//       preload: Infinity,
//       source: new BingMaps({
//         // https://www.bingmapsportal.com/Application
//         key: "Your Bing Maps Key",
//         imagerySet: styles[i],
//       }),
//     })
//   )
// }

export function initMap(domId: string) {
  new OlMap({
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

  // new OlMap({
  //   layers: layers,
  //   view: new View({
  //     center: [0, 0],
  //     zoom: 2,
  //   }),
  //   target: "map",
  // })

  // const select = document.getElementById("layer-select") as HTMLSelectElement
  // select.addEventListener("change", onChange)
  // function onChange() {
  //   const style = select.value
  //   for (let i = 0, ii = layers.length; i < ii; ++i) {
  //     layers[i].setVisible(styles[i] === style)
  //   }
  // }
}
