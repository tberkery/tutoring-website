"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDao = void 0;
const Post = require("../model/Post.ts");
const mongoose = require("mongoose");
class PostDao {
    async create(postInfo) {
        const newPost = new Post(postInfo);
        await newPost.save();
        return newPost;
    }
    async readOne(id) {
        const post = await Post.findOne({ _id: id });
        return post;
    }
    async readAll() {
        try {
            const posts = await Post.find();
            return posts;
        }
        catch (error) {
            console.error('Error fetching posts:', error);
        }
    }
    async update(id, postInfo) {
        let post = await Post.findOne({ _id: id });
        if (!post) {
            return "Post not found";
        }
        post.set(postInfo);
        await post.save();
        return post;
    }
    async delete(id) {
        await Post.findOneAndDelete({ _id: id });
        return "Post deleted";
    }
}
exports.PostDao = PostDao;
module.exports = PostDao;
