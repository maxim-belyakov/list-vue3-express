<template>
  <div>
    <div>{{ item.text }}</div>
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
    item: {
      type: Object as () => ItemType,
      required: true,
    },
  },
  setup(props, { emit }) {
    function selectItem() {
      emit('item-selected', props.item);
    }

    function removeItem() {
      emit('item-removed', props.item);
    }

    return {
      selectItem,
      removeItem,
    };
  },
});
</script>
