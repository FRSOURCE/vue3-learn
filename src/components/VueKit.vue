<template>
  <VAceEditor v-model:value="templateContent" lang="html"
    theme="tomorrow_night"
    style="height: 150px"/>
  <VAceEditor v-model:value="script" lang="html"
    theme="tomorrow_night"
    style="height: 150px"/>
  <VAceEditor v-model:value="style" lang="html"
    theme="tomorrow_night"
    style="height: 150px"/>

  <iframe :srcdoc="html" />

  <button @click="setTemplateState">Save work</button>
</template>



<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';
import { sfcHtmlGenerator } from '../methods/htmlGenerator';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import store from '@/store';


export default defineComponent({
  name: 'VueKit',
  components: {
    VAceEditor,
  },
  setup(){
    const setTemplateState = () => {
      store.commit('setTemplateState', templateContent.value)
      store.commit('setScriptState', script.value)
      store.commit('setStyleState', style.value)
      };
    // const templateContent = ref(`<template><div @click="add" class="cos">{{ content }}</div></template>`);
    // const script = ref(`<script>
    // import { ref } from 'vue';
    // export default {
    //   setup() {
    //     let content = ref(0);
    //     const add = () => content.value = content.value + 1;
    //     return { content, add };
    //   }
    // }
    // <\\/script>`);
    const templateContent = ref(store.state.editor.templateContent);
    const script = ref(store.state.editor.script);
    const style = ref(store.state.editor.style);
    // const style = ref(`<style>
    // .cos { color: red; }
    // </style>`)
    const html = computed(() => sfcHtmlGenerator(`${templateContent.value}${script.value}${style.value}
    `));
    return{ templateContent, script, html, style, setTemplateState}
  }
});
</script>

<style>
  /* required class */
  .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;
 
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
 
  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style> 

 

 
