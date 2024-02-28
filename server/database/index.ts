// db.ts

require("dotenv").config();
const mg = require("mongoose");
const URI = process.env.ATLAS_URI;

export async function connect() {
  try {
    await mg.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log("Unable to connect to MongoDB: " + err);
  }
}