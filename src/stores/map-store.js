import { defineStore } from "pinia";
import { LAYERS_SETTINGS } from "src/miscellaneous/enum";

export const useMapStore = defineStore("map", {
  state: () => ({
    map: null,
    layers: {
      edition: null,
      selection: null,
    },
  }),
  getters: {
    mainMap() {
      return this.map;
    },
    selectionLayer() {
      return this.map.getLayers().getArray().find(layer => layer.get('name') == LAYERS_SETTINGS.SELECTION_LAYER.NAME)
    }
  },
  actions: {
    defineMap(map) {
      this.map = map;
    },
    setOGCFeature(feature) {
      this.OGCFeature = feature;
    },
  },
});
