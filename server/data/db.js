const mongoose = require("mongoose");
const URI = "mongodb+srv://hw1-oose:4dxM89cyyu3Nofcw@hw1-oose.8zkpbgx.mongodb.net/"

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };