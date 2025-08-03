const mongoose = require('mongoose');
const db = require('../config/db');
const UserModel = require('../model/user_model');
const {Schema} = mongoose;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

const TodoModel = db.model('todo', todoSchema);

module.exports = TodoModel;