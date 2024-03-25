export {}

import mongoose = require("mongoose");

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
    }
    

  });
const Profile = mongoose.model("Profile", ProfileSchema);

export = Profile;