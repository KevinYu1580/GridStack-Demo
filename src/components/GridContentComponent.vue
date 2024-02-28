<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  itemId: {
    type: [String, Number],
    required: true
  }
})

const emits = defineEmits(['remove'])

const handleRemove = () => {
  console.log('handelRemove')
  emits('removed', props.itemId)
}
</script>

<template>
  <div class="my-custom-grid-item-content">
    <button @click="handleRemove">X</button>
    <p>Vue Grid Item Content {{ props.itemId }}</p>
  </div>
</template>
