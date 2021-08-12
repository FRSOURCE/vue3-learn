export const editorState = {
  templateContent: ``,
  script: `
   import { ref } from 'vue';
   export default {
     setup() {
       
       return {  };
     }
   }`,
  style: ``,
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