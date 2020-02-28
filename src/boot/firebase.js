import * as firebase from 'firebase/app'
import 'firebase/messaging'

export default ({ Vue }) => {
  var config = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  }

  firebase.initializeApp(config)

  Vue.prototype.$firebase = firebase
}