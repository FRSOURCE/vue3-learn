export const editorState = {
  templateContent: `<template></template>`,
  script: `<script>
   import { ref } from 'vue';
   export default {
     setup() {
       
       return {  };
     }
   }
   <\\/script>`,
  style: `<style></style>`,
};

export type EditorState = typeof editorState;
  
 export const editor = {
    state: ():EditorState => editorState,
     mutations: {
        setTemplateState(state: EditorState, templateContent:string):void{
          state.templateContent = templateContent;
        },
        setScriptState(state: EditorState, script:string):void{
          state.script = script;
        },
        setStyleState(state: EditorState, style:string):void{
          state.style = style;
        } 
      }
  }