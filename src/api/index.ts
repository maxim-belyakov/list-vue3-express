import axios from 'axios';
import { Item } from '../resources/interfaces';

const BASE_URL = 'http://localhost:3001';

export async function fetchItems(): Promise<Item[]> {
    try {
        const response = await axios.get<Item[]>(`${BASE_URL}/items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}

export async function removeItem(itemId: number): Promise<void> {
    try {
        await axios.delete(`${BASE_URL}/items/${itemId}`);
    } catch (error) {
        console.error('Error removing item:', error);
    }
}