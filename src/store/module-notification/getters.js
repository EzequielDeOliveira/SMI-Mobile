const notifyEnabled = (state) => {
  return state.notifyEnabled
}

const getToken = (state) => {
  return state.token
}

const pushIsBlocked = (state) => {
  return state.pushBlocked
}

export {
  notifyEnabled,
  getToken,
  pushIsBlocked
}
