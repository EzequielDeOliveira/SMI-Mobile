<template>
      <q-list class="q-mt-md">
        <q-item tag="label" class="container" v-ripple>
          <q-item-section>
            <q-item-label class="text">Notificações</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="positive" :value="notifyEnabled" @input="toggle()" val="Serious occurrences"  size="md"/>
          </q-item-section>
        </q-item>
      <q-separator spaced inset class="bar" />
        <q-item tag="label" class="container" to="/about" v-ripple>
          <q-item-section >
            <q-item-label class="text">Sobre o app</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="keyboard_arrow_right" class="icon"/>
          </q-item-section>
        </q-item>
      </q-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Setting',
  components: {
  },
  props: {},
  data () {
    return {
    }
  },

  computed: {
    ...mapGetters('storedData', ['notifyEnabled', 'pushIsBlocked'])
  },

  methods: {
    ...mapActions('storedData', ['togglePermission']),
    toggle () {
      if (this.pushIsBlocked) {
        this.triggerNegative()
        this.triggerInfo()
      } else {
        this.togglePermission()
      }
    },
    triggerNegative () {
      this.$q.notify({
        type: 'negative',
        message: `Você bloqueou as notificações`,
        progress: true
      })
    },
    triggerInfo () {
      this.$q.notify({
        type: 'info',
        message: `Acesse as configurações do seu navegador para desbloquear as notificações.`,
        multiline: true,
        progress: true,
        color: '#ffffff'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ntitle {
  color: #777777;
}
.bar {
  height: 2px;
  margin: 0 0;
  width: 100%;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 0;
}
.text {
  width: 288px;
  height: 28px;
  font-family: Roboto;
  font-size: 16px;
  line-height: 1.75;
  letter-spacing: 0.5px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.icon {
  margin-right: 15%;
  opacity: 50%;
}
</style>
