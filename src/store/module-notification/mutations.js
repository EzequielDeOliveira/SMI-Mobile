import FIREBASEAPI from '../../services/firebaseAPI/http-common'
let TOPICNAME = 'ALL'

const TOGGLEPERMISSION = async (state, order) => {
  console.log(order, 'order2')
  if (order === false) {
    state.notifyEnabled = order
    state.pushBlocked = !order
  } else if (order) {
    state.notifyEnabled = order
    state.pushBlocked = !order
  } else {
    state.notifyEnabled = !state.notifyEnabled
  }

  if (state.token) {
    if (state.notifyEnabled) {
      // subscride to topic
      await FIREBASEAPI.post(state.token + '/rel/topics/' + TOPICNAME)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      // unsubscride to topic
      await FIREBASEAPI.delete(state.token + '/rel/topics/' + TOPICNAME)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

const SAVETOKEN = async (state, token) => {
  state.token = token

  if (state.notifyEnabled) {
    // subscride to topic
    await FIREBASEAPI.post(state.token + '/rel/topics/' + TOPICNAME)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export {
  TOGGLEPERMISSION,
  SAVETOKEN
}
