const express = require('express');
const body_parser = require('body-parser');
const UserRouter = require('./routers/user_router');
const TodoRouter = require('./routers/todo_router');

const app = express();

// Middleware
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Routes
app.use('/', UserRouter);
app.use('/', TodoRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        message: 'Todo API is running', 
        status: true,
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        message: 'Route not found', 
        status: false 
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        message: 'Internal server error', 
        status: false 
    });
});

module.exports = app;

