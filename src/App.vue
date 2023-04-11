<template>
  <div id="app">
    <h1>Item List</h1>
    <AddItem @item-added="addItem" />
    <ItemList :items="items" @item-selected="selectItem" @item-removed="removeItem" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ItemList from './components/ItemList.vue';
import AddItem from './components/AddItem.vue';

export default {
  name: 'App',
  components: {
    ItemList,
    AddItem,
  },
  setup() {
    const items = ref([]);

    async function fetchItems() {
      try {
        const response = await axios.get('http://localhost:3001/items');
        items.value = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    onMounted(fetchItems);

    async function addItem(item) {
      try {
        const response = await axios.post('http://localhost:3001/items', item);
        items.value.push(response.data);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }

    function selectItem(selectedItem) {
      items.value = items.value.map(item => {
        return {
          ...item,
          selected: item.id === selectedItem.id,
        };
      });
    }

    async function removeItem(removedItem) {
      try {
        await axios.delete(`http://localhost:3001/items/${removedItem.id}`);
        items.value = items.value.filter(item => item.id !== removedItem.id);
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }

    return {
      items,
      addItem,
      selectItem,
      removeItem,
    };
  },
};
</script>