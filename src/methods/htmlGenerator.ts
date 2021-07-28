
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

    window.onerror = function (message, url, line, call, error) {
      console.log(message, url, line, call, error);
      return true;
    }

    window.addEventListener('error', function(e){
      console.log(e);
    }) 

    const app = Vue
      .createApp(Vue.defineAsyncComponent(() => {
        try{
          return window['vue3-sfc-loader'].loadModule('file.vue', options)
        } catch(e) {
          console.log(e);
        }
      }));
      app.config.errorHandler = (e, vm, info) => {
        console.log(e, vm, info);
      } 
      app.config.warnHandler = (e, vm, info) => {
        console.log(e, vm, info);
      } 
      app.mount('#app');

  </script>
</body>
</html>
`;
