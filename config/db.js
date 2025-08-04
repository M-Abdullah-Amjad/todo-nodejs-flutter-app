const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');


const connection = mongoose.createConnection(process.env.MONGODB_URI).on('open',()=>{
    console.log('Connected to MongoDB');
}).on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = connection;
