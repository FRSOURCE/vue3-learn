
export const sfcHtmlGenerator = (componentHTML: string):string => `
<!DOCTYPE html>
<html>
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/vue@next"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader@0.8.4/dist/vue3-sfc-loader.js"></script>
  <script>
    const options = {
      moduleCache: {
        vue: Vue,
      },

      getFile(url) {
        return \`${componentHTML}\`;
      },

      addStyle(textContent) {
        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
      },
    }

    const app = Vue
      .createApp(Vue.defineAsyncComponent(() => 
        window['vue3-sfc-loader'].loadModule('file.vue', options)
      ));

      app.config.productionTip = false;
      app.config.devTools = true;

      app.config.errorHandler = (e, vm, info) =>
        window.parent.postMessage({
          type: 'editor-error',
          msg: e
        });

      app.config.warnHandler = (e, vm, info) =>
        window.parent.postMessage({
          type: 'editor-warn',
          msg: e
        });
      
        const originalConsole = console.log.bind(console);
        console.log = (...args) => {
          window.parent.postMessage({
            type: 'editor-console-log',
            msg: args
          });
        }
      app.mount('#app');
  </script>
</body>
</html>
`;
