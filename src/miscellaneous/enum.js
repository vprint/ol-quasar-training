import { Fill, Stroke, Style } from "ol/style";
import { HIDDEN_TOKEN } from "./key";

export const CONNECTION_PROPERTIES = {
  BASE_URL: "http://localhost",
  FeatureServer: {
    LandingPage: "http://localhost:9010/FeatureServer/",
    Collections: "http://localhost:9010/FeatureServer/collections/",
    Functions: "http://localhost:9010/FeatureServer/functions/",
  },
  TREX_SERVER: "http://localhost:6767/",
  GEOSERVER: {
    URL: "http://localhost:8080/geoserver/wfs?",
    FEATURES: {
      SERVICE_PREFIX: "ArchaeoSpringMap",
      NAME: "FEATURES",
    },
    ERROR: "Le geo-serveur est indisponible. Contactez l'administrateur",
  },
};

export const MAP_SETTINGS = {
  CENTER: [103.859064, 13.441288],
  ZOOM: 12,
  MAXZOOM: 18,
  MINZOOM: 7
};

export const LAYERS_SETTINGS = {
  BACKGROUND: {
    JAWGMAPS_STREETS: {
      NAME: "Basique",
      URL: "https://tile.jawg.io/jawg-streets/{z}/{x}/{y}@2x.png?",
      IMG: "https://tile.jawg.io/jawg-streets/13/6459/3787@2x.png?",
      ATTRIBUTION: [
        '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
      ],
      TOKEN: HIDDEN_TOKEN.JAWGS,
      ZINDEX: 1,
      VISIBLE: false
    },
    JAWGMAPS_LIGHT: {
      NAME: "Clair",
      URL: "https://tile.jawg.io/jawg-light/{z}/{x}/{y}@2x.png?",
      IMG: "https://tile.jawg.io/jawg-light/13/6459/3787@2x.png?",
      ATTRIBUTION: [
        '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
      ],
      TOKEN: HIDDEN_TOKEN.JAWGS,
      ZINDEX: 1,
      VISIBLE: false
    },
    JAWGMAPS_DARK: {
      NAME: "Sombre",
      URL: "https://tile.jawg.io/jawg-dark/{z}/{x}/{y}@2x.png?",
      IMG: "https://tile.jawg.io/jawg-dark/13/6459/3787@2x.png?",
      ATTRIBUTION: [
        '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
      ],
      TOKEN: HIDDEN_TOKEN.JAWGS,
      ZINDEX: 1,
      VISIBLE: false
    },
    OSM: {
      NAME: "OSM",
      URL: "https://tile.openstreetmap.org/{z}/{x}/{y}.png?",
      IMG: "https://tile.openstreetmap.org/13/6459/3787.png?",
      ATTRIBUTION: [
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      ],
      ZINDEX: 1,
      VISIBLE: true
    },
  },
  VECTOR_TILES: {
    URL: "http://localhost:6767/ANGKOR_QUALIF_TILESET",
    ATTRIBUTION: ["Tuiles locales"],
    ZINDEX: 2,
    NAME: "Features",
  },
  SELECTION_LAYER: {
    ZINDEX: 3,
    NAME: "Selection",
    STYLE: new Style({
      stroke: new Stroke({
        color: "rgba(220,50,225,1)",
        width: 4,
      }),
      fill: new Fill({
        color: "rgba(220,50,225,0)",
      }),
    }),
    VISIBLE: false,
  },
  EDITION_LAYER: {
    ZINDEX: 4,
    NAME: "Edition",
    STYLE: new Style({
      stroke: new Stroke({
        color: "rgba(220,50,225,1)",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(220,50,225,0.4)",
      }),
    }),
    VISIBLE: true,
  },
};

export const STYLE_SETTINGS = {
  DEFAULT_STYLE: new Style({
    fill: new Fill({
      color: "rgba(255,255,255,0.4)",
    }),
    stroke: new Stroke({
      color: "#3399CC",
      width: 1.25,
    }),
  }),
};

export const API_REQUESTOR = {
  ERROR: "Erreur de requête",
  STYLE_ERROR: "Erreur lors de la récupération des styles",
  TYPOLOGY_ERROR: "Erreur lors de la récupération des types",
  SERVER_ERROR: "Erreur lors de la requête sur le serveur de données",
};
export const FEATURES_SETTINGS = {
  TYPOLOGY: {
    ID_TYPOLOGY_FIELD: "id_typology",
    VALUE_TYPOLOGY_FIELD: "typology_name",
    ID_STUDY_AREA: 80,
  },
  OBSERVATION: "commentaire",
};
