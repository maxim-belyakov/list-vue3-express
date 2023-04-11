<template>
  <div>
    <input v-model="inputText" placeholder="Add item..." />
    <button @click="addItem">Add</button>
  </div>
</template>

<script>
export default {
  name: 'AddItem',
  data() {
    return {
      inputText: '',
    };
  },
  methods: {
    addItem() {
      if (this.inputText.trim()) {
        this.$emit('item-added', { text: this.inputText.trim() });
        this.inputText = '';
      }
    },
  },
};
</script>