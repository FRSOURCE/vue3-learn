<template>
  <div class="editor">
    <div class="editor--row">
      &lt;template&gt;
      <VAceEditor v-model:value="templateContent" lang="html"
        theme="tomorrow_night"
        style="height: 150px"
        @init="templateRef = $event"
      />
      &lt;/template&gt;
    </div>
    &lt;script&gt;
    <VAceEditor v-model:value="script" lang="javascript"
      theme="tomorrow_night"
      style="height: 150px"/>
    &lt;/script&gt;
    &lt;style&gt;
    <VAceEditor v-model:value="style" lang="css"
      theme="tomorrow_night"
      style="height: 150px"/>
    &lt;/style&gt;

    <iframe :srcdoc="debouncedHtml" />

    <p v-for="(errorLine, i) in consoleOutput" :key="i" :style="{color: errorLine.error ? 'red': undefined }">{{ errorLine.text }}</p>

    <button @click="setTemplateState">Save work</button>
  </div>
</template>



<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';
import { sfcHtmlGenerator } from '../methods/htmlGenerator';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import store from '@/store';
import { debouncedWatch } from '@vueuse/shared';

type EditorMessage = {
  type: string;
}

type EditorConsole = EditorMessage & {
  type: 'editor-console-log';
  msg: unknown[];
}

type EditorError = EditorMessage & {
  type: 'editor-warn' | 'editor-error';
  msg: string;
}

export default defineComponent({
  name: 'VueKit',
  components: {
    VAceEditor,
  },
  setup(){
    const consoleOutput = ref<{ text: string; error?: boolean }[]>([]);
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
    const html = computed(() =>
      sfcHtmlGenerator(`<template>${templateContent.value}</template><script>` + script.value  + `<\\/script><style>` + style.value + `</style>`)
    );
    const debouncedHtml = ref('');
    debouncedWatch(
      html,
      () => {
        consoleOutput.value = [];
        debouncedHtml.value = html.value;
      },
      { debounce: 1000 }
    );
    
    const isEditorMessage = (data: unknown): data is EditorMessage => {
      if (data && typeof data === 'object' && 'type' in data) {
        const newData = data as { type: unknown };
        return typeof newData.type === 'string'
      }
      return false;
    }
    const isEditorError = (data: EditorMessage): data is EditorError => 
      ['editor-warn', 'editor-error'].includes(data.type);
    const isEditorConsole = (data: EditorMessage): data is EditorConsole => 
      ['editor-console-log'].includes(data.type);
    const errorHandler = (e: MessageEvent<unknown>) => {
      if (!isEditorMessage(e.data)) return;
      if (isEditorError(e.data)) consoleOutput.value.push({ text: e.data.msg, error: true });
      else if (isEditorConsole(e.data)) {
        consoleOutput.value.push({
          text: e.data.msg
            .map(msg => {
              if (typeof msg === 'string') return msg;
              if (typeof msg === 'object') return JSON.stringify(msg);
              if (typeof msg === 'boolean' || typeof msg === 'number') return msg.toString();
            })
            .join(' ')
        });
      }
    };
    onMounted(() => window.addEventListener('message', errorHandler));
    onUnmounted(() => window.removeEventListener('message', errorHandler));

    return{ console, templateContent, consoleOutput, script, debouncedHtml, style, setTemplateState }
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

 

 
