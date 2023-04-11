<template>
  <div id="app">
    <div class="container">
      <h1>Item List</h1>
      <AddItem @item-added="addItem" />
      <ItemList :items="items" @item-updated="updateItem" @item-removed="removeItem" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import AddItem from './components/AddItem.vue';
import Item from './components/Item.vue';
import ItemList from './components/ItemList.vue';
import { ItemType } from "./resources/interfaces";
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    ItemList,
    AddItem,
    Item,
  },
  setup() {
    const store = useStore();

    function addItem(item: { text: string }) {
      const newItem: ItemType = {
        id: Date.now(),
        text: item.text,
        selected: false,
      };
      store.dispatch('addItem', newItem);
    }

    function updateItem(updatedItem: ItemType) {
      store.dispatch('updateItem', updatedItem);
    }

    function removeItem(removedItem: ItemType) {
      store.dispatch('removeItem', removedItem.id);
    }

    onMounted(async () => {
      await store.dispatch('fetchItems');
    });

    return {
      items: computed(() => store.state.items),
      addItem,
      updateItem,
      removeItem,
    };
  },
});
</script>

<style scoped>
  .container {
    max-width: 960px; /* Set the max-width of the container as desired */
    margin: 0 auto; /* Center the container horizontally */
    padding: 20px; /* Add some padding around the container */
  }
</style>
