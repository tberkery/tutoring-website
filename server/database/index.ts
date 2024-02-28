// db.ts

require("dotenv").config();

const URI = process.env.ATLAS_URI;

const mongoose = require("mongoose");

export async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log("Unable to connect to MongoDB: " + err);
  }
}
export default mongoose
