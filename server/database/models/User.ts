// server/database/models/User.ts

export {}

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
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
