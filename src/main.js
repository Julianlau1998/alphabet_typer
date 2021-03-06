import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
 
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.config.productionTip = false

require('@/assets/styles/main.scss')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
