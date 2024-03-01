const Course = require("../model/Course.ts");
const mongoose = require("mongoose");

export class CourseDao {
    async create({ courseInfo }: { courseInfo: any }) {
        const newCourse = new Course(courseInfo);
        await newCourse.save();
        return newCourse;
    }
    async readOne( id : any ) { // find one course by _id
        const course = await Course.findOne({ _id: id });
        return course;
    }
    async readAll() {
        try {
            const courses = await Course.find();
            return courses
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
    async update( id: any, courseInfo: any ) {
        let course = await Course.findOne({ _id: id });
        if (!course) {
            return "Course not found";
        }
        course.set(courseInfo);
        await course.save();
        return course;
    }
    async delete(id : any) {
        await Course.findOneAndDelete({ _id: id });
        return "Course deleted";
    }
}
module.exports = CourseDao;