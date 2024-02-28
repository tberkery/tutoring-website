export {}

const { mongoose } = require('./db');

const PostSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    userId: {
      type: Number,
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
      type: Number,
      default: null,
    },
    courseId: { // this field will be null if it's non-academic
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      default: null
    },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
