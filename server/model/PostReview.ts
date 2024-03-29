export {}

import mongoose from "mongoose";

const PostReviewSchema = new mongoose.Schema({
    postId: {               // id of the post that the review was written for
      type: String,
      required: true,
    },
    posterId: {
      type: String,
      required: true
    },
    reviewerId: {           // id of the user that wrote the review
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
      default: null,
    },
    rating:
    {
      type: Number,
      required: true,
    }
});

const PostReview = mongoose.model("PostReview", PostReviewSchema);

module.exports = PostReview;
