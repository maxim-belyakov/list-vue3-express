<template>
  <div>
    <input v-model="inputText" placeholder="Add item..." />
    <button @click="addItem">Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddItem',
  setup(_, { emit }) {
    const inputText = ref('');

    function addItem() {
      if (inputText.value.trim()) {
        emit('item-added', { text: inputText.value.trim() });
        inputText.value = '';
      }
    }

    return {
      inputText,
      addItem,
    };
  },
});
</script>