import { defineStore } from "pinia";
import { LAYERS_SETTINGS } from "src/miscellaneous/enum";

export const useMapStore = defineStore("map", {
  state: () => ({
    map: null,
    selectedFeatures: []
  }),
  getters: {
    mainMap() {
      return this.map;
    },
    selectionLayer() {
      return this.map.getLayers().getArray().find(layer => layer.get('name') == LAYERS_SETTINGS.SELECTION_LAYER.NAME)
    },
    selectedFeaturesId() {
      return this.selectedFeatures
    }
  },
  actions: {
    defineMap(map) {
      this.map = map;
    },
    setSelectedFeatures(features) {
      this.selectedFeatures = features.map(feature => feature.getId())
    },
    setOGCFeature(feature) {
      this.OGCFeature = feature;
    },
  },
});
