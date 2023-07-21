<template>
  <div class="drawer no-shadow" style="font-size: 2em">
    <q-list>
      <q-item clickable @click="tester()">
        <q-item-section avatar>
          <q-icon name="sym_o_pentagon" />
        </q-item-section>
        <q-tooltip anchor="center right" self="center left" transition-show="scale" transition-hide="scale" delay=500
          style="border-radius: 0;">
          Ajouter un polygone
        </q-tooltip>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="sym_o_timeline" />
        </q-item-section>
        <q-tooltip anchor="center right" self="center left" transition-show="scale" transition-hide="scale" delay=500
          style="border-radius: 0;">
          Ajouter une ligne
        </q-tooltip>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="sym_o_undo" />
        </q-item-section>
        <q-tooltip anchor="center right" self="center left" transition-show="scale" transition-hide="scale" delay=500
          style="border-radius: 0;">
          Annuler
        </q-tooltip>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="sym_o_redo" />
        </q-item-section>
        <q-tooltip anchor="center right" self="center left" transition-show="scale" transition-hide="scale" delay=500
          style="border-radius: 0;">
          Refaire
        </q-tooltip>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { useMapStore } from 'src/stores/map-store';
import { useWidgetStore } from 'src/stores/widget-store';
import { onUnmounted } from 'vue';
import { Modify } from 'ol/interaction'
import { ref } from 'vue'


const mapStore = useMapStore()
const widgetStore = useWidgetStore()
const drawMode = ref(null)

drawMode.value = widgetStore.drawMode

const modifyInteraction = new Modify({
  source: mapStore.editionLayer.getSource()
})

mapStore.map.addInteraction(modifyInteraction)

// widgetStore.$subscribe((mutation) => {
//   let drawMode = widgetStore.drawModeTest
//   console.log(widgetStore.menuItem)
// });

onUnmounted(() => {
  modifyInteraction.setActive(false)
});

</script>

<style lang="sass" scoped>
.drawer
  border: 1px solid rgba(0,0,0,0.2)
  position: relative
  min-width: 55px
  width: 55px
  max-height: 145px
  color: $primary
  background-color: $secondary
  overflow: hidden
</style>
