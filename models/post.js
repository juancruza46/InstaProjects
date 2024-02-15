//model
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
