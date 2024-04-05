<template>
  <v-row class="mb-6 my-5" no-gutters style="height: 95%;">
      <v-col cols="12" md="9" sm="12">
          <v-sheet class="pa-2 ma-2 fill-height bg-deep-orange-lighten-5">
              <div class="wrap-content" :style="stylesForContent">
                  <div class="content" v-html="content"></div>
              </div>
              <component :is="'style'">
                  {{ stylesForContent }}
              </component>
              <div
                v-show="false"
                style="word-break: break-word;"
              >
                {{ content }}
              </div>
          </v-sheet>
      </v-col>

      <v-col cols="12" md="3" sm="12" class="order-first order-lg-last order-md-last">
          <v-sheet class="pa-2 ma-2 bg-deep-orange-lighten-5">
              <CurrentMode :currentMode="currentMode" @updateCurrentMode="updateCurrentMode" />
              <ModeForSelection :modeForSelection="modeForSelection" @updateModeForSelection="updateModeForSelection" />
              <div style="text-align: center;">
                <v-btn class="mb-5" @click="downloadConspectus">Download</v-btn>
              </div>
          </v-sheet>
      </v-col>
  </v-row>
</template>

<script setup lang="ts">
import debounce from "lodash/debounce";
import { ref, computed } from "vue";
import { selectDivs } from "@/tests/selection/selection";
import { checkExistenceSpanElement } from "@/tests/selection/utils";
import { useSelectMode } from "@/composibles/useSelectMode";
import template from '/public/template.html?raw'

const props = defineProps(["HTMLContent"]);

const content = ref<string>(props.HTMLContent);
// const currentMode = ref<string>("all");
// const { mode: currentMode } = useSelectMode("all");
const listOfModes = ref<string[]>(["main", "interesting", "off-topic", "all"]); // должны быть уникальные значения
const listOfModesObj = ref<{}>({ 0: "main", 1: "interesting", 2: "off-topic", 3: "all" }); // должны быть уникальные значения
const currentMode = ref(listOfModes.value[listOfModes.value.length - 1]);
const selectedHTML = ref<string>("");
// const modeForSelection = ref<string>("main");
// const { mode: modeForSelection } = useSelectMode("main");
const modeForSelection = ref(listOfModes.value[0]);

const updateCurrentMode = (value: string) => {
  currentMode.value = value
}

const updateModeForSelection = (value: string) => {
  console.log('updateModeForSelection emit', value)
  modeForSelection.value = value
}

// document.querySelector(".wrap-content")?.addEventListener(
document.addEventListener(
  "selectionchange",
  debounce(() => {
    selectionChangeHandler();
  }, 500)
);

const selectionChangeHandler = () => {
  console.log("document.onselectionchange");

  let selection = document.getSelection();

  if (!selection) {
    return;
  }
  const range = selection.getRangeAt(0);
  let { startContainer, startOffset, endContainer, endOffset } = range;
  console.log("startContainer typeof");
  console.log(startContainer instanceof window.Text);
  console.log("endContainer typeof");
  console.log(endContainer instanceof window.Text);

  const el = document.querySelector(".content");
  if (!el) {
    throw new Error("Element .content not found");
  }
  if (!(el instanceof HTMLDivElement)) {
    throw new Error("Element .content not found");
  }
  const startSpan = startContainer.parentElement;
  checkExistenceSpanElement(startSpan);
  const endSpan = endContainer.parentElement;
  checkExistenceSpanElement(endSpan);
  try {
    selectDivs(
      el,
      startSpan as HTMLSpanElement,
      startOffset,
      endSpan as HTMLSpanElement,
      endOffset,
      modeForSelection.value
    );
  } catch (e) {
    console.log(e);
  }
  // }

  if (el) {
    content.value = el.innerHTML;
  }
};

const stylesForContent = computed(() => {
  const index = listOfModes.value.indexOf(currentMode.value);
  if (index === -1) {
    return "";
  } else {
    return listOfModes.value
      .slice(index + 1)
      .map((mode) => `.${mode} {display: none;} `)
      .join("\n");
  }
});

const downloadConspectus = () => {
  const text = '<div class="content"><div><span class="all">one two</span></div>\n' +
    '<div><span class="all">three</span></div></div>'
  const file = template.replace(text, content.value)

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(file));
  element.setAttribute('download', 'conspectus');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
</script>

<style>
.main {
  background-color: palevioletred;
}
.interesting {
  background-color: aquamarine;
}
</style>
