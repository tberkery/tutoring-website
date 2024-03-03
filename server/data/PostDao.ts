const Post = require("../model/Post.ts");
const mongoose = require("mongoose");

export class PostDao {
    async create(userId: string, title: string, options?: {description?: string, imageUrl?: string, price?: string, courseId?: Number}) {
        console.log("IN DAO CREATE ")
        let newPost: any = {userId, title}
        if (options){
            if(options.description){
                newPost.description = options.description
            }
            if (options.imageUrl){
                newPost.imageUrl = options.imageUrl;
            }
            if (options.price){
                newPost.price = options.price;
            }
            if (options.courseId){
                newPost.courseId = options.courseId;
            }
        }
        console.log("post is ", newPost);
        const data = await Post.create(newPost);
        return data;
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