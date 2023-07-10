<template>
  <RegularWidget title="Données cartographiques">
    <q-stepper v-model="step" vertical color="primary" animated class="regular-stepper no-shadow">
      <q-step :name="1" title="Sélectionner le type d'action" :done="step > 1" class="merriweather">
        <div class="merriweather">Sélectionner le type d'action à effectuer.</div>
        <q-stepper-navigation>
          <div class="row justify-end">
            <q-btn square flat @click="step = 2, actionType = 'create'" icon="mdi-shape-polygon-plus" color="primary"
              label="Créer" class="merriweather" />
            <q-btn square flat @click="enableSelectionState" icon="mdi-cursor-default-click-outline" color="primary"
              label="Sélectionner" class="merriweather" />
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="Ajouter une entité" icon="create_new_folder" :done="step > 2"
        :disable="actionType === 'select'" class="merriweather">
        <div class="merriweather">Ajouter une entité sur la carte.</div>
        <q-stepper-navigation>
          <div class="row justify-end">
            <q-btn square flat @click="step = 1" color="primary" label="Retour" class="q-ml-sm" />
            <q-btn square @click="step = 4" color="primary" icon="done" label="Continuer" class="merriweather" />
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Sélectionner une entité" icon="ads_click" active-icon="ads_click" :done="step > 3"
        :disable="actionType === 'create'" class="merriweather">
        <div class="merriweather">Cliquer sur une entité de la carte afin de la sélectionner.</div>
        <q-stepper-navigation>
          <feature-selector @selector-next="enableModification" @selector-back="disableSelectionState" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" title="Gestion attributaire" icon="view_headline" class="merriweather">
        <div class="merriweather">Ajouter ou modifier les informations</div>
        <q-stepper-navigation>
          <q-form @reset="disableModification" class="q-gutter-md">
            <q-select v-model="featureType" :options="types" label="Types" />
            <q-input v-model="observation" label="Observation" />
            <br>
            <div class="row justify-end">
              <q-btn square flat type="reset" color="primary" label="Retour" />
              <q-space />
              <q-btn square @click="deleting = true" color="primary" label="Supprimer" class="q-mr-sm" />
              <q-btn square @click="saving = true" color="positive" label="Enregistrer" class="merriweather" />
            </div>
          </q-form>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <q-dialog v-model="deleting" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="sym_o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Cette action est définitive. Confirmer la suppression ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Supprimer" color="primary" @click="deleteFeature" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="saving" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="save" color="primary" text-color="white" />
          <span class="q-ml-sm">Cette action est définitive. Confirmer les modifications' ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Enregistrer" color="primary" @click="saveFeature" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </RegularWidget>
</template>

<script setup >
import { ref } from 'vue';
import FeatureSelector from '../../selector/FeatureSelector.vue'
import RegularWidget from '../../../RegularWidget.vue';
import ApiRequestor from 'src/Services/ApiRequestor';
import GeoJSON from 'ol/format/GeoJSON'
import { useMapStore } from "src/stores/map-store";

const mapStore = useMapStore();
const actionType = ref(null);
const step = ref(1);
const typology = ref({})
const types = ref([])
const observation = ref(null)
const featureType = ref(null)
const deleting = ref(false)
const saving = ref(false)

let workingFeature = null


formatTypology()

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
 * Fonction de gestion de l'étape de sélection
 */
function enableSelectionState() {
  actionType.value = 'select'
  step.value = 3
}

/**
 * Fonction de desactivation de l'étape de sélection
 */
function disableSelectionState() {
  step.value = 1
}

/**
 * Fonction d'activation de l'étape de modification
 */
async function enableModification(feature) {
  let getFeature = await ApiRequestor.getFeatureById(feature[0].getId())
  workingFeature = new GeoJSON().readFeature(getFeature, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  })
  step.value = 4
  featureType.value = typology.value[feature[0].properties_.id_typology]
  observation.value = feature[0].properties_.commentaire
}

/**
 * Fonction de desactivation de l'étape de modification
 */
function disableModification() {
  step.value = actionType.value === 'select' ? 3 : 2
}

async function deleteFeature() {
  let featureToDelete = wfsFormatter(workingFeature);
  await ApiRequestor.deleteFeature(featureToDelete);
  mapStore.MapLayer.getSource().refresh();
}

async function saveFeature() {
  let featureToUpdate = wfsFormatter(workingFeature);
  await ApiRequestor.updateFeature(featureToUpdate);
  mapStore.MapLayer.getSource().refresh();
}

function wfsFormatter(feature) {
  feature.set('id_typology', Object.keys(typology.value).find(key => typology.value[key] === featureType.value));
  feature.set('commentaire', observation.value);
  feature.setGeometryName('geom');
  feature.unset('id');
  return feature;
}

</script>

<style lang="sass" scoped>
.regular-stepper
  background-color: $secondary
  height: 100%
  width: 100%
  padding: 0px 0
  overflow: auto
.stepper-navigation-right
  display: flex
  justify-content: flex-end
.stepper-navigation-buttons
  display: flex
  justify-content: flex-end
</style>
