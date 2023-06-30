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
      </q-list>
    </div>
    <div class="content no-shadow">
      <keep-alive>
        <component :is="menuItems[link]?.tool" :width="menuItems[link]?.width"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import FeaturesTool from './tools/FeaturesTool.vue';
import ProcessingTool from './tools/ProcessingTool.vue';
import InformationTool from './tools/InformationTool.vue';

const link = ref(null)
const delay = ref(700)

const menuItems = shallowRef({
  FeaturesTool: { tool: FeaturesTool, width: '500px', title: 'FeaturesTool', icon: 'mdi-map', tooltip: 'Features' },
  ProcessingTool: { tool: ProcessingTool, width: '400px', title: 'ProcessingTool', icon: 'handyman', tooltip: 'Processings' },
  InformationTool: { tool: InformationTool, width: '400px', title: 'InformationTool', icon: 'info', tooltip: 'Information' }
})
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
