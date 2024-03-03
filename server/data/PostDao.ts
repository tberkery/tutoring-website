const Post = require("../model/Post.ts");
const mongoose = require("mongoose");

export class PostDao {
    async create(userId: string, title: string, options?: {description?: string, imageUrl?: string, price?: string, courseId?: Number}) {
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
        const data = await Post.create(newPost);
        return data;
    }
    async readAllByUserId(userId : any) {
        try {
            const posts = await Post.find({ userId: userId });
            return posts
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
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
    async update( id: any, userId: string, title: string, options?: {description?: string, imageUrl?: string, price?: string, courseId?: Number}) {
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
        const data = await Post.findByIdAndUpdate(id, newPost)
        return data;
    
    }
    async delete(id : any) {
        const data = await Post.findOneAndDelete({ _id: id });
        return data;
    }
    async deleteAll(){
        await Post.deleteMany({})
    }
}
module.exports = PostDao;