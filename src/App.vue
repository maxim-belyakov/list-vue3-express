<template>
  <div id="app">
    <h1>Item List</h1>
    <AddItem @item-added="addItem" />
    <ItemList :items="items" @item-selected="selectItem" @item-removed="removeItem" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import ItemList from './components/ItemList.vue';
import AddItem from './components/AddItem.vue';
import { ItemType } from "./resources/interfaces";
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
      const newItem: ItemType = {
        id: Date.now(),
        text: item.text,
      };
      store.dispatch('addItem', newItem);
    }

    function selectItem(selectedItem: ItemType) {
      store.dispatch('selectItem', selectedItem);
    }

    async function removeItem(removedItem: ItemType) {
      store.dispatch('removeItem', removedItem.id);
    }

    onMounted(() => {
      store.dispatch('fetchItems');
    });

    async function updateItem(updatedItem: ItemType) {
      try {
        await fetch(`http://localhost:3001/items/${updatedItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        });
        store.dispatch('updateItem', updatedItem);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }

    return {
      items: computed(() => store.state.items),
      addItem,
      selectItem,
      removeItem,
      updateItem,
    };
  },
});
</script>