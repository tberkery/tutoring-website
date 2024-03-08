const ActivityPost = require("../model/ActivityPost.ts");
const mongoose = require("mongoose");

export class ActivityPostDao {
    async create(userId: string, activityTitle: string, options?: {activityDescription?: string, imageUrl?: string, price?: string, tags?: [String]}) {
        let newPost: any = {userId, activityTitle}
        if (options){
            if(options.activityDescription){
                newPost.activityDescription = options.activityDescription
            }
            if (options.imageUrl){
                newPost.imageUrl = options.imageUrl;
            }
            if (options.price){
                newPost.price = options.price;
            }
            if (options.tags){
                newPost.tags = options.tags;
            }
        }
        console.log("post is ", newPost);
        const data = await ActivityPost.create(newPost);
        return data;
    }

    async readOne( id : any ) { // find one Post by _id
        const post = await ActivityPost.findOne({ _id: id });
        return post;
    }

    async readAll() {
        try {
            const posts = await ActivityPost.find();
            return posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    async update( id: any, postInfo: any ) {
        let post = await ActivityPost.findOne({ _id: id });
        if (!post) {
            return "Post not found";
        }
        post.set(postInfo);
        await post.save();
        return post;
    }

    async delete(id : any) {
        const deletedPost = await ActivityPost.findOneAndDelete({ _id: id });
        if (!deletedPost) {
            return "Post not found";
        }
        return deletedPost;
    }
    
    async deleteAll(){
        await ActivityPost.deleteMany({})
    }
}
module.exports = ActivityPostDao;