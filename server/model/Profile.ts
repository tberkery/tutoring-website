export {}

import mongoose = require("mongoose");
import ViewSchema = require("./Views");

const ProfileSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    },
    graduationYear: {
        type: String,
        default: null,
    },
    department: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null,
    }],
    profilePicKey: {
        type: String,
        default: null,
    },
    views: {
        type: [ViewSchema],
        default: []
    },
    viewsCounter: {
        type: Number,
        default: null
    },
    availability: {
        type: [Number],
        default: []
    }
  });
const Profile = mongoose.model("Profile", ProfileSchema);

export = Profile;