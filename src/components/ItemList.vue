<template>
  <div>
    <Item
        v-for="item in items"
        :key="item.id"
        :item="item"
        :class="{ selected: item.selected }"
        @item-selected="selectItem"
        @item-removed="removeItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Item from './Item.vue';
import { ItemType } from "../resources/interfaces";
import { useStore } from "vuex";

export default defineComponent({
  name: 'ItemList',
  components: {
    Item
  },
  props: {
    items: {
      type: Array as () => ItemType[],
      default: () => []
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    function selectItem(selectedItem: ItemType) {
      const updatedItem: ItemType = { ...selectedItem, selected: !selectedItem.selected };
      emit('item-updated', updatedItem);
    }

    function removeItem(removedItem: ItemType) {
      emit('item-removed', removedItem);
    }

    return {
      selectItem,
      removeItem,
    };
  },
});
</script>

<style scoped>
  .selected {
    background-color: #2c8f6f;
  }
</style>