<template>
  <div>
    <Item v-for="item in items" :key="item.id" :item="item" @item-selected="selectItem" @item-removed="removeItem" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Item from './Item.vue';
import {ItemType} from "../resources/interfaces";

export default defineComponent({
  name: 'ItemList',
  components: {
    Item,
  },
  props: {
    items: Array as () => ItemType[],
  },
  setup(_, { emit }) {
    function selectItem(item: ItemType) {
      emit('item-selected', item);
    }

    function removeItem(item: ItemType) {
      emit('item-removed', item);
    }

    return {
      selectItem,
      removeItem,
    };
  },
});
</script>