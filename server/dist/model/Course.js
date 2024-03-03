"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
    },
    courseDepartment: {
        type: String,
        required: true,
    },
    isUpperLevel: {
        type: Boolean,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    }
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
