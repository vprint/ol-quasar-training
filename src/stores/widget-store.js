import { defineStore } from 'pinia';
import FeaturesTool from '../components/widgets/FeaturesTool.vue';
import ProcessingTool from '../components/widgets/ProcessingTool.vue';
import InformationTool from '../components/widgets/InformationTool.vue';

export const useWidgetStore = defineStore('widget', {
  state: () => ({
    _widget: null,
    _menuItems: {
      FeaturesTool: { active: true, tool: FeaturesTool, width: '450px', title: 'FeaturesTool', icon: 'mdi-map', tooltip: 'Features', drawMode: 'modify' },
      ProcessingTool: { active: false, tool: ProcessingTool, width: '400px', title: 'ProcessingTool', icon: 'handyman', tooltip: 'Processings' },
      InformationTool: { active: false, tool: InformationTool, width: '400px', title: 'InformationTool', icon: 'info', tooltip: 'Information' }
    }
  }),
  getters: {
    widget: (state) => state._widget,
    menuItem: (state) => {
      let getActiveWidget = Object.keys(state._menuItems).find(k => state._menuItems[k].active)
      return state._menuItems[getActiveWidget]
    },
    drawMode: (state) => state._menuItems.FeaturesTool.drawMode
  },
  actions: {
    setActiveWidget(name) {
      this._widget = name
    },
    setDrawMode(mode) {
      this._menuItems.FeaturesTool.drawMode = mode
    }
  }
});
