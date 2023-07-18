<template>
  <div class="q-pa-md">
    <div class="sidebar no-shadow">
      <q-list>
        <q-item clickable v-for="item in menuItems" :key="item.title" :active="link === item.title"
          @click="link = link != item.title ? item.title : null" active-class="sidebar-items">
          <q-item-section avatar>
            <q-icon :name=item.icon />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" transition-show="scale" transition-hide="scale" :delay=delay
            style="border-radius: 0;">
            {{ item.tooltip }}
          </q-tooltip>
        </q-item>
        <q-separator />
        <q-item clickable @click="zoom(1)">
          <q-item-section avatar>
            <q-icon name="sym_o_add" />
          </q-item-section>
        </q-item>
        <q-item clickable @click="zoom(-1)">
          <q-item-section avatar>
            <q-icon name="sym_o_remove" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="content no-shadow">
      <keep-alive>
        <component :is="menuItems[link]?.tool" :width="menuItems[link]?.width"></component>
      </keep-alive>
    </div>
    <div v-if="drawerState" class="q-ml-sm">
      <draw-tool />
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import FeaturesTool from './FeaturesTool.vue';
import ProcessingTool from './ProcessingTool.vue';
import InformationTool from './InformationTool.vue';
import DrawTool from './DrawTool.vue';
import { useMapStore } from 'src/stores/map-store';
import { easeOut } from 'ol/easing';
import { useWidgetStore } from 'src/stores/widget-store';

const link = ref(null)
const delay = ref(700)
const mapStore = useMapStore()
const widgetStore = useWidgetStore()
const drawerState = ref(false)
const menuItems = shallowRef({
  FeaturesTool: { tool: FeaturesTool, width: '450px', title: 'FeaturesTool', icon: 'mdi-map', tooltip: 'Features' },
  ProcessingTool: { tool: ProcessingTool, width: '400px', title: 'ProcessingTool', icon: 'handyman', tooltip: 'Processings' },
  InformationTool: { tool: InformationTool, width: '400px', title: 'InformationTool', icon: 'info', tooltip: 'Information' }
})

/**
 * Ecouteur de changement du gestionnaire de widget
 */
widgetStore.$subscribe((mutation) => {
  drawerState.value = widgetStore.widget === 'drawTool' ? true : false;
});

/**
 * Fonction de zoom.
 * @param {Number} value. Valeur de zoom à appliquer
 */
function zoom(value) {
  mapStore.mainMap.getView().animate({
    zoom: mapStore.mainMap.getView().getZoom() + value,
    duration: 250,
    easing: easeOut
  })
}
</script>

<style lang="sass" scoped>
.q-pa-md
  display: flex
  overflow: hidden
.sidebar
  border: 1px solid rgba(0,0,0,0.2)
  position: relative
  min-width: 55px
  width: 55px
  color: $primary
  background-color: $secondary
  overflow: hidden
.sidebar-items
  color: $secondary
  background-color: $primary
  overflow: hidden
.content
  border-width: 1px 0px 0px 0px
  border-radius: 0
  border-style: solid
  border-color: rgba(0,0,0,0.2)
  position: relative
</style>
