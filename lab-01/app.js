const express = require('express');

const app = express();

// Display status codes in terminal
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(req.method, req.url, res.statusCode);
    });
    next();
});

// Home route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to my server');
});

// About route
app.get('/about', (req, res) => {
    res.status(200).json({
        name: 'Mahitha',
        section: 'Your Section'
    });
});

// Time route
app.get('/time', (req, res) => {
    res.status(200).json({
        currentDateTime: new Date()
    });
});

// Unknown route
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start server
app.listen(3000, () => {
    console.log('Express server running on port 3000');
});