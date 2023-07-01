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
          <!-- <q-table v-if="features.length > 1" square flat bordered square title="Entités" :rows="features" :columns="columns"
            row-key="id_" selection="single" v-model:selected="selected">
            <template v-slot:bottom>
              <q-space />
              <q-btn square flat @click="disableSelectionState" color="primary" label="Retour" class="q-ml-sm" />
              <q-btn @click="enableModification" :disable="selected.length < 1" color="primary" icon="done"
                label="Continuer" class="merriweather" />
            </template>
          </q-table>-->
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" title="Gestion attributaire" icon="view_headline" class="merriweather">
        <div class="merriweather">Ajouter ou modifier les informations</div>
        <q-stepper-navigation>
          <q-select v-model="model" :options="types" label="Types" />
          <br>
          <div class="row justify-end">
            <q-btn square flat @click="disableModification" color="primary" label="Retour" class="q-ml-sm merriweather" />
            <q-btn square color="primary" label="Enregistrer" class="merriweather" icon="save" />
          </div>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </RegularWidget>
</template>

<script setup >
import { ref } from 'vue';
import FeatureSelector from '../../selector/FeatureSelector.vue'
import RegularWidget from '../../../RegularWidget.vue';
import ApiRequestor from 'src/Services/ApiRequestor';

const actionType = ref(null);
const step = ref(1);
const selected = ref([])
const typology = ref({})
const types = ref([])
formatTypology()
const model = ref(null)

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
function enableModification(feature) {
  step.value = 4
  model.value = typology.value[feature[0].properties_.id_typology]
}

/**
 * Fonction de desactivation de l'étape de modification
 */
function disableModification() {
  step.value = actionType.value === 'select' ? 3 : 2
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
