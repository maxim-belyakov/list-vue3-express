import { shallowMount } from '@vue/test-utils';
import ItemList from '@/components/ItemList.vue';
import { ItemType } from '@/resources/interfaces';

describe('ItemList.vue', () => {
    it('renders a list of items', () => {
        const items: ItemType[] = [
            { id: 1, text: 'Item 1', selected: false },
            { id: 2, text: 'Item 2', selected: false },
        ];

        const wrapper = shallowMount(ItemList, {
            props: { items },
        });

        const renderedItems = wrapper.findAllComponents({ name: 'Item' });
        expect(renderedItems.length).toBe(items.length);
    });

    it('emits "item-updated" event when an item is selected', async () => {
        const item: ItemType = { id: 1, text: 'Item 1', selected: false };

        const wrapper = shallowMount(ItemList, {
            props: { items: [item] },
        });

        wrapper.findComponent({ name: 'Item' }).vm.$emit('item-selected', item);
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('item-updated')).toBeTruthy();
        expect(wrapper.emitted('item-updated')![0]).toEqual([{ ...item, selected: !item.selected }]);
    });

    it('emits "item-removed" event when an item is removed', async () => {
        const item: ItemType = { id: 1, text: 'Item 1', selected: false };

        const wrapper = shallowMount(ItemList, {
            props: { items: [item] },
        });

        wrapper.findComponent({ name: 'Item' }).vm.$emit('item-removed', item);
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('item-removed')).toBeTruthy();
        expect(wrapper.emitted('item-removed')![0]).toEqual([item]);
    });
});
