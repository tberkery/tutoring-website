import mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  });
const User = mongoose.model("User", UserSchema);

export = User;