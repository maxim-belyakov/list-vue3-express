const express = require('express');
const app = express();
const port = 3001;

let items = []; // This will act as our in-memory database
let itemId = 0;

app.use(express.json());

// GET items
app.get('/items', (req, res) => res.json(items));

// POST new item
app.post('/items', (req, res) => {
    const newItem = { id: itemId++, ...req.body };
    items.push(newItem);
    res.json(newItem);
});

// PUT update item
app.put('/items/:id', (req, res) => {
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    if (index > -1) {
        items[index] = { ...items[index], ...req.body };
        res.json(items[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE item
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    if (index > -1) {
        const deletedItem = items.splice(index, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});