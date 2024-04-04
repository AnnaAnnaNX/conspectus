<template>
  <v-app>
    <AppBar />
    <v-main>
      <InputText />
    </v-main>

    <AppFooter v-if="false" />
  </v-app>
</template>

<script setup>
import InputText from "@/components/InputText.vue";
import AppBar from "@/components/AppBar.vue";
</script>
