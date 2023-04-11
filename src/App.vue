<template>
  <div id="app">
    <h1>Item List</h1>
    <AddItem @item-added="addItem" />
    <ItemList :items="items" @item-selected="selectItem" @item-removed="removeItem" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import ItemList from './components/ItemList.vue';
import AddItem from './components/AddItem.vue';

interface Item {
  id: number;
  text: string;
  selected?: boolean;
}

export default defineComponent({
  name: 'App',
  components: {
    ItemList,
    AddItem,
  },
  setup() {
    const items = ref<Item[]>([]);

    async function fetchItems() {
      try {
        const response = await axios.get<Item[]>('http://localhost:3001/items');
        items.value = response.data as Item[];
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    function addItem(item: { text: string }) {
      // Add your logic for adding a new item
      const newItem: Item = {
        id: Date.now(), // or another unique ID generator
        text: item.text,
      };
      items.value.push(newItem);
    }

    function selectItem(selectedItem: Item) {
      items.value = items.value.map(item => ({
        ...item,
        selected: item.id === selectedItem.id,
      }));
    }

    async function removeItem(removedItem: Item) {
      try {
        await axios.delete(`http://localhost:3001/items/${removedItem.id}`);
        items.value = items.value.filter(item => item.id !== removedItem.id);
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }

    onMounted(fetchItems);

    return {
      items,
      addItem,
      removeItem,
      selectItem,
    };
  },
});
</script>