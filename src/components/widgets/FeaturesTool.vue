TODO: enlever les éléments commenté. #testing
<!-- <div class="q-mt-md">
    <q-fab square color="secondary" text-color="primary" icon="mdi-map" direction="right" class="q-pl-md q-pt-sm"
      v-if=!selectionState>
      <q-fab-action square color="secondary" text-color="primary" @click="console.log('select')"
        icon="mdi-cursor-default-click-outline">
        <q-tooltip>
          Selectionner un élément sur la carte
        </q-tooltip>
      </q-fab-action>
      <q-fab-action square color="secondary" :label="message" text-color="primary"
        @click="selectionState = !selectionState" icon="mdi-shape-polygon-plus">
        <q-tooltip>
          Créer un nouvel élément
        </q-tooltip>
      </q-fab-action>
    </q-fab>
    <div class="stepper-container" v-if=selectionState>
      <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
        <q-step :name="1" title="Select campaign settings" icon="settings" :done="step > 1" :header-nav="step > 1">
          For each ad campaign that you create, you can control how much you're willing to
          spend on clicks and conversions, which networks and geographical locations you want
          your ads to show on, and more.

          <q-stepper-navigation>
            <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="2" title="Create an ad" icon="add_comment" :header-nav="step > 2">
          Try out different ad text to see what brings in the most customers, and learn how to
          enhance your ads using features like ad extensions. If you run into any problems with
          your ads, find out how to tell if they're running and how to resolve approval issues.

          <q-stepper-navigation>
            <q-btn color="primary" @click="done3 = true" label="Finish" />
            <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </div> -->
TODO: enlever les éléments commenté. #testing

<template>
  <div class="q-pa-md">
    <div class="sidebar no-shadow">
      <q-list>
        <q-item clickable :active="link === 'map'" @click="link = link != 'map' ? 'map' : null"
          active-class="sidebar-items">
          <q-item-section avatar>
            <q-icon name="mdi-map" />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" delay=700>
            Features
          </q-tooltip>
        </q-item>
        <q-item clickable v-ripple :active="link === 'processings'"
          @click="link = link != 'processings' ? 'processings' : null" active-class="sidebar-items">
          <q-item-section avatar>
            <q-icon name="handyman" />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" delay=700>
            Processing
          </q-tooltip>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple :active="link === 'layers'" @click="link = link != 'layers' ? 'layers' : null"
          active-class="sidebar-items">
          <q-item-section avatar>
            <q-icon name="mdi-layers" />
          </q-item-section>
          <q-tooltip anchor="center right" self="center left" delay=700>
            Layers
          </q-tooltip>
        </q-item>
      </q-list>
    </div>
    <div class="content no-shadow">
      <q-card v-if="link == 'map'" class="regular-card no-shadow">
        <q-card-section class="regular-header">
          <div class="merriweather">Données cartographiques</div>
        </q-card-section>
        <q-stepper v-model="step" vertical color="primary" animated class="regular-stepper no-shadow">
          <q-step :name="1" active-icon="ads_click" title="Sélectionner le type d'action" :done="step > 1"
            class="merriweather">
            <div class="merriweather">Sélectionner le type d'action à effectuer.</div>
            <q-stepper-navigation>
              <q-btn @click="step = 2, actionType = 'create'" color="primary" label="Ajouter" class="merriweather" />
              <q-btn @click="step = 3, actionType = 'select'" color="primary" label="Sélectionner" class="merriweather" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="2" title="Ajouter une entité" icon="create_new_folder" :done="step > 2"
            :disable="actionType === 'select'" class="merriweather">
            <div class="merriweather">Ajouter une entité sur la carte.</div>

            <q-stepper-navigation>
              <q-btn @click="step = 4" color="primary" label="Continue" class="merriweather" />
              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="3" title="Sélectionner une entité" icon="assignment" :done="step > 3"
            :disable="actionType === 'create'" class="merriweather">
            <div class="merriweather">Cliquer sur une entité de la carte afin de la sélectionner.</div>
            <q-stepper-navigation>
              <q-btn @click="step = 4" color="primary" label="Continue" class="merriweather" />
              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="4" title="Modification attributaire" icon="add_comment" class="merriweather">
            <div class="merriweather">Ajouter ou modifier les informations</div>


            <q-stepper-navigation>
              <q-btn color="primary" label="Finish" class="merriweather" />
              <q-btn flat @click="step = actionType === 'select' ? 3 : 2" color="primary" label="Back"
                class="q-ml-sm merriweather" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card>
      <q-card v-if="link == 'processings'" class="simple-card no-shadow">
        <q-card-section class="regular-header">
          <div class="merriweather">Géotraitements</div>
        </q-card-section>
      </q-card>
      <q-card v-if="link == 'layers'" class="simple-card no-shadow">
        <q-card-section class="regular-header">
          <div class="merriweather">Gestion des couches</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      actionType: ref(null),
      link: ref(null),
      step: ref(1)
    }
  }
}
</script>

<style lang="sass">
.q-pa-md
  display: grid
  grid-template-columns: 55px 400px
.sidebar
  border-width: 1px 1px 1px 1px
  border-style: solid
  border-color: $blue-grey-4
  position: relative
  max-width: 55px
  overflow: hidden
  color: $primary
  background-color: $secondary
.sidebar-items
  color: $secondary
  background-color: $primary
.regular-card
  background-color: $secondary
  position: relative
  width: 100%
  height: 600px
  border-radius: 0
  border-width: 1px 1px 1px 0px
  border-style: solid
  border-color: $blue-grey-4
.regular-stepper
  background-color: $secondary
  position: relative
  width: 100%
  max-height: 100%
.regular-header
  background-color: $primary
  color: $secondary
  text-align: center
  max-height: 48px
</style>

