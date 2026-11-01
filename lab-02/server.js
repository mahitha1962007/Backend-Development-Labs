const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(
    path.join(__dirname, 'books.db'),
    (err) => {
        if (err) {
            console.error('Database connection failed:', err.message);
        } else {
            console.log('Connected to SQLite database');
        }
    }
);

// Home route
app.get('/', (req, res) => {
    res.send('SQLite Database Server is Running!');
});

// Get all books
app.get('/books', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});
// Get a book by ID
app.get('/books/:id', (req, res) => {
    const id = req.params.id;

    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(row);
    });
});


// Add a new book
app.post('/books', (req, res) => {
    const { title, author, price } = req.body;

    db.run(
        'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
        [title, author, price],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Book added successfully',
                id: this.lastID
            });
        }
    );
});
// Update a book
app.put('/books/:id', (req, res) => {
    const { title, author, price } = req.body;
    const { id } = req.params;

    db.run(
        'UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?',
        [title, author, price, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.json({ message: 'Book updated successfully' });
        }
    );
});
// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM books WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.json({ message: 'Book deleted successfully' });
        }
    );
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});