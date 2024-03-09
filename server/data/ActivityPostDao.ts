const ActivityPost = require("../model/ActivityPost.ts");
const mongoose = require("mongoose")

export class ActivityPostDao {
    async create(userId: string, title: string, options?: {description?: string, imageUrl?: string, price?: string, courseId?: Number}) {
        let newPost: any = {userId, title}
        if (options){
            if (options.description){
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
                        case 'activityTitle':
                            query.activityTitle = options.activityTitle;
                        case 'price':
                            query.price = options.price;
                        case 'tags':
                            query.tags = options.tags;
                        break;
                    }
                }
            }
        }
        console.log("Here is your formatted query:", query)


        // Fetch data from the database using the constructed query
        const posts = await ActivityPost.find(query);

        // Return the fetched posts
        return posts;

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
        await ActivityPost.findOneAndDelete({ _id: id });
        return "Post deleted";
    }
}
module.exports = ActivityPostDao;