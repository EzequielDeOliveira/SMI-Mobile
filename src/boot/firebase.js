import * as firebase from 'firebase/app'
import 'firebase/messaging'

export default ({ Vue }) => {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID
  }

  firebase.initializeApp(config)

  Vue.prototype.$firebase = firebase
}
