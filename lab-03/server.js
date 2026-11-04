const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Books API is running successfully!');
});

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


// Get all books with search, sorting, pagination and price filtering
app.get('/books/', async (req, res) => {
    try {
        const {
            search_q = '',
            order_by = 'id',
            order = 'ASC',
            limit = '10',
            offset = '0',
            min_price,
            max_price
        } = req.query;

        // Validate sorting options
        const allowedColumns = ['id', 'title', 'author', 'price', 'pages'];
        const sortColumn = allowedColumns.includes(order_by)
            ? order_by
            : 'id';

        const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        // Validate limit and offset
        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (!Number.isInteger(pageLimit) || pageLimit <= 0 ||
            !Number.isInteger(pageOffset) || pageOffset < 0) {
            return res.status(400).json({
                message: 'Limit must be positive and offset must be non-negative'
            });
        }

        // Build conditions safely
        let conditions = [];
        let params = [];

        if (search_q.trim() !== '') {
            conditions.push('title LIKE ?');
            params.push(`%${search_q}%`);
        }

        if (min_price !== undefined) {
            const min = Number(min_price);
            if (!Number.isFinite(min)) {
                return res.status(400).json({
                    message: 'Minimum price must be a number'
                });
            }
            conditions.push('price >= ?');
            params.push(min);
        }

        if (max_price !== undefined) {
            const max = Number(max_price);
            if (!Number.isFinite(max)) {
                return res.status(400).json({
                    message: 'Maximum price must be a number'
                });
            }
            conditions.push('price <= ?');
            params.push(max);
        }

        if (min_price !== undefined && max_price !== undefined &&
            Number(min_price) > Number(max_price)) {
            return res.status(400).json({
                message: 'Minimum price cannot be greater than maximum price'
            });
        }

        let sql = 'SELECT * FROM books';

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        sql += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
        params.push(pageLimit, pageOffset);

        const books = await db.all(sql, params);

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({ message: error.message });
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


// Add a book with validation
app.post('/books/', async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        // Validate title
        if (!title || title.trim() === '') {
            return res.status(400).json({
                message: 'Title is required'
            });
        }

        // Validate author
        if (!author || author.trim() === '') {
            return res.status(400).json({
                message: 'Author is required'
            });
        }

        // Validate price
        if (price === undefined || price === null ||
            price === '' || !Number.isFinite(Number(price))) {
            return res.status(400).json({
                message: 'Price must be a valid number'
            });
        }

        // Validate pages if provided
        if (pages !== undefined &&
            (!Number.isInteger(Number(pages)) || Number(pages) <= 0)) {
            return res.status(400).json({
                message: 'Pages must be a positive number'
            });
        }

        const result = await db.run(
            `INSERT INTO books (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            [title.trim(), author.trim(), Number(price),
             pages === undefined ? null : Number(pages)]
        );

        res.status(201).json({
            message: 'Book added successfully',
            id: result.lastID
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
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