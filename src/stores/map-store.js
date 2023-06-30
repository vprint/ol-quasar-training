import { defineStore } from "pinia";

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
