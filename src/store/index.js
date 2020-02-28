import Vue from 'vue'
import Vuex from 'vuex'

import storedData from './module-notification'
import campusData from './module-campus'
Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      storedData,
      campusData
    }
  })

  return Store
}
