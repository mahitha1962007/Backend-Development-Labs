const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let db;

// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        db = await sqlite.open({
            filename: './books.db',
            driver: sqlite3.Database
        });

        console.log('Connected to SQLite database');

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();

// Get all books
app.get('/books/', async (req, res) => {
    try {
        const books = await db.all('SELECT * FROM books');
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get book by ID
app.get('/books/:bookId/', async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await db.get(
            'SELECT * FROM books WHERE id = ?',
            [bookId]
        );

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a book
app.post('/books/', async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        const result = await db.run(
            `INSERT INTO books (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            [title, author, price, pages]
        );

        res.status(201).json({
            message: 'Book added successfully',
            id: result.lastID
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a book
app.put('/books/:bookId/', async (req, res) => {
    try {
        const { bookId } = req.params;
        const { title, author, price, pages } = req.body;

        const result = await db.run(
            `UPDATE books
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?`,
            [title, author, price, pages, bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a book
app.delete('/books/:bookId/', async (req, res) => {
    try {
        const { bookId } = req.params;

        const result = await db.run(
            'DELETE FROM books WHERE id = ?',
            [bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});