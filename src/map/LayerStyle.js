import {
  LAYERS_SETTINGS,
  STYLE_SETTINGS,
  FEATURES_SETTINGS,
} from "../miscellaneous/enum";
import {
  Fill,
  Stroke,
  Style
} from "ol/style";
import ApiRequestor from "src/Services/ApiRequestor";


class LayerStyle {
  constructor({ mapLayer }) {
    this.styleCache = {};
    //this.mapLayer = map.getLayers().getArray().find(layer => layer.get('name') == LAYERS_SETTINGS.VECTOR_TILES.NAME);
    this.mapLayer = mapLayer
    this.initializeStyle();

    this.mapLayer.setStyle(this.cartoFunction.bind(this))
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
        this.styleCache[style.id_typology] = new Style({
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
    };

  /**
   * Fonction d'application des styles aux features
   * @param {Objet} feature - entité à styliser.
   */
  cartoFunction(feature) {
    // Application des styles en fonction d'id_typology
    if (
      this.styleCache[feature.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD)]
    ) {
      return this.styleCache[
        feature.get(FEATURES_SETTINGS.TYPOLOGY.ID_TYPOLOGY_FIELD)
      ];
    }
    // Si le style n'est pas disponible alors le DEFAULT_STYLE est retourné
    else {
      return STYLE_SETTINGS.DEFAULT_STYLE;
    }
  }
}

export default LayerStyle;
