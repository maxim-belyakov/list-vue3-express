<template>
  <div>
    <span>{{ item.text }}</span>
    <button @click="selectItem">Select</button>
    <button @click="removeItem">Remove</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Item {
  id: number;
  text: string;
}

export default defineComponent({
  name: 'Item',
  props: {
    item: Object as () => Item,
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