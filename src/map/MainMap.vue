<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div id="map" class="map-container"></div>
    </q-page-container>
    <widget-toolbar />
    <layers-tool />
  </q-layout>
</template>

<script setup>
import { Map, View } from 'ol';
import { MAP_SETTINGS } from '../miscellaneous/enum';
import { fromLonLat } from 'ol/proj';
import WidgetToolbar from '../components/widgets/WidgetToolbar.vue';
import MapLayers from '../map/MapLayers';
import LayersTool from '../components/widgets/LayersTool.vue';
import { useMapStore } from '../stores/map-store';
import { ref, onMounted } from 'vue';
import MapElement from './MapElement';

const mapStore = useMapStore();
const map = ref(null)

onMounted(() => {
  map.value = new Map({
    target: 'map',
    controls: [],
    view: new View({
      center: fromLonLat(MAP_SETTINGS.CENTER),
      zoom: MAP_SETTINGS.ZOOM,
      maxZoom: MAP_SETTINGS.MAXZOOM,
      minZoom: MAP_SETTINGS.MINZOOM
    }),
  });
  new MapLayers({
    map: map.value
  });
  new MapElement({
    map: map.value
  })
  mapStore.defineMap(map.value)
})
</script>

<style lang="sass">
@import "ol/ol.css"

#map
  position: absolute
  top: 0
  bottom: 0
  width: 100%
</style>
