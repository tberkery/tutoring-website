import mongoose = require("mongoose");
import hopkinsStatus = require("../utils/affiliationType");

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
        required: false,
    },
    department: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null,
    }],
    profilePicKey: {
        type: String,
        deafult: null,
    }
    

  });
const Profile = mongoose.model("Profile", ProfileSchema);

export = Profile;