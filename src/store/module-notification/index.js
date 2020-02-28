import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
  token: '',
  notifyEnabled: true,
  pushBlocked: false
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
