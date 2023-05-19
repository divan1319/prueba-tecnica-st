<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ModalDetalle from './ModalDetalle.vue'
import { Modal,Badge } from 'ant-design-vue'
export default {
  props: {
    paises: {
      type: Array
    }
  },
  data() {
    return {
      visible: false,

      country: []
    }
  },
  components: {  Modal,
  },
  computed: {
    ...mapState(['pais']),
    ...mapGetters(['PaisSearch'])
  },
  methods: {
    ...mapActions(['getPais']),
    openModal(cod_cca2) {
      this.getPais(cod_cca2)
      this.country = this.PaisSearch
      this.visible = true
    },
    datosPais() {
      this.country = this.pais
    },
    closeModal() {
      this.visible = false
    }
  },
  watch: {
    country(newCountry, oldCountry) {
      if (newCountry != null) {
        this.datosPais()
      }
    }
  }
}
</script>
<template>
  <div class="container mx-auto">
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="py-3 px-6 bg-gray-500 text-white font-semibold uppercase tracking-wider">
              Bandera
            </th>
            <th class="py-3 px-6 bg-gray-500 text-white font-semibold uppercase tracking-wider">
              Nombre
            </th>
            <th class="py-3 px-6 bg-gray-500 text-white font-semibold uppercase tracking-wider">
              Código CCA2
            </th>
            <th
              class="py-3 px-6 bg-gray-500 text-white font-semibold uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pais in paises" :key="pais.cca2">
            <td class="text-center py-4 px-6 border-b">{{ pais.flag }}</td>
            <td class="text-center py-4 px-6 border-b">{{ pais.name.common }}</td>
            <td class="text-center py-4 px-6 border-b">{{ pais.cca2 }}</td>
            <td class="text-center py-4 px-6 border-b underline">
              <button @click="openModal(pais.cca2)">Ver más</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Modal v-model:open="visible" @ok="closeModal">
    <div v-for="pais in country" :key="pais.cca2">
      <h2 class="text-4xl font-bold">
        País:<span class="text-cyan-600 m-2">{{ pais.name.common }}</span
        >{{ pais.flag }}
      </h2>
      <div class="grid grid-cols-4 gap-2">
        <div class="col-span-4 md:col-span-2 mt-5">
          <p class="text-2xl font-light">
            Capital: <span class="text-lg font-bold text-gray-800">{{ pais.capital[0] }}</span>
          </p>
        </div>
        <div class="col-span-4 md:col-span-2 mt-5">
          <p class="text-2xl font-light">
            Población:
            <span class="text-lg font-bold text-gray-800">{{
              pais.population.toLocaleString()
            }}</span>
          </p>
        </div>
      </div>
      <div class="grid grid-cols-10 gap-2">
        <div class="col-span-10 md:col-span-3 mt-5">
          <p class="text-2xl font-light">
            Dominio: <span class="text-lg font-bold text-gray-800">{{ pais.tld[0] }}</span>
          </p>
        </div>
        <div class="col-span-10 md:col-span-6 md:ml-10 mt-5">
          <p class="text-2xl font-light">
            Zona Horaria:
            <span class="text-lg font-bold text-gray-800">{{ pais.timezones[0] }}</span>
          </p>
        </div>
      </div>
      <div class="w-full">
        <div class="mt-5 mx-auto">
          <p class="text-2xl font-light">
            Nombre Oficial:
            <span class="text-lg font-bold text-gray-800">{{ pais.name.official }}</span>
          </p>
        </div>
      </div>
    </div>
  </Modal>
</template>
