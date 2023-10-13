const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    bio: {
        type: String,
    },
    profileImageURL: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Customize roles as needed
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
