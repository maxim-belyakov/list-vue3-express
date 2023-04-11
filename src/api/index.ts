import axios from 'axios';
import { ItemType } from '../resources/interfaces';
const BASE_URL = 'http://localhost:3001';

async function getItems(): Promise<ItemType[]> {
    const response = await axios.get<ItemType[]>(`${BASE_URL}/items`);
    return response.data;
}

async function addItem(item: { text: string }): Promise<ItemType> {
    const response = await axios.post<ItemType>(`${BASE_URL}/items`, item);
    return response.data;
}

async function updateItem(item: ItemType): Promise<ItemType> {
    const response = await axios.put<ItemType>(`${BASE_URL}/items/${item.id}`, item);
    return response.data;
}

async function removeItem(itemId: number): Promise<ItemType> {
    const response = await axios.delete<ItemType>(`${BASE_URL}/items/${itemId}`);
    return response.data;
}

export default {
    getItems,
    addItem,
    updateItem,
    removeItem,
};