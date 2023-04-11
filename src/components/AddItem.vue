<template>
  <div class="add-item">
    <input
        v-model="inputText"
        placeholder="Add item..."
        class="input-group-field"
    />
    <button @click="addItem" class="button primary">Add</button>
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

<style scoped>
.add-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.input-group-field {
  font-size: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  flex: 1;
  align-self: flex-start;
  max-width: 400px;
}
.button {
  font-size: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.primary {
  background-color: #007bff;
  color: #fff;
}
</style>