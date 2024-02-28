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
