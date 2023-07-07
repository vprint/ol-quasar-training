<template>
  <q-table v-if="features.length > 0" dense flat bordered square title="Entités" :rows="features" :columns="columns"
    row-key="id_" selection="single" v-model:selected="selected" rows-per-page-options=0 @selection="onRowSelection">
    <template v-slot:bottom>
      <q-space />
      <q-btn flat square @click="back" color="primary" label="Retour" class="q-ml-sm" />
      <q-btn square @click="next" :disable="selected.length < 1" color="primary" icon="done" label="Continuer"
        class="merriweather" />
    </template>
  </q-table>
</template>

<script setup>
import { useMapStore } from "src/stores/map-store";
import { ref, onUnmounted } from 'vue';
import ApiRequestor from "src/Services/ApiRequestor";
import { LAYERS_SETTINGS } from "src/miscellaneous/enum";
import GeoJSON from 'ol/format/GeoJSON'
import { easeOut } from 'ol/easing';

const emit = defineEmits(['selectorBack', 'selectorNext'])

const features = ref([])
const mapStore = useMapStore();
const selected = ref([])
const columns = [
  {
    name: 'FeatureType',
    required: true,
    label: 'Type',
    align: 'left',
    field: row => row.properties_.id_typology,
    format: val => typology[val]
  },
  {
    name: 'id_',
    label: 'ID',
    align: 'left',
    field: 'id_',
  }
]
let selectedIds = []
let typology = {}
let types = []
let selectedFeatureId = null
let featuresSelector = null
let FeaturesBbox = null

formatTypology()
enableSelection()
//mapStore.selectionLayer.setStyle(selectionStyle)


/**
 * Fonction de requêtage des typologies.
 */
async function formatTypology() {
  // Requête du style
  let query = await ApiRequestor.getTypology();
  for (let type of query) {
    typology[type.id_typology] = type.typology_name
    types.push(type.typology_name)
  }
}

async function getBbox(selectedElement) {
  // Requête les étendues des features
  FeaturesBbox = await ApiRequestor.getBoundingBox(selectedElement);
}

/**
 *
 * Fonction de sélection des entités sur la carte.
 */
function enableSelection() {
  featuresSelector = (e) => {
    reset()
    mapStore.selectionLayer.setVisible(true)
    features.value = mapStore.map.getFeaturesAtPixel(e.pixel, {
      hitTolerance: 5,
      layerFilter: function (layer) {
        return layer.get('name') === LAYERS_SETTINGS.VECTOR_TILES.NAME;
      }
    });
    // Lorsqu'une entité est selectionnée, selectedIds se met à jour avec la liste des ids des entités sélectionnées.
    selectedIds = features.value.map(feature => feature.getId())
    // Application du style de sélection et rafraichissement de l'affichage.
    mapStore.selectionLayer.setStyle(selectionStyle)
    mapStore.selectionLayer.changed()
    getBbox(selectedIds)
  }
  mapStore.map.on("click", featuresSelector);
};

/**
 * Fonction de gestion de la sélection d'une ligne du tableau.
 * @param {Object} selectedRow
 */
function onRowSelection(selectedRow) {
  if (selectedRow.added) {
    selectedFeatureId = selectedRow.rows[0].getId()
    let featureExtent = FeaturesBbox.find(x => x.id === selectedFeatureId)
    let bboxGeometry = new GeoJSON().readGeometry(featureExtent.geometry, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
    mapStore.mainMap.getView().fit(bboxGeometry, {
      padding: [50, 50, 50, 600],
      maxZoom: 17,
      duration: 250,
      easing: easeOut
    })
    mapStore.selectionLayer.setStyle(selectedFeatureStyle)
  } else {
    mapStore.selectionLayer.setStyle(selectionStyle)
  }
}

/**
 * Definition du style des entités remontées par la sélection.
 */
function selectionStyle(feature) {
  if (selectedIds.includes(feature.getId())) {
    return LAYERS_SETTINGS.SELECTION_LAYER.STYLE;
  }
}

/**
 * Definition du style de l'entité sélectionnée.
 */
function selectedFeatureStyle(feature) {
  if (selectedFeatureId === feature.getId()) {
    return LAYERS_SETTINGS.SELECTION_LAYER.STYLE;
  }
}

function back() {
  emit('selectorBack');
  reset()
}

function next() {
  emit('selectorNext', selected.value)
}

/**
 * Réinitialise les valeurs.
 */
function reset() {
  features.value.length = 0
  selectedIds.length = 0
  selectedFeatureId = null
  mapStore.selectionLayer.setVisible(false)
}

onUnmounted(() => {
  mapStore.map.un("click", featuresSelector);
});
</script>

<style lang="scss" scoped></style>
