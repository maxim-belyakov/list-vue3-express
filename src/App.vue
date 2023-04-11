<template>
  <div id="app">
    <h1>Item List</h1>
    <AddItem @item-added="addItem" />
    <ItemList :items="items" @item-selected="selectItem" @item-removed="removeItem" />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue';
import ItemList from './components/ItemList.vue';
import AddItem from './components/AddItem.vue';
import { Item } from "./resources/interfaces";
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    ItemList,
    AddItem,
  },
  setup() {
    const store = useStore();

    function addItem(item: { text: string }) {
      const newItem: Item = {
        id: Date.now(),
        text: item.text,
      };
      store.commit('addItem', newItem);
    }

    function selectItem(selectedItem: Item) {
      store.dispatch('selectItem', selectedItem);
    }

    function removeItem(removedItem: Item) {
      store.dispatch('removeItem', removedItem.id);
    }

    onMounted(() => {
      store.dispatch('fetchItems');
    });

    return {
      items: computed(() => store.state.items),
      addItem,
      selectItem,
      removeItem,
    };
  },
});
</script>