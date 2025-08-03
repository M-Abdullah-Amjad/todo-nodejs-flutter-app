const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

// || 'mongodb://127.0.0.1:27017/newTodoList'
const connection = mongoose.createConnection(process.env.MONGODB_URI || 'mongodb+srv://abdullahamjadlhr2020:J7oH8Wn1zmPoC4VD@todolistcluster.5zatdeo.mongodb.net/?retryWrites=true&w=majority&appName=todolistcluster').on('open',()=>{
    console.log('Connected to MongoDB');
}).on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = connection;