<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <div id="map" class="map-container"></div>
    </q-page-container>

    <button-toolbar />

  </q-layout>
</template>

<script>
import { Map, View } from 'ol';
import Link from 'ol/interaction/Link'
import { MAP_SETTINGS } from '../miscellaneous/enum';
import { fromLonLat } from 'ol/proj';
import ButtonToolbar from 'components/ButtonToolbar.vue';
import LayersAndStyle from '../MapElement/LayersAndStyle';

export default {

  components: {
    ButtonToolbar
  },

  name: 'MainLayout',

  mounted() {
    this.map = new Map({
      target: 'map',
      controls: [],
      view: new View({
        center: fromLonLat(MAP_SETTINGS.CENTER),
        zoom: MAP_SETTINGS.ZOOM
      }),
    })
    this.map.addInteraction(new Link({
      params: ['x', 'y', 'z', 'r']
    }))

    new LayersAndStyle({
      map: this.map
    })

  },
};
</script>

<style>
@import "ol/ol.css";

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
