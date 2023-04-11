<template>
  <div>
    <span>{{ item.text }}</span>
    <button @click="selectItem">Select</button>
    <button @click="removeItem">Remove</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ItemType } from "../resources/interfaces";

export default defineComponent({
  name: 'Item',
  props: {
    item: Object as () => ItemType,
  },
  setup(_, { emit }) {
    function selectItem() {
      emit('item-selected', this.item);
    }

    function removeItem() {
      emit('item-removed', this.item);
    }

    return {
      selectItem,
      removeItem,
    };
  },
});
</script>