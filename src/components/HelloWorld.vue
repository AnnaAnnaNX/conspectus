<template>
  <v-slider
    :max="3"
    :ticks="tickLabels"
    show-ticks="always"
    step="1"
    tick-size="4"
  ></v-slider>
</template>

<script setup>
  const tickLabels = {
    0: 'Figs',
    1: 'Lemon',
    2: 'Pear',
    3: 'Apple',
  }
</script>
