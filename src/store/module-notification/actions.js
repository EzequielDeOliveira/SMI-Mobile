const togglePermission = ({ commit }, order) => {
  commit('TOGGLEPERMISSION', order)
}

const saveToken = ({ commit }, token) => {
  commit('SAVETOKEN', token)
}

export {
  togglePermission,
  saveToken
}
