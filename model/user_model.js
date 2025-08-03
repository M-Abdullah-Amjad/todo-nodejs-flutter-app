const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function() {
    try{
        var user = this;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
    }catch(error){
        console.error('Error in user schema pre-save hook:', error);
        throw new Error('User registration failed');
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        return await bcrypt.compare(candidatePassword, this.password);
    }catch(error){
        console.error('Error comparing password:', error);
        throw new Error('Password comparison failed');
    }
};

const UserModel = db.model('user', userSchema);

module.exports = UserModel;
