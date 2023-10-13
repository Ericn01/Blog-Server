const mongoose = require('mongoose');
const validCategories = ['Short Article', 'Long Article', 'Research-Heavy', 'Lifestyle', 'Nootropic', 'Self Improvement', 'Hair Loss', 'Strength and Training', 'Technology'];
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String, // You can use a reference to a User schema for author if you have a User schema.
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No description has been provided."
    },
    publicationDate: {
        type: Date,
        default: Date.now,
    },
    categories: {
        type: [{
            type: String,
            enum: validCategories, // Use the valid categories array
        }],
        default: [],
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    featuredImageURL: 
        {
            type: String,
            trim: true,
        }
    ,
    comments: [
        {
            text: String,
            author: String, // You can use a reference to a User schema for comment author if you have one.
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    keywords: {
        type: String,
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
