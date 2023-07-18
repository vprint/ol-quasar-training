import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import MVT from "ol/format/MVT.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorTileSource from "ol/source/VectorTile.js";
import {
  LAYERS_SETTINGS
} from "../miscellaneous/enum";
import LayerStyle from "./LayerStyle";

class MapLayers {
  constructor({ map }) {
    this.StyleCache = {};

    // Cartographie thématique
    this.features = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT({
          idProperty: "id",
        }),
        url: `${LAYERS_SETTINGS.VECTOR_TILES.URL}/{z}/{x}/{y}.pbf`,
        attributions: LAYERS_SETTINGS.VECTOR_TILES.ATTRIBUTION,
      }),
      zIndex: LAYERS_SETTINGS.VECTOR_TILES.ZINDEX,
      name: LAYERS_SETTINGS.VECTOR_TILES.NAME,
      preload: Infinity,
      //style: this.cartoFunction.bind(this),
    });
    map.addLayer(this.features)

    // Layer de sélection
    map.addLayer(new VectorTileLayer({
      renderMode: "vector",
      source: this.features.getSource(),
      name: LAYERS_SETTINGS.SELECTION_LAYER.NAME,
      zIndex: LAYERS_SETTINGS.SELECTION_LAYER.ZINDEX,
      visible: LAYERS_SETTINGS.SELECTION_LAYER.VISIBLE,
    }));

    // Layer d'édition
    map.addLayer(new VectorLayer({
      source: new VectorSource(),
      zIndex: LAYERS_SETTINGS.EDITION_LAYER.ZINDEX,
      name: LAYERS_SETTINGS.EDITION_LAYER.NAME,
      style: LAYERS_SETTINGS.EDITION_LAYER.STYLE,
      visible: LAYERS_SETTINGS.EDITION_LAYER.VISIBLE,
    }));

    // Ajout des fonds de plan
    for (let background in LAYERS_SETTINGS.BACKGROUND) {
      map.addLayer(
        new TileLayer({
          source: new XYZ({
            url: LAYERS_SETTINGS.BACKGROUND[background].TOKEN ?
              `${LAYERS_SETTINGS.BACKGROUND[background].URL}access-token=${LAYERS_SETTINGS.BACKGROUND[background].TOKEN}` :
              `${LAYERS_SETTINGS.BACKGROUND[background].URL}`,
            tilePixelRatio: 2,
            zIndex: 1,
            attributions: [LAYERS_SETTINGS.BACKGROUND[background].ATTRIBUTION],
          }),
          zIndex: LAYERS_SETTINGS.BACKGROUND[background].ZINDEX,
          name: LAYERS_SETTINGS.BACKGROUND[background].NAME,
          visible: LAYERS_SETTINGS.BACKGROUND[background].VISIBLE
        })
      )
    }

    // Application des styles
    new LayerStyle({
      mapLayer: this.features
    })
  }
}

export default MapLayers
