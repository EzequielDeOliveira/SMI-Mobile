<template>
  <div>
    <page-header :type="tab" />
    <q-tab-panels v-model="tab" class="main-panel">
      <q-tab-panel name="occurences" class="q-pl-none">
        <occurences class="q-mb-xl" />
      </q-tab-panel>

      <q-tab-panel name="meters">
        <transducer-list />
      </q-tab-panel>

      <q-tab-panel name="settings">
        <setting />
      </q-tab-panel>
    </q-tab-panels>

    <q-footer class="q-pa-xs toolbar">
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="white"
        class="text-teal row"
      >
        <q-tab
          clickable
          name="occurences"
          icon="img:statics/ic_ocorrencia_critica_mono.svg"
          class="text col"
          :class="{'inactive' : tab != 'occurences'}"
          href="/"
          exact
        >Ocorrências</q-tab>
        <q-tab
          clickable
          name="meters"
          icon="img:statics/ic_medidores.svg"
          class="text col"
          :class="{'inactive' : tab != 'meters'}"
          href="/medidores"
          exact
        >Medidores</q-tab>
        <q-tab
          clickable
          name="settings"
          icon="settings"
          class="text col"
          href="/configuracoes"
          exact
        >Configurações</q-tab>
      </q-tabs>
    </q-footer>
  </div>
</template>

<script>
import pageHeader from '../components/pageHeader.vue'
import occurences from '../components/occurences.vue'
import transducerList from '../components/transducerList.vue'
import setting from '../components/setting.vue'
import { mapActions } from 'vuex'

export default {
  name: 'PageIndex',

  components: {
    pageHeader: pageHeader,
    occurences: occurences,
    transducerList: transducerList,
    setting: setting
  },

  data () {
    return {
      tab: 'occurences'
    }
  },

  methods: {
    ...mapActions('storedData', ['togglePermission', 'saveToken'])
  },

  mounted () {
    if (this.$firebase.messaging.isSupported()) {
      const messaging = this.$firebase.messaging()

      messaging.usePublicVapidKey(process.env.VAPID_KEY)

      messaging
        .requestPermission()
        .then(() => {
          console.log('Notification permission granted.')
          messaging.getToken().then(token => {
            console.log('New token created: ', token)
            this.saveToken(token)
            this.togglePermission(true)
          })
        })
        .catch(err => {
          console.log('Unable to get permission to notify.', err)
          this.togglePermission(false)
        })

      messaging.onTokenRefresh(() => {
        messaging
          .getToken()
          .then(function (newToken) {
            console.log('Token refreshed: ', newToken)
            this.saveToken(newToken)
            this.togglePermission(true)
          })
          .catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err)
            this.togglePermission(false)
          })
      })
    } else {
      this.saveToken(this.$route.query.token)
      console.log('token was saved from query')
    }
  }
}
</script>

<style lang = "scss">
.toolbar {
  display: flex;
  background: #00417e;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.text {
  width: 30%;
  font-size: 90%;
  color: rgba(255, 255, 255, 0.54);
}

.inactive {
  opacity: 50%;
}

.main-panel {
  margin-top: 8%;
  background-color: #fafafa;
}
</style>
