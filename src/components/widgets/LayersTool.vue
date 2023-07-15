<template>
  <q-page-sticky @click="activateTool()" position="bottom" class="q-px-md q-py-md">
    <q-btn fab icon="mdi-layers" :color=buttonColor :text-color=iconColor />
  </q-page-sticky>
  <KeepAlive>
    <q-card v-if="activated" square class="regular-card">
      <q-card-section class="regular-section">
        <div class="q-pa-xs column-row-wrapping">
          <div class="column" style="height: 100px">
            <div v-for="layer in backgroundLayers" :key="layer.NAME" class="regular-div">
              <div class="col-3 col-sm-10 button-center">
                <q-btn round class="q-ma-xs" @click="setLayer(layer.NAME)">
                  <q-avatar size="70px">
                    <img v-if="layer.TOKEN" :src="`${layer.IMG}access-token=${layer.TOKEN}`">
                    <img v-else :src="`${layer.IMG}`">
                  </q-avatar>
                </q-btn>
              </div>
              <div class="col-3 col-sm-2">
                <p class="regular-font q-ma-xs">{{ layer.NAME }}</p>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </KeepAlive>
</template>

<script setup>
import { LAYERS_SETTINGS } from 'src/miscellaneous/enum';
import { ref } from 'vue';
import { useMapStore } from 'src/stores/map-store';

const activated = ref(false);
const mapStore = useMapStore()
const backgroundLayers = ref(LAYERS_SETTINGS.BACKGROUND)
const buttonColor = ref('secondary')
const iconColor = ref('primary')

function activateTool() {
  activated.value = !activated.value
  if (!activated.value) {
    buttonColor.value = 'secondary'
    iconColor.value = 'primary'
  } else {
    buttonColor.value = 'primary'
    iconColor.value = 'secondary'
  }

}

function setLayer(layerName) {
  for (const background in LAYERS_SETTINGS.BACKGROUND) {
    let backgroundLayer = mapStore.mainMap
      .getLayers()
      .getArray()
      .find(layer => layer.get('name') == LAYERS_SETTINGS.BACKGROUND[background].NAME)
    backgroundLayer.setVisible(false)
  }
  mapStore.mainMap
    .getLayers()
    .getArray()
    .find(layer => layer.get('name') == layerName)
    .setVisible(true)
}
</script>

<style lang="sass" scoped>
.regular-card
  margin: 0px
  padding: 0px

.regular-card
  border: 1px solid rgba(0,0,0,0.2)
  background-color: grey
  position: fixed
  height: 110px
  width: 300px
  bottom:30px
  left: 50%
  transform: translate(-50%, -50%)

.regular-section
  padding: 0px
  background-color: $secondary

.regular-font
  text-align: center
  font: 1em"merriweather", sans-serif

.column-row-wrapping
  .column
    background: $secondary
  .column > div
    background: $secondary
  .column + .column
    margin-top: 1rem

.button-center
  display: flex
  justify-content: center
  align-items: center
</style>
