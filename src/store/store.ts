import { createStore } from 'vuex';
import { Item } from '../resources/interfaces';
import { fetchItems, removeItem } from '../api';

interface State {
    items: Item[];
}

const state: State = {
    items: [],
};

const mutations = {
    setItems(state: State, items: Item[]) {
        state.items = items;
    },
    addItem(state: State, item: Item) {
        state.items.push(item);
    },
    removeItem(state: State, itemId: number) {
        state.items = state.items.filter(item => item.id !== itemId);
    },
    selectItem(state: State, selectedItem: Item) {
        state.items = state.items.map(item => ({
            ...item,
            selected: item.id === selectedItem.id,
        }));
    },
};

const actions = {
    async fetchItems(context: { commit: any }) {
        const items = await fetchItems();
        context.commit('setItems', items);
    },
    async removeItem(context: { commit: any }, itemId: number) {
        await removeItem(itemId);
        context.commit('removeItem', itemId);
    },
    selectItem(context: { commit: any }, selectedItem: Item) {
        context.commit('selectItem', selectedItem);
    },
};

export default createStore({
    state,
    mutations,
    actions,
});