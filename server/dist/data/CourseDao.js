"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseDao = void 0;
const Course = require("../model/Course.ts");
const mongoose = require("mongoose");
class CourseDao {
    async create({ courseInfo }) {
        const newCourse = new Course(courseInfo);
        await newCourse.save();
        return newCourse;
    }
    async readOne(id) {
        const course = await Course.findOne({ _id: id });
        return course;
    }
    async readAll() {
        try {
            const courses = await Course.find();
            return courses;
        }
        catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
    async update(id, courseInfo) {
        let course = await Course.findOne({ _id: id });
        if (!course) {
            return "Course not found";
        }
        course.set(courseInfo);
        await course.save();
        return course;
    }
    async delete(id) {
        await Course.findOneAndDelete({ _id: id });
        return "Course deleted";
    }
}
exports.CourseDao = CourseDao;
module.exports = CourseDao;
