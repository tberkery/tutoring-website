const Post = require("../model/Post.ts");
const mongoose = require("mongoose");

export class PostDao {
    async create( postInfo : any) {
        const newPost = new Post(postInfo);
        await newPost.save();
        return newPost;
    }
    async readOne( id : any ) { // find one Post by _id
        const post = await Post.findOne({ _id: id });
        return post;
    }
    async readAll() {
        try {
            const posts = await Post.find();
            return posts
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }
    async update( id: any, postInfo: any ) {
        let post = await Post.findOne({ _id: id });
        if (!post) {
            return "Post not found";
        }
        post.set(postInfo);
        await post.save();
        return post;
    }
    async delete(id : any) {
        await Post.findOneAndDelete({ _id: id });
        return "Post deleted";
    }
}
module.exports = PostDao;