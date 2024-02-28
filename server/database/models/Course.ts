export {}

const { mongoose } = require('./db');

const CourseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    courseCode: {
        type: String,
        required: true,
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