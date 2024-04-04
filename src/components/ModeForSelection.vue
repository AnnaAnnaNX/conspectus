<template>
  <div>
    <v-radio-group
      :model-value="modeForSelection"
      @update:modelValue="updateModeForSelection"
      label="Mode for future selections"
    >
      <v-radio
          v-for="mode in listOfModes"
          :key="mode"
          :label="mode"
          :value="mode"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  modeForSelection: string
}>()

const emit = defineEmits(['updateModeForSelection'])

function updateModeForSelection(value: string | number | null) {
  console.log('updateModeForSelection', value)
    emit('updateModeForSelection', value)
}

const listOfModes = ref<string[]>(["main", "interesting", "off-topic", "all"].filter(el => (el !== 'all')))
const nameByMode = ref<{[key: string]: number}>({ 'main': 0, 'interesting': 1, 'off-topic': 2, 'all': 3 })

</script>
