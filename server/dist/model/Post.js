"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    imageUrl: {
        type: String,
        default: null,
    },
    price: {
        type: Number,
        default: null,
    },
    courseId: {
        type: Number,
        ref: 'Course',
        default: null
    },
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
