const CoursePost = require("../model/CoursePost.ts");
const mongoose = require("mongoose");

export class CoursePostDao {
    async create(userId: string, courseName: string, options?: {description?: string, price?: string, courseNumber?: string, courseDepartment?: string, gradeReceived?: string,}) {
        console.log("IN DAO CREATE ")
        let newPost: any = {userId, courseName}
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
        const data = await CoursePost.create(newPost);
        return data;
    }
    async readOne( id : any ) { // find one Post by _id
        const post = await CoursePost.findOne({ _id: id });
        return post;
    }
    async readAll() {
        try {
            const posts = await CoursePost.find();
            return posts
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }
    async update( id: any, postInfo: any ) {
        let post = await CoursePost.findOne({ _id: id });
        if (!post) {
            return "Post not found";
        }
        post.set(postInfo);
        await post.save();
        return post;
    }
    async delete(id : any) {
        await CoursePost.findOneAndDelete({ _id: id });
        return "Post deleted";
    }
}
module.exports = CoursePostDao;