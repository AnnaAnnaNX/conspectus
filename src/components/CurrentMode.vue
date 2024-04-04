<template>
  <div>
    <v-label style="margin-left: 15px; margin-top: 10px; margin-bottom: 20px;">Displayed mode</v-label>
    <v-slider
      style="margin-left: -123px;"
      direction="vertical"
      :max="3"
      :model-value="nameByMode[currentMode]"
      :ticks="listOfModesObj"
      show-ticks="always"
      step="1"
      tick-size="4"
      @update:modelValue="updateCurrentMode"
    >
      <template v-slot:label="{item}: any">
       {{item}}
      </template>
    </v-slider>
  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  currentMode: string
}>()

const emit = defineEmits(['updateCurrentMode'])

function updateCurrentMode(value: number) {
    emit('updateCurrentMode', listOfModesObj.value[value])
}

// inverse ticks
const listOfModesObj = ref<{[key: string]: string}>({ '0': "main", '1': "interesting", '2': "off-topic", '3': "all" })
const nameByMode = ref<{[key: string]: number}>({ 'main': 0, 'interesting': 1, 'off-topic': 2, 'all': 3 })

</script>
