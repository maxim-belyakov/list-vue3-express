<template>
  <div>
    <span>{{ item.text }}</span>
    <button @click="selectItem">Select</button>
    <button @click="removeItem">Remove</button>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: Object,
  },
  methods: {
    selectItem() {
      this.$emit('item-selected', this.item);
    },
    removeItem() {
      this.$emit('item-removed', this.item);
    },
  },
};
</script>