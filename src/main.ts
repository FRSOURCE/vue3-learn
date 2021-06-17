import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'element-plus/packages/theme-chalk/src/reset.scss'


createApp(App).use(store).use(router).mount('#app');