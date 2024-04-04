<template>
  <div v-if="!HTMLContent" class="input-text">
    <v-textarea v-model="customText" label="Label" rows="30"></v-textarea>
    <v-btn @click="addText"> Add text </v-btn>
  </div>
  <v-container
    class="fill-height"
    v-if="HTMLContent"
    style="align-items: flex-start; margin-bottom: 20px; margin-top: -20px;">
    <Editor :HTMLContent="HTMLContent" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {parseText} from "@/utils/parseText";

const customText = ref("");
let HTMLContent = ref("");
// let HTMLContent = ref('<div class="content"><div><span class="all">one two</span></div>\n<div><span class="all">three</span></div></div>');

const addText = () => {
  HTMLContent.value = parseText(customText.value)
};
</script>
