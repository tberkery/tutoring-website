import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    courseId: { // this field will be null if it's non-academic
      type: Number,
      ref: 'Course',
      default: null
    },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
