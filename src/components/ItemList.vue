<template>
  <div>
    <Item v-for="item in items" :key="item.id" :item="item" @item-selected="selectItem" @item-removed="removeItem" />
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  name: 'ItemList',
  components: {
    Item,
  },
  props: {
    items: Array,
  },
  methods: {
    selectItem(item) {
      this.$emit('item-selected', item);
    },
    removeItem(item) {
      this.$emit('item-removed', item);
    },
  },
};
</script>