# Lab 3: REST API, Query Parameters, Validation and Debugging
## Live API Deployment

**Platform:** Render

**Live API URL:** https://lab-03-books-api.onrender.com

**API Endpoint:** https://lab-03-books-api.onrender.com/books

## Student Details

- **Name:** Penta Mahitha
- **Registration Number:** 252U1R5121
- **Section:** AIDE-2B
- **Course:** Backend Development Fundamentals
- **Year and Term:** Year II Term II
- **Institution:** Aurora Deemed University
- **Faculty:** Yugandhar

## Objective

To develop a RESTful API using Node.js, Express.js and SQLite.
The API supports searching, sorting, filtering, validation
and proper error handling.

## Technologies Used

- Node.js
- Express.js
- SQLite
- Postman
- JavaScript

## How to Run the Project

### Prerequisites
- Node.js
- npm
- VS Code

### Step 1: Clone the Repository

git clone https://github.com/mahitha1962007/Backend-Development-Labs.git

### Step 2: Navigate to Lab 3

cd Backend-Development-Labs/lab-03

### Step 3: Install Dependencies

npm install

### Step 4: Start the Server

npm start

### Step 5: Test the API

Open Postman and use the following URL:

http://localhost:3000/books

### Environment Variables

| Variable | Description |
|---|---|
| PORT | Port number used by the server |

The default local port is 3000.
## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /books | Get all books |
| GET | /books?search_q=value | Search books |
| GET | /books?order_by=price&order=ASC | Sort books |
| GET | /books?limit=2&offset=0 | Pagination |
| GET | /books?min_price=100&max_price=500 | Price filtering |
| GET | /books/:bookId | Get a single book |
| POST | /books | Add a new book |
| PUT | /books/:bookId | Update a book |
| DELETE | /books/:bookId | Delete a book |
## HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | Request successful |
| 201 | Book created successfully |
| 400 | Invalid input or validation error |
| 404 | Book not found |
| 500 | Internal server error |

## Screenshots

### 1. Get All Books
![Get All Books](screenshots/01-get-all-books.png)

### 2. Search Books
![Search Books](screenshots/02-search-books.png)

### 3. Sort Books
![Sort Books](screenshots/03-sort-books.png)

### 4. Limit and Offset
![Limit and Offset](screenshots/04-limit-offset.png)

### 5. Price Range Filter
![Price Range Filter](screenshots/05-price-range-filter.png)

### 6. Add Book
![Add Book](screenshots/06-add-book-success.png)

### 7. Missing Title Validation
![Missing Title](screenshots/07-validation-missing-title.png)

### 8. Invalid Price Validation
![Invalid Price](screenshots/08-validation-invalid-price.png)

### 9. Update Book
![Update Book](screenshots/09-update-book.png)

### 10. Delete Book
![Delete Book](screenshots/10-delete-book.png)

### 11. Book Not Found
![Book Not Found](screenshots/11-book-not-found.png)

## Live API Testing on Render

### 12. Live Get All Books
![Live Get All Books](screenshots/12-live-get-books.png)

### 13. Live Search Books
![Live Search Books](screenshots/13-live-search-books.png)

### 14. Live Price Range Filtering
![Live Price Filtering](screenshots/14-live-price-filter.png)

### 15. Live Sorting
![Live Sorting](screenshots/15-live-sort-books.png)
## Debugging Exercises

### 1. Port Conflict (EADDRINUSE)

**Problem:** The server could not start because the
port was already being used by another process.

**Solution:** Stopped the previously running server
using Ctrl + C and restarted the application.
### 2. Wrong Import Path

**Problem:** The application could not find the
required module because the import path was incorrect.

**Solution:** Checked the filename and folder location
and corrected the require() path.
### 3. Table Name Typo

**Problem:** SQLite returned a "no such table" error
because the SQL query contained an incorrect table name.

**Solution:** Checked the database schema and corrected
the table name from book to books.
### 4. Missing await

**Problem:** The database query was not awaited,
so the application did not wait for the query result.

**Solution:** Added await before the asynchronous
database operation and used an async function.
## Learning Outcomes

Through this lab, I learned:

- How to develop RESTful APIs using Express.js.
- How to implement query parameters.
- How to perform searching, sorting and pagination.
- How to apply price range filtering.
- How to validate user input.
- How to handle HTTP status codes.
- How to test APIs using Postman.
- How to debug common backend errors.
- How to deploy a backend application using Render.

## Conclusion

The REST API was successfully developed and tested using Postman.
It supports CRUD operations, query parameters, price filtering,
input validation and appropriate HTTP status codes.
## Live API URL
**GitHub Repository:** 
https://github.com/mahitha1962007/Backend-Development-Labs

https://lab-03-books-api.onrender.com