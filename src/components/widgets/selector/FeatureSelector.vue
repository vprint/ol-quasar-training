<template>
  <q-table v-if="features.length > 1" flat bordered square title="Entités" :rows="features" :columns="columns"
    row-key="id_" selection="single" v-model:selected="selected">
    <template v-slot:bottom>
      <q-space />
      <q-btn flat square @click="$emit('selectorBack')" color="primary" label="Retour" class="q-ml-sm" />
      <q-btn square @click="highLightFeatures" :disable="selected.length < 1" color="primary" icon="done"
        label="Continuer" class="merriweather" />
    </template>
  </q-table>
</template>

<script setup>
import { useMapStore } from "src/stores/map-store";
import { ref } from 'vue';
import ApiRequestor from "src/Services/ApiRequestor";

const features = ref([])
const mapStore = useMapStore();
const typology = ref({})
const selected = ref([])
const types = ref([])
const columns = [
  {
    name: 'FeatureType',
    required: true,
    label: 'Type',
    align: 'left',
    field: row => row.properties_.id_typology,
    format: val => typology.value[val]
  },
  {
    name: 'id_',
    label: 'ID',
    align: 'left',
    field: 'id_',
  }
]
let featuresSelector = null;

formatTypology()
enableSelection()

/**
 * Fonction de requêtage des typologies
 */
async function formatTypology() {
  // Reqête du style
  let query = await ApiRequestor.getTypology();
  for (let type of query) {
    typology.value[type.id_typology] = type.typology_name
    types.value.push(type.typology_name)
  }
}

/**
 * Fonction de sélection
 */
function enableSelection() {
  featuresSelector = (e) => {
    features.value = mapStore.map.getFeaturesAtPixel(e.pixel, {
      hitTolerance: 5,
    });
  }
  mapStore.map.on("click", featuresSelector);
};

function highLightFeatures() {
  console.log(mapStore.selectionLayer)
}
</script>

<style lang="scss" scoped></style>
