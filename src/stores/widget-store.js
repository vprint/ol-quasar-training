import { defineStore } from 'pinia';

export const useWidgetStore = defineStore('widget', {
  state: () => ({
    _widget: null,
    _drawMode: {
      addLine: false,
      addPolygon: false,
      modify: false
    }
  }),
  getters: {
    widget: (state) => state._widget,
    drawMode: (state) => {
      for (let e in state._drawMode) {
        if (state._drawMode[e]) {
          return state._drawMode[e]
        }
      }
    },
    drawModeTest: (state) => state._drawMode,
  },
  actions: {
    setActiveWidget(name) {
      this._widget = name
    },
    setDrawMode() {
      this._drawMode = {
        addLine: false,
        addPolygon: false,
        modify: true
      }
    },
  },
});
