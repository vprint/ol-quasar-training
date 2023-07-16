import { defineStore } from 'pinia';

export const useWidgetStore = defineStore('widget', {
  state: () => ({
    _widget: null,
  }),
  getters: {
    widget: (state) => state._widget
  },
  actions: {
    setActiveWidget(name) {
      this._widget = name
    },
  },
});
