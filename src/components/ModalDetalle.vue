<script>
import { Modal } from 'ant-design-vue'
export default {
  components: {
    Modal
  },
  props: {
    dato: {
      type: String
    },
    visible:{
        type: Boolean
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    handleVisibleChange(visible) {
      if (!visible) {
        this.$emit('closeModal');
      }
    }
  }
}
</script>
<template>
  <Modal :v-model.open="visible" @cancel="closeModal" @visible-change="handleVisibleChange">
    <p>{{ dato }}</p>
  </Modal>
</template>
