<template>
  <q-page-sticky @click="active = !active" position="bottom" class="q-px-md q-py-md">
    <q-btn fab icon="mdi-layers" color="secondary" text-color="primary" />
  </q-page-sticky>
  <KeepAlive>
    <q-card v-if="active" square class="regular-card">
      <q-card-section class="regular-section">
        <div class="q-pa-xs column-row-wrapping">
          <div class="column" style="height: 100px">
            <div class=" col-3 col-sm-10 button-center">
              <q-btn round @click="console.log('ok')">
                <q-avatar size="70px">
                  <img
                    src="https://tile.jawg.io/jawg-streets/13/6459/3787@2x.png?access-token=2GrZUqJYwWQq7Yjjh2U9D6BIwBfEYABjjQTXDeAoA1VHH8pPGqX08ruNfrpwSMbE">
                </q-avatar>
              </q-btn>
            </div>
            <div class="col-3 col-sm-2">
              <p class="regular-font">tester1</p>
            </div>

            <div class="col-3 col-sm-10 button-center">
              <q-btn round @click="console.log('ok')">
                <q-avatar size="70px">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                </q-avatar>
              </q-btn>
            </div>
            <div class="col-3 col-sm-2">
              <p class="regular-font">tester2</p>
            </div>
            <div class="col-3 col-sm-10 button-center">
              <q-btn round @click="console.log('ok')">
                <q-avatar size="70px">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                </q-avatar>
              </q-btn>
            </div>
            <div class="col-3 col-sm-2">
              <p class="regular-font">tester3</p>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </KeepAlive>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(false);

</script>

<style lang="sass" scoped>
.regular-card
  background-color: grey
  position: fixed
  height: 100px
  width: 300px
  bottom:50px
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
