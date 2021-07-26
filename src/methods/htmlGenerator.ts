
export const sfcHtmlGenerator = (componentHTML: string) => `
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

    Vue
      .createApp(Vue.defineAsyncComponent(() => window['vue3-sfc-loader'].loadModule('file.vue', options)))
      .mount('#app');

  </script>
</body>
</html>
`;
