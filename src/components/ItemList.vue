<template>
  <div>
    <Item v-for="item in items" :key="item.id" :item="item" @item-selected="selectItem" @item-removed="removeItem" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Item from './Item.vue';

interface Item {
  id: number;
  text: string;
}

export default defineComponent({
  name: 'ItemList',
  components: {
    Item,
  },
  props: {
    items: Array as () => Item[],
  },
  setup(_, { emit }) {
    function selectItem(item: Item) {
      emit('item-selected', item);
    }

    function removeItem(item: Item) {
      emit('item-removed', item);
    }

    return {
      selectItem,
      removeItem,
    };
  },
});
</script>