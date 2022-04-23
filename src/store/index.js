import Vue from 'vue'
import Vuex from 'vuex'
import recordModule from './recordModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    iOS: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recordModule
  }
})
