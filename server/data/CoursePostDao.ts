const CoursePost = require("../model/CoursePost.ts");
const mongoose = require("mongoose");

export class CoursePostDao {
    async create(userId: string, courseName: string, options?: {description?: string, price?: string, courseNumber?: string, courseDepartment?: string[], gradeReceived?: string, semesterTaken?: string, professorTakenWith?: string, takenAtHopkins?: boolean, schoolTakenAt?: string}) {
        console.log("IN DAO CREATE ")
        let newPost: any = {userId, courseName}
        if (options){
            if(options.description){
                newPost.description = options.description
            }
            if (options.courseNumber){
                newPost.courseNumber = options.courseNumber;
            }
            if (options.price){
                newPost.price = options.price;
            }
            if (options.courseDepartment){
                newPost.courseDepartment = options.courseDepartment;
            }
            if (options.gradeReceived){
                newPost.gradeReceived = options.gradeReceived;
            }
            if (options.semesterTaken){
                newPost.semesterTaken = options.semesterTaken;
            }
            if (options.professorTakenWith){
                newPost.professorTakenWith = options.professorTakenWith;
            }
            if (options.takenAtHopkins){
                newPost.takenAtHopkins = options.takenAtHopkins;
            }
            if (options.schoolTakenAt){
                newPost.schoolTakenAt = options.schoolTakenAt;
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
    async readAll({courseName, courseNumber, price}: {courseName: string, courseNumber: string, price: string}) {
        const filter : any = {};
        if (courseName) {
            filter.courseName = courseName;
        }
        if (courseNumber) {
            filter.courseNumber = courseNumber;
        }
        if (price) {
            filter.price = price;
        }
        try {
            const posts = await CoursePost.find(filter);
            return posts;
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