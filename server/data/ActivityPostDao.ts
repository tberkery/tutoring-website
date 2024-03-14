const ActivityPost = require("../model/ActivityPost.ts");
const mongoose = require("mongoose")

export class ActivityPostDao {
    async create(userId: string, activityTitle: string, options?: {activityDescription?: string, activityPostPicKey?: string, price?: number, tags?: Array<string>}) {
        let newPost: any = {userId, activityTitle}
        if (options){
            if (options.activityDescription){
                newPost.activityDescription = options.activityDescription;
            }
            if (options.activityPostPicKey){
                newPost.activityPostPicKey = options.activityPostPicKey;
            }
            if (options.price){
                newPost.price = options.price;
            }
            if (options.tags){
                newPost.tags = options.tags;
            }
        }
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
            return posts
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    async readSome( options: any) {
        // Remark: consider our query options for ActivityPosts:
        // - Query only by user_id
        // - Query only by activity title
        // - Query only by price
        // - Query only by tags
        // - Query any combination of these fields
        const query: any = {};

        // Iterate over the options object
        for (const key in options) {
            if (Object.prototype.hasOwnProperty.call(options, key)) {
                if (options[key] !== undefined) {
                    switch (key) {
                        case 'userId':
                            query.userId = options.userId;
                            break;
                        case 'activityTitle':
                            query.activityTitle = options.activityTitle;
                            break;
                        case 'price':
                            query.price = options.price;
                            break;
                        case 'tags':
                            query.tags = options.tags;
                            break;
                    }
                }
            }
        }


        // Fetch data from the database using the constructed query
        const posts = await ActivityPost.find(query).exec();
        // Return the fetched posts
        return posts;

    }
    async update( id: any, userId: string, activityTitle: string, options?: {activityDescription?: string, activityPostPicKey?: number, price?: number, tags?: string[]} ) {
        let newPost: any = {userId, activityTitle}
        if (options){
            if(options.activityDescription){
                newPost.activityDescription = options.activityDescription
            }
            if (options.activityPostPicKey){
                newPost.activityPostPicKey = options.activityPostPicKey;
            }
            if (options.price){
                newPost.price = options.price;
            }
            if (options.tags){
                newPost.tags = options.tags;
            }
        }
        let post = await ActivityPost.findByIdAndUpdate(id, newPost);
        return post;
    }
    
    async delete(id : any) {
        const deletedPost = await ActivityPost.findOneAndDelete({ _id: id });
        if (!deletedPost) {
            return "Post not found"
        }
        return "Post deleted";
    }
    async deleteAll(){
        await ActivityPost.deleteMany({})
    }
}
module.exports = ActivityPostDao;