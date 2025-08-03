const mongoose = require('mongoose');

const connection = mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/newTodoList').on('open',()=>{
    console.log('Connected to MongoDB');
}).on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = connection;