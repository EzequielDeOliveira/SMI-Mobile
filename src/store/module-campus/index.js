import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
  campus: {
    acronym: 'Todos os campi',
    id: null
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
