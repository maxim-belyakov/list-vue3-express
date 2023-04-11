<template>
  <div class="item" :class="{ selected: item.selected }">
    <div class="item-text">{{ item.text }}</div>
    <div class="item-buttons">
      <button @click="selectItem" class="button primary">
        <span>Select</span>
      </button>
      <button @click="removeItem" class="button danger">
        <span>Remove</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ItemType } from "../resources/interfaces";
import { useStore } from "vuex";

export default defineComponent({
  name: 'Item',
  props: {
    item: {
      type: Object as () => ItemType,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    function selectItem() {
      const updatedItem: ItemType = { ...props.item, selected: !props.item.selected };
      store.dispatch('updateItem', updatedItem);
    }

    function removeItem() {
      store.dispatch('removeItem', props.item.id);
    }

    return {
      selectItem,
      removeItem,
    };
  },
});
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;
}
.item:hover {
  background-color: #f5f5f5;
}
.item.selected {
  background-color: #2c8f6f;
  color: white;
}
.item-text {
  flex: 1;
  font-size: 20px;
  font-weight: bold;
}
.item-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0;
}
.primary {
  background-color: #007bff;
  color: #fff;
}
.danger {
  background-color: #dc3545;
  color: #fff;
}
</style>
