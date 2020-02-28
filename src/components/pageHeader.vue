<template>
  <q-header class="shadow-3 q-mb-xl" >
    <q-toolbar v-if="type == 'occurences'" class="title">
      <q-toolbar-title class="text-h6">Ocorrências em andamento</q-toolbar-title>
      <q-btn to="/lastHours" exact class="float-right" flat icon="history" />
    </q-toolbar>

    <q-toolbar v-if="type == 'meters'" class="title">
      <q-toolbar-title class="text-h6">
        <q-btn-dropdown class="drop" flat no-caps :label="options[selected].acronym">
          <q-list v-for="item in options" :key="item.id">
            <q-item clickable v-close-popup @click="onItemClick(item.id)" >
              <q-item-section>
                <q-item-label>{{item.acronym}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar-title>
    </q-toolbar>

    <q-toolbar v-if="type == 'settings'" class="title">
      <q-toolbar-title class="text-h6">Configurações</q-toolbar-title>
    </q-toolbar>

    <q-toolbar v-if="backButton" class="title" :class="{'is-blue' : backButton}">
      <q-icon v-go-back=" '/' " size="sm" name="arrow_back" class="q-mr-md"/>
      <q-toolbar-title class="text-h6">{{title}}</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
<script>
import MASTER from '../services/masterApi/http-common'
import { mapActions } from 'vuex'

export default {
  name: 'pageHeader',
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    backButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selected: 0,
      options: [{
        acronym: 'Todos os campi',
        id: null
      }]
    }
  },
  created () {
    MASTER.get('campi/')
      .then((res) => {
        res.data.forEach(i => {
          this.options.push(i)
        })
      })
  },
  methods: {
    ...mapActions('campusData', ['changeCampus']),
    onItemClick (id) {
      this.selected = this.options.findIndex(x => x.id === id)
      this.changeCampus(this.options[this.selected])
    }
  }
}
</script>

<style lang="scss">
.title {
  background: white;
  color: #000000;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.25px;
}
.drop {
  font-size: 90%;
}
.is-blue {
  background-color: $primary !important;
  width: 216px;
  height: 24px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.25px;
  color: #ffffff;
}
</style>
