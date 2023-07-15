import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import MVT from "ol/format/MVT.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorTileSource from "ol/source/VectorTile.js";
import ApiRequestor from "../Services/ApiRequestor";
import {
  LAYERS_SETTINGS,
  STYLE_SETTINGS,
  FEATURES_SETTINGS,
} from "../miscellaneous/enum";
import { Fill, Stroke, Style } from "ol/style";

class LayersAndStyle {
  constructor({ map }) {
    this.StyleCache = {};
    this.initializeStyle();

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
      style: this.cartoFunction.bind(this),
    });

    // Layer de sélection
    this.selectionLayer = new VectorTileLayer({
      renderMode: "vector",
      source: this.features.getSource(),
      name: LAYERS_SETTINGS.SELECTION_LAYER.NAME,
      zIndex: LAYERS_SETTINGS.SELECTION_LAYER.ZINDEX,
      visible: LAYERS_SETTINGS.SELECTION_LAYER.VISIBLE,
    });

    // Layer d'édition
    this.editionLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: LAYERS_SETTINGS.EDITION_LAYER.ZINDEX,
      name: LAYERS_SETTINGS.EDITION_LAYER.NAME,
      style: LAYERS_SETTINGS.EDITION_LAYER.STYLE,
      visible: LAYERS_SETTINGS.EDITION_LAYER.VISIBLE,
    });

    // Fond de plan OSM
    this.osmLayer = new TileLayer({
      source: new XYZ({
        url: `${LAYERS_SETTINGS.BACKGROUND.OSM.URL}`,
        tilePixelRatio: 2,
        zIndex: 1,
        attributions: [LAYERS_SETTINGS.BACKGROUND.OSM.ATTRIBUTION],
      }),
      zIndex: LAYERS_SETTINGS.BACKGROUND.OSM.ZINDEX,
      name: LAYERS_SETTINGS.BACKGROUND.OSM.NAME,
      visible: LAYERS_SETTINGS.BACKGROUND.OSM.VISIBLE
    });

    // Fond de plan JawgMaps basique
    this.JawgMapsStreets = new TileLayer({
      source: new XYZ({
        url: `${LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.URL}access-token=${LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.TOKEN}`,
        tilePixelRatio: 2,
        zIndex: 1,
        attributions: [LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.ATTRIBUTION],
      }),
      zIndex: LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.ZINDEX,
      name: LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.NAME,
      visible: LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_STREETS.VISIBLE
    });

    // Fond de plan JawgMaps clair
    this.JawgMapsLight = new TileLayer({
      source: new XYZ({
        url: `${LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_LIGHT.URL}access-token=${LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_LIGHT.TOKEN}`,
        tilePixelRatio: 2,
        zIndex: 1,
        attributions: [LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_LIGHT.ATTRIBUTION],
      }),
      zIndex: LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_LIGHT.ZINDEX,
      name: LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_LIGHT.NAME,
      visible: LAYERS_SETTINGS.BACKGROUND.JAWGMAPS_LIGHT.VISIBLE
    });

    map.addLayer(this.features);
    map.addLayer(this.selectionLayer);
    map.addLayer(this.editionLayer);
    map.addLayer(this.osmLayer);
    map.addLayer(this.JawgMapsStreets);
    map.addLayer(this.JawgMapsLight);
  }

  /**
   * Fonction de requêtage des styles
   */
  async initializeStyle() {
    // Requête du style
    let JSONStyle = await ApiRequestor.getStyles();

    // Décomposition des styles reçus
    if (JSONStyle) {
      for (let style of JSONStyle) {
        this.StyleCache[style.id_typology] = new Style({
          stroke: new Stroke({
            color: style.stroke_color || "transparent",
            width: style.stroke_width || 0,
            lineDash: style.line_dash || null,
          }),
          fill: new Fill({
            color: style.fill_color || "transparent",
          }),
        });
      }
    }
  }

  /**
   * Fonction d'application des styles aux features
   * @param {Objet} feature - entité à styliser.
   */
  cartoFunction(feature) {
    // Application des styles en fonction d'id_typology
    if (
      this.StyleCache[feature.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD)]
    ) {
      return this.StyleCache[
        feature.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD)
      ];
    }
    // Si le style n'est pas disponible alors le DEFAULT_STYLE est retourné
    else {
      return STYLE_SETTINGS.DEFAULT_STYLE;
    }
  }
}

export default LayersAndStyle;
