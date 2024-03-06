export {}

const mongoose = require('mongoose');

const ActivityPostSchema = new mongoose.Schema({
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
    tags: {
      type: [String],
      default: null
    }
});

const ActivityPost = mongoose.model("ActivityPost", ActivityPostSchema);

module.exports = ActivityPost;
