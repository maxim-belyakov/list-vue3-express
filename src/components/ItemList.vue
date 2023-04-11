<template>
  <transition-group name="item" tag="div">
    <div v-for="item in items" :key="item.id">
      <Item
          :item="item"
          @item-selected="selectItem"
          @item-removed="removeItem"
      />
    </div>
  </transition-group>
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
.item-enter-active, .item-leave-active {
  transition: all 0.5s ease;
}
.item-enter-from, .item-leave-to {
  height: 0;
  opacity: 0;
}
.item-enter-to, .item-leave-from {
  height: auto;
  opacity: 1;
}
</style>
