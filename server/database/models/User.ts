// server/database/models/User.ts

export {}

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: String,
      required: true,
    },
    department: { // for students AND for faculty
      type: String,
      required: true,
    },
    year: { // will be null for faculties
      type: Number,
      default: null
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null
    },
    profilePicture: { // TODO: wait for Kat and Tad
      type: String,
      default: null
    },
  
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default:null
      }
    ]
  });
  
const User = mongoose.model("User", UserSchema);

module.exports = User;
