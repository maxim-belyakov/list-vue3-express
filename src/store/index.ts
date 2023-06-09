import { createStore } from 'vuex';
import { ItemType } from '../resources/interfaces';
import api from '../api';

interface State {
    items: ItemType[];
    selectedItems: ItemType[];
}

const state: State = {
    items: [],
    selectedItems: [],
};

const mutations = {
    setItems(state: State, items: ItemType[]) {
        state.items = items;
    },
    addItem(state: State, item: ItemType) {
        state.items.push(item);
    },
    updateItem(state: State, item: ItemType) {
        const index = state.items.findIndex((i) => i.id === item.id);
        if (index !== -1) {
            state.items.splice(index, 1, item);
        }
    },
    removeItem(state: State, itemId: number) {
        const index = state.items.findIndex((i) => i.id === itemId);
        if (index !== -1) {
            state.items.splice(index, 1);
        }
    },
    selectItem(state: State, item: ItemType) {
        const index = state.selectedItems.findIndex((i) => i.id === item.id);
        if (index === -1) {
            state.selectedItems.push(item);
        } else {
            state.selectedItems.splice(index, 1);
        }
    },
    removeSelectedItem(state: State, itemId: number) {
        const index = state.selectedItems.findIndex((i) => i.id === itemId);
        if (index !== -1) {
            state.selectedItems.splice(index, 1);
        }
    },
};

const actions = {
    async fetchItems(context: { commit: any }) {
        try {
            const items = await api.getItems();
            context.commit('setItems', items);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    },
    async addItem(context: { commit: any }, item: { text: string }) {
        const addedItem = await api.addItem(item);
        context.commit('addItem', addedItem);
    },
    async updateItem(context: { commit: any }, item: ItemType) {
        const updatedItem = await api.updateItem(item);
        context.commit('updateItem', updatedItem);
    },
    async removeItem(context: { commit: any, dispatch: any }, itemId: number) {
        try {
            await api.removeItem(itemId);
            context.commit('removeItem', itemId);
            context.commit('removeSelectedItem', itemId);
            await context.dispatch('fetchItems');
        } catch (error) {
            console.error('Error removing item:', error);
        }
    },
    selectItem(context: { commit: any }, item: ItemType) {
        context.commit('selectItem', item);
    },
};

export default createStore({
    state,
    mutations,
    actions,
});
