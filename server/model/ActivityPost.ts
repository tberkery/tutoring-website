export {}

const mongoose = require('mongoose');

const ActivityPostSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    activityTitle: {
      type: String,
      required: true,
    },
    activityDescription: {
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
    tags: {
      type: [String],
      default: null
    }
});

const ActivityPost = mongoose.model("ActivityPost", ActivityPostSchema);

module.exports = ActivityPost;
