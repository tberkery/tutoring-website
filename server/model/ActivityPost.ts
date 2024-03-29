export {}

const mongoose = require('mongoose');
const PostReview = require("../model/PostReview.ts");

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
    activityPostPicKey: {
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
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostReview',
        default: null,
      }
    ]
});

const ActivityPost = mongoose.model("ActivityPost", ActivityPostSchema);

module.exports = ActivityPost;
