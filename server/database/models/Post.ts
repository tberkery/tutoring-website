export {}

const { mongoose } = require('./db');

const PostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    courseId: { // this field will be null if it's non-academic
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      default: null
    },
    // Other fields related to posts if needed
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
