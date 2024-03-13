export {}

const mongoose = require('mongoose');

const CoursePostSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    courseNumber: {
        type: String,
        default: null,
    },
    courseDepartment: { //essentially courseTags
        type: [String],
        default: null,
    },
    gradeReceived: {
        type: String,
        default: null,
    },
    semesterTaken: {
        type: String,
        default: null,
    },
    professorTakenWith: {
        type: String,
        default: null,
    },
    takenAtHopkins: {
        type: Boolean,
        default: true,
    },
    schoolTakenAt: {
        type: String,
        default: null
    },

    // courseId: { // this field will be null if it's non-academic
    //   type: Number,
    //   ref: 'Course',
    //   default: null
    // },
});

const CoursePost = mongoose.model("CoursePost", CoursePostSchema);

module.exports = CoursePost;
