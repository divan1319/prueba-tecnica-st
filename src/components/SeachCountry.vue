<script>
import { AutoComplete,Alert } from 'ant-design-vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import Countries from './Countries.vue'
export default {
  data() {
    return {
      consulta: null,
      opciones: [],
      estado:false,
      errors:''
    }
  },
  components: {
    AutoComplete,
    Countries,
    Alert
  },
  computed: {
    ...mapState(['pais', 'busquedaPais','errores']),
    ...mapGetters(['PaisesFilter'])
  },
  methods: {
    ...mapActions(['getPaises']),

    respuestaPais() {
      this.$nextTick(() => {
        this.getPaises(this.consulta)
        this.estado=!this.estado
        this.opciones = this.busquedaPais
        this.errors = this.errores
      })
    }
  }
}
</script>
<template>
  <div class="flex flex-col md:flex-row w-full m-0">
    <input
      type="text"
      v-model="consulta"
      class="md:w-11/12 mb-2 w-full md:h-8 h-10 bg-slate-100 md:mx-5"
    />
    <button
      class="bg-blue-600 rounded-md md:w-1/12 w-full md:h-8 h-10 md:mx-5 mb-2 text-white"
      @click="respuestaPais"
    >
      Buscar
    </button>
  </div>
  <div v-if="estado == false">
  </div>
  <div v-else>
    <Countries :paises="opciones"/>
  </div>
  <div v-if="errors != '' ">
    <Alert :message="errors"  type="error" closable/>  
  </div>
  
  
</template>
